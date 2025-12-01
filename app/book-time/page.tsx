/**
 * Book Time Page
 * Version: 2.0
 * Modified: 2025-12-01 00:00:00 UTC
 * Modified By: Claude Code
 * Changes: Redesigned with visual calendar picker (Calendly-style layout)
 */

'use client';

import { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import CalendarPicker from '../components/CalendarPicker';
import TimeSlotPicker from '../components/TimeSlotPicker';

export default function BookTimePage() {
  // ================================================
  // STATE MANAGEMENT
  // ================================================

  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    timezone: 'America/Phoenix',
    message: '',
  });
  const [isBooking, setIsBooking] = useState(false);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [busySlots, setBusySlots] = useState<string[]>([]);
  const [isLoadingSlots, setIsLoadingSlots] = useState(false);

  // ================================================
  // FETCH BUSY SLOTS WHEN DATE CHANGES
  // ================================================

  useEffect(() => {
    if (!bookingData.date) {
      setBusySlots([]);
      return;
    }

    const fetchBusySlots = async () => {
      setIsLoadingSlots(true);
      try {
        const response = await fetch(
          `/api/booking?date=${bookingData.date}&timezone=${bookingData.timezone}`
        );

        if (response.ok) {
          const data = await response.json();
          setBusySlots(data.busySlots || []);
        }
      } catch (error) {
        console.error('Failed to fetch busy slots:', error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBusySlots();
  }, [bookingData.date, bookingData.timezone]);

  // ================================================
  // BOOKING HANDLER
  // ================================================

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);

    try {
      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });

      if (response.ok) {
        setBookingStatus('success');
        setBookingData({ name: '', email: '', phone: '', date: '', time: '', timezone: 'America/Phoenix', message: '' });
        setBusySlots([]);
        setTimeout(() => setBookingStatus('idle'), 5000);
      } else {
        setBookingStatus('error');
      }
    } catch (error) {
      setBookingStatus('error');
    } finally {
      setIsBooking(false);
    }
  };

  // ================================================
  // RENDER
  // ================================================

  return (
    <main className="min-h-screen relative">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/images/Full Sky Background - 2600x1600.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-6">
          {/* Header */}
          <div className="text-center mb-12">
            <Calendar size={64} className="mx-auto mb-6 text-[#16E3FF]" />
            <h1 className="font-space-age text-5xl md:text-6xl mb-6 text-[#16E3FF] text-glow-cyan">
              Book Time
            </h1>
            <p className="text-white/80 text-xl max-w-2xl mx-auto">
              Schedule a meeting with us. We'll send you a Google Meet link.
            </p>
          </div>

          {/* Booking Form */}
          <div className="card-glass rounded-2xl p-8">
            <form onSubmit={handleBooking} className="space-y-8">
              {/* Row 1: Calendar and Time Slots */}
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Calendar Picker */}
                <CalendarPicker
                  selectedDate={bookingData.date}
                  onDateSelect={(date) => {
                    setBookingData({ ...bookingData, date, time: '' });
                  }}
                  minDate={new Date().toISOString().split('T')[0]}
                />

                {/* Time Slot Picker */}
                <TimeSlotPicker
                  selectedDate={bookingData.date}
                  selectedTime={bookingData.time}
                  onTimeSelect={(time) => setBookingData({ ...bookingData, time })}
                  busySlots={busySlots}
                  isLoading={isLoadingSlots}
                />
              </div>

              {/* Row 2: Form Fields */}
              <div className="max-w-3xl mx-auto space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Name *"
                    required
                    value={bookingData.name}
                    onChange={(e) => setBookingData({...bookingData, name: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                  />

                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={bookingData.email}
                    onChange={(e) => setBookingData({...bookingData, email: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={bookingData.phone}
                    onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                  />

                  <select
                    value={bookingData.timezone}
                    onChange={(e) => setBookingData({...bookingData, timezone: e.target.value})}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#16E3FF] focus:outline-none [&>option]:bg-[#1D1D1D] [&>option]:text-white"
                  >
                    <option value="America/New_York">Eastern Time (ET)</option>
                    <option value="America/Chicago">Central Time (CT)</option>
                    <option value="America/Denver">Mountain Time (MT)</option>
                    <option value="America/Phoenix">Mountain Time - Arizona (MST)</option>
                    <option value="America/Los_Angeles">Pacific Time (PT)</option>
                    <option value="America/Anchorage">Alaska Time (AKT)</option>
                    <option value="Pacific/Honolulu">Hawaii Time (HST)</option>
                    <option value="Europe/London">London (GMT/BST)</option>
                    <option value="Europe/Paris">Central Europe (CET)</option>
                    <option value="Asia/Tokyo">Tokyo (JST)</option>
                    <option value="Australia/Sydney">Sydney (AEDT)</option>
                  </select>
                </div>

                <textarea
                  placeholder="What would you like to discuss? (optional)"
                  rows={3}
                  value={bookingData.message}
                  onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none resize-none"
                />

                <button
                  type="submit"
                  disabled={isBooking || !bookingData.date || !bookingData.time}
                  className="btn-primary w-full py-4 rounded-full text-white font-semibold disabled:opacity-50"
                >
                  {isBooking ? 'Scheduling...' : (
                    <>
                      <Calendar className="inline mr-2" size={20} />
                      Schedule Meeting
                    </>
                  )}
                </button>

                {bookingStatus === 'success' && (
                  <p className="text-[#16E3FF] text-center">
                    Meeting scheduled! Check your email for the Google Meet link.
                  </p>
                )}

                {bookingStatus === 'error' && (
                  <p className="text-red-400 text-center">
                    Failed to schedule meeting. Please try again.
                  </p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
