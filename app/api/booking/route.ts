import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import { createClient } from '@supabase/supabase-js';

// ================================================
// INITIALIZATION
// ================================================

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

    console.log('[API] ===== GET /api/booking =====');
    console.log('[API] Received params:', { date, timezone });
    console.log('[API] Full URL:', req.url);

    if (!date) {
      console.error('[API] ERROR: Date parameter missing');
      return NextResponse.json({ error: 'Date required' }, { status: 400 });
    }

    // Check for Google credentials - return mock data for local dev
    if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_REFRESH_TOKEN) {
      console.log('[API] No Google credentials - returning mock data for local dev');
      return NextResponse.json({
        busySlots: ['13:00', '13:30', '16:00']
      });
    }

    // Build date strings in the user's timezone
    const startOfDay = `${date}T00:00:00-07:00`;
    const endOfDay = `${date}T23:59:59-07:00`;

    console.log('[API] Date range for Google Calendar:', { date, timezone, start: startOfDay, end: endOfDay });

    const response = await calendar.events.list({
      calendarId: 'primary',
      timeMin: startOfDay,
      timeMax: endOfDay,
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: timezone,
    });

    console.log('[API] Google Calendar API response received');
    console.log('[API] Calendar events found:', response.data.items?.length || 0);

    if (response.data.items && response.data.items.length > 0) {
      console.log('[API] Event details:');
      response.data.items.forEach((event, idx) => {
        console.log(`[API]   Event ${idx + 1}:`, {
          summary: event.summary,
          start: event.start?.dateTime,
          end: event.end?.dateTime,
          isAllDay: !event.start?.dateTime
        });
      });
    }

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

    console.log('[API] Busy slots before deduplication:', busySlots);
    console.log('[API] Final unique busy slots:', uniqueBusySlots);
    console.log('[API] Returning response:', { busySlots: uniqueBusySlots });

    return NextResponse.json({ busySlots: uniqueBusySlots });
  } catch (error) {
    console.error('[API] ===== ERROR IN GET /api/booking =====');
    console.error('[API] Error type:', error instanceof Error ? error.constructor.name : typeof error);
    console.error('[API] Error message:', error instanceof Error ? error.message : String(error));
    console.error('[API] Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.error('[API] Full error object:', error);
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

    // Initialize Supabase client (only in POST handler)
    const supabase = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
      ? createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL,
          process.env.SUPABASE_SERVICE_ROLE_KEY
        )
      : null;

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

    // Save to Supabase (if configured)
    if (supabase) {
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
      console.log('Booking saved to Supabase');
    } else {
      console.log('Supabase not configured - skipping database save');
    }

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
