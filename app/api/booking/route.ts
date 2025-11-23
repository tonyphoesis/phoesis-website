import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  return NextResponse.json({
    message: 'Booking API coming soon',
    note: 'Requires Google Calendar OAuth setup with refresh token'
  });
}

export async function POST(req: NextRequest) {
  return NextResponse.json({
    message: 'Booking API coming soon',
    note: 'Requires Google Calendar OAuth setup with refresh token'
  }, { status: 501 });
}
