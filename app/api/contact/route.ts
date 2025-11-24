import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { name, email, company, interest, message } = await req.json();
    
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    const { error: dbError } = await supabase.from('website_contacts').insert({
      name,
      email,
      company: company || null,
      interest,
      message,
      source: 'website',
      created_at: new Date().toISOString()
    });
    
    if (dbError) {
      console.error('Database error:', dbError);
      throw dbError;
    }
    
    const { error: emailError } = await resend.emails.send({
      from: 'website@phoesis.io',
      to: ['tony@phoesis.io', 'eric@phoesis.io'],
      subject: `New ${interest} inquiry from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #16E3FF;">New Contact Form Submission</h2>
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Company:</strong> ${company || 'Not provided'}</p>
            <p><strong>Interest:</strong> ${interest}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 12px;">
            Submitted via phoesis.io contact form on ${new Date().toLocaleString('en-US', { timeZone: 'America/Phoenix' })} MST
          </p>
        </div>
      `
    });
    
    if (emailError) {
      console.error('Email error:', emailError);
      throw emailError;
    }
    
    return NextResponse.json({ success: true });
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message. Please try again.' },
      { status: 500 }
    );
  }
}
