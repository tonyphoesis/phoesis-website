/**
 * GetInTouch Component
 * Version: 2.0
 * Modified: 2025-12-01 00:00:00 UTC
 * Modified By: Claude Code
 * Changes: Updated booking section with visual calendar picker (Calendly-style layout)
 */

'use client';

import { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send, Calendar, RotateCcw } from 'lucide-react';
import CalendarPicker from './CalendarPicker';
import TimeSlotPicker from './TimeSlotPicker';

export default function GetInTouch() {
  // ================================================
  // STATE MANAGEMENT
  // ================================================
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Product Demo',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [recordingTime, setRecordingTime] = useState(0);
  const recognitionRef = useRef<any>(null);
  const timeoutRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const transcriptBoxRef = useRef<HTMLDivElement>(null);


  // ================================================
  // VOICE RECORDING SETUP
  // ================================================
  
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    
    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    if (recognitionRef.current) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event: any) => {
      let fullTranscript = '';

      for (let i = 0; i < event.results.length; i++) {
        fullTranscript += event.results[i][0].transcript;
      }

      setVoiceTranscript(fullTranscript);
      
      if (transcriptBoxRef.current) {
        transcriptBoxRef.current.scrollTop = transcriptBoxRef.current.scrollHeight;
      }

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        stopRecording();
      }, 120000);
    };

    recognition.onerror = (event: any) => {
      console.error('Speech error:', event.error);
      if (event.error !== 'no-speech') {
        stopRecording();
      }
    };

    recognition.onend = () => {
      if (isRecording && recognitionRef.current) {
        recognitionRef.current.start();
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
        recognitionRef.current = null;
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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
      console.log('[BOOKING] GetInTouch - Fetching busy slots for:', {
        date: bookingData.date,
        timezone: bookingData.timezone,
        url: `/api/booking?date=${bookingData.date}&timezone=${bookingData.timezone}`
      });

      try {
        const response = await fetch(
          `/api/booking?date=${bookingData.date}&timezone=${bookingData.timezone}`
        );

        console.log('[BOOKING] GetInTouch - API response status:', response.status);

        if (response.ok) {
          const data = await response.json();
          console.log('[BOOKING] GetInTouch - API response data:', data);
          console.log('[BOOKING] GetInTouch - Setting busySlots to:', data.busySlots || []);
          setBusySlots(data.busySlots || []);
        } else {
          console.error('[BOOKING] GetInTouch - API response not OK:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('[BOOKING] GetInTouch - Failed to fetch busy slots:', error);
      } finally {
        setIsLoadingSlots(false);
      }
    };

    fetchBusySlots();
  }, [bookingData.date, bookingData.timezone]);

  // ================================================
  // VOICE RECORDING HANDLERS
  // ================================================
  
  const startRecording = () => {
    if (!recognitionRef.current) return;
    
    setVoiceTranscript('');
    setRecordingTime(0);
    setIsRecording(true);
    recognitionRef.current.start();
    
    timerRef.current = setInterval(() => {
      setRecordingTime(prev => prev + 1);
    }, 1000);
    
    timeoutRef.current = setTimeout(() => {
      stopRecording();
    }, 120000);
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsRecording(false);
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  const resetVoiceRecording = () => {
    stopRecording();
    setVoiceTranscript('');
    setRecordingTime(0);
  };

  const sendVoiceMessage = async () => {
    if (!voiceTranscript.trim()) return;
    
    setIsSubmitting(true);
    
    try {
      const timestamp = new Date().toLocaleString('en-US', { 
        timeZone: 'America/Phoenix',
        dateStyle: 'short',
        timeStyle: 'short'
      });
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `Voice Message - ${timestamp}`,
          email: 'voice-recording@phoesis.io',
          company: 'Voice Recording',
          interest: 'Voice Message',
          message: voiceTranscript,
        }),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setVoiceTranscript('');
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ================================================
  // FORM HANDLERS
  // ================================================
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '', company: '', interest: 'Product Demo', message: '' });
        setTimeout(() => setSubmitStatus('idle'), 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

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
  // UTILITY FUNCTIONS
  // ================================================
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // ================================================
  // RENDER
  // ================================================

  return (
    <section className="pt-16 pb-20 bg-[#1D1D1D] relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-space-age text-5xl text-center mb-16 text-[#16E3FF] text-glow-cyan">
          Get In Touch
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          {/* --- Voice Recording Section --- */}
          <div className="card-glass rounded-2xl p-8">
            <div className="text-center mb-8">
              <Mic size={64} className="mx-auto mb-6 text-[#16E3FF]" />
              <h3 className="font-space-age text-3xl mb-4 text-[#16E3FF]">
                Just talk to us
              </h3>
              <p className="text-white/80 mb-4">
                No forms, no typing—just speak naturally
              </p>
              <p className="text-white/60 text-sm mb-2">
                Don't worry about pauses or "um"s—we understand natural speech
              </p>
              <p className="text-[#16E3FF] text-sm font-semibold">
                Be sure to tell us your name and how to reach you!
              </p>
            </div>
            
            {!isSupported ? (
              <div className="text-center text-red-400 p-4 bg-red-400/10 rounded-lg">
                Voice recording not supported in this browser. Please use Chrome, Edge, or Safari.
              </div>
            ) : (
              <div className="space-y-4">
                {/* Recording Controls */}
                <div className="flex justify-center gap-4">
                  {!isRecording ? (
                    <button
                      onClick={startRecording}
                      className="btn-primary px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2"
                    >
                      <Mic size={20} />
                      Record Message
                    </button>
                  ) : (
                    <button
                      onClick={stopRecording}
                      className="bg-[#16E3FF] hover:bg-[#0A82BF] px-8 py-4 rounded-full text-white font-semibold flex items-center gap-2 animate-pulse"
                    >
                      <MicOff size={20} />
                      Stop Recording
                    </button>
                  )}
                </div>

                {/* Recording Status */}
                {isRecording && (
                  <div className="text-center">
                    <div className="inline-flex items-center gap-2 bg-[#16E3FF]/20 px-4 py-2 rounded-full">
                      <div className="w-3 h-3 bg-[#16E3FF] rounded-full animate-pulse"></div>
                      <span className="text-[#16E3FF] font-semibold">
                        Recording... {formatTime(recordingTime)}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs mt-2">
                      Auto-stops after 2 minutes of recording
                    </p>
                  </div>
                )}

                {/* Transcript Display */}
                {(voiceTranscript || isRecording) && (
                  <div 
                    ref={transcriptBoxRef}
                    className="bg-white/5 border border-white/10 rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto"
                  >
                    {voiceTranscript ? (
                      <p className="text-white whitespace-pre-wrap">{voiceTranscript}</p>
                    ) : (
                      <p className="text-white/40 italic">Start speaking...</p>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                {voiceTranscript && !isRecording && (
                  <div className="flex gap-4 justify-center">
                    <button
                      onClick={resetVoiceRecording}
                      className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-full text-white font-semibold flex items-center gap-2"
                    >
                      <RotateCcw size={18} />
                      Start Over
                    </button>
                    <button
                      onClick={sendVoiceMessage}
                      disabled={isSubmitting}
                      className="btn-primary px-8 py-3 rounded-full text-white font-semibold flex items-center gap-2 disabled:opacity-50"
                    >
                      <Send size={18} />
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                )}

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-[#16E3FF] text-center">
                    Message sent! We will be in touch within 24 hours.
                  </p>
                )}
                
                {submitStatus === 'error' && (
                  <p className="text-red-400 text-center">
                    Failed to send message. Please try again.
                  </p>
                )}
              </div>
            )}
          </div>

          {/* --- Traditional Form Section --- */}
          <div className="card-glass rounded-2xl p-8">
            <p className="text-white text-base mb-6 text-center">
  Or if you prefer doing all the work yourself, type in this form
</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Name *"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                />
              </div>
              
              <div>
                <input
                  type="email"
                  placeholder="Email *"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                />
              </div>
              
              <div>
                <input
                  type="text"
                  placeholder="Company"
                  value={formData.company}
                  onChange={(e) => setFormData({...formData, company: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                />
              </div>
              
              <div>
                <select
                  value={formData.interest}
                  onChange={(e) => setFormData({...formData, interest: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#16E3FF] focus:outline-none [&>option]:bg-[#1D1D1D] [&>option]:text-white"
                >
                  <option value="Product Demo">Product Demo</option>
                  <option value="Partnership">Partnership</option>
                  <option value="Build a TEV">Build a TEV</option>
                  <option value="Consulting">Consulting</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              
              <div>
                <textarea
                  placeholder="Message *"
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none resize-none"
                />
              </div>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full py-4 rounded-full text-white font-semibold disabled:opacity-50"
              >
                {isSubmitting ? 'Sending...' : (
                  <>
                    <Send className="inline mr-2" size={20} />
                    Send Message
                  </>
                )}
              </button>
              
              {submitStatus === 'success' && (
                <p className="text-[#16E3FF] text-center">
                  Message sent! We will be in touch within 24 hours.
                </p>
              )}
              
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center">
                  Failed to send message. Please try again.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* --- Calendar Booking Section --- */}
        <div className="mt-16 card-glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <Calendar size={48} className="mx-auto mb-4 text-[#16E3FF]" />
            <h3 className="font-space-age text-3xl mb-4 text-[#16E3FF]">
              Book Time
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Schedule a meeting with us. We'll send you a Google Meet link.
            </p>
          </div>

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
                timezone={bookingData.timezone}
                onTimezoneChange={(timezone) => setBookingData({ ...bookingData, timezone })}
              />
            </div>

            {/* Row 1: Name, Email, Phone - THREE equal columns */}
            <div className="max-w-4xl mx-auto space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
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

                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={bookingData.phone}
                  onChange={(e) => setBookingData({...bookingData, phone: e.target.value})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none"
                />
              </div>

              {/* Row 2: Message textarea - full width */}
              <textarea
                placeholder="What would you like to discuss? (optional)"
                rows={3}
                value={bookingData.message}
                onChange={(e) => setBookingData({...bookingData, message: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/40 focus:border-[#16E3FF] focus:outline-none resize-none"
              />

              {/* Row 3: Schedule button - centered */}
              <div className="flex justify-center">
                <button
                  type="submit"
                  disabled={isBooking || !bookingData.date || !bookingData.time}
                  className="btn-primary px-12 py-4 rounded-full text-white font-semibold disabled:opacity-50"
                >
                  {isBooking ? 'Scheduling...' : (
                    <>
                      <Calendar className="inline mr-2" size={20} />
                      Schedule Meeting
                    </>
                  )}
                </button>
              </div>

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
    </section>
  );
}