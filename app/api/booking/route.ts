import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// ================================================
// INITIALIZATION
// ================================================

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:3000/oauth/callback'
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// ================================================
// GET - Fetch Busy Time Slots
// ================================================

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const date = searchParams.get('date');
    const timezone = searchParams.get('timezone') || 'America/Phoenix';
    
    if (!date) {
      return NextResponse.json({ error: 'Date required' }, { status: 400 });
    }

    // Build date strings in the user's timezone
    const startOfDay = `${date}T00:00:00-07:00`;
    const endOfDay = `${date}T23:59:59-07:00`;

    console.log('Fetching calendar for:', { date, timezone, start: startOfDay, end: endOfDay });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay,
      timeMax: endOfDay,
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: timezone,
    });

    console.log('Calendar events found:', response.data.items?.length || 0);

    // Extract busy time slots
    const busySlots: string[] = [];
    
    response.data.items?.forEach(event => {
      // Skip all-day events
      if (!event.start?.dateTime || !event.end?.dateTime) {
        console.log('Skipping all-day event:', event.summary);
        return;
      }
      
      // Parse the datetime strings directly to extract HH:MM in local timezone
      // Event times from Google are in ISO format with timezone offset
      const startTimeStr = event.start.dateTime; // e.g. "2025-11-28T17:00:00-07:00"
      const endTimeStr = event.end.dateTime;
      
      console.log('Raw event times:', { summary: event.summary, start: startTimeStr, end: endTimeStr });
      
      // Extract the time portion (HH:MM) from the ISO string
      const startMatch = startTimeStr.match(/T(\d{2}):(\d{2})/);
      const endMatch = endTimeStr.match(/T(\d{2}):(\d{2})/);
      
      if (!startMatch || !endMatch) return;
      
      const startHour = parseInt(startMatch[1]);
      const startMin = parseInt(startMatch[2]);
      const endHour = parseInt(endMatch[1]);
      const endMin = parseInt(endMatch[2]);
      
      // Generate time slots
      let currentHour = startHour;
      let currentMin = startMin;
      
      while (currentHour < endHour || (currentHour === endHour && currentMin < endMin)) {
        const slot = `${currentHour.toString().padStart(2, '0')}:${currentMin.toString().padStart(2, '0')}`;
        busySlots.push(slot);
        console.log('Blocking slot:', slot);
        
        // Move to next 30-minute slot
        currentMin += 30;
        if (currentMin >= 60) {
          currentMin = 0;
          currentHour += 1;
        }
      }
    });

    // Remove duplicates
    const uniqueBusySlots = [...new Set(busySlots)];
    
    console.log('Final busy slots:', uniqueBusySlots);

    return NextResponse.json({ busySlots: uniqueBusySlots });
  } catch (error) {
    console.error('Calendar fetch error:', error);
    return NextResponse.json({ error: 'Failed to fetch calendar' }, { status: 500 });
  }
}

// ================================================
// POST - Create Booking
// ================================================

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, date, time, timezone, message } = await req.json();
    
    if (!name || !email || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Parse datetime with timezone awareness
    const dateTimeStr = `${date}T${time}:00`;
    
    // Calculate end time (add 1 hour)
    const startTime = new Date(dateTimeStr);
    const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
    
    // Format end time as local datetime string (without timezone offset)
    const endHours = endTime.getHours().toString().padStart(2, '0');
    const endMinutes = endTime.getMinutes().toString().padStart(2, '0');
    const endTimeStr = `${date}T${endHours}:${endMinutes}:00`;

    console.log('Creating booking:', {
      name,
      email,
      startTime: dateTimeStr,
      endTime: endTimeStr,
      timezone
    });

    // Create calendar event with user's timezone
    const event = {
      summary: `Meeting with ${name}`,
      description: `Email: ${email}\nPhone: ${phone || 'Not provided'}\nTimezone: ${timezone}\n\n${message || ''}`,
      start: {
        dateTime: dateTimeStr,
        timeZone: timezone || 'America/Phoenix',
      },
      end: {
        dateTime: endTimeStr,
        timeZone: timezone || 'America/Phoenix',
      },
      attendees: [{ email }],
      conferenceData: {
        createRequest: {
          requestId: `meeting-${Date.now()}`,
          conferenceSolutionKey: { type: 'hangoutsMeet' },
        },
      },
    };

    const response = await calendar.events.insert({
      calendarId: 'primary',
      requestBody: event,
      conferenceDataVersion: 1,
      sendUpdates: 'all',
    });

    console.log('Booking created:', response.data.id);

    // Save to Supabase
    await supabase.from('appointments').insert({
      name,
      email,
      phone,
      scheduled_time: dateTimeStr,
      message,
      google_event_id: response.data.id,
      meet_link: response.data.hangoutLink,
      status: 'confirmed',
    });

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      meetLink: response.data.hangoutLink,
    });

  } catch (error) {
    console.error('Booking error:', error);
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again.' },
      { status: 500 }
    );
  }
}
