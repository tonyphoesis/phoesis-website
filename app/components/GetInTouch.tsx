'use client';

import { useState } from 'react';
import { Mic, Send, Calendar } from 'lucide-react';

export default function GetInTouch() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    interest: 'Product Demo',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

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

  return (
    <section className="py-20 bg-[#1D1D1D] relative">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="font-space-age text-5xl text-center mb-16 text-[#16E3FF] text-glow-cyan">
          Get In Touch
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="card-glass rounded-2xl p-8 relative">
            <div className="absolute top-4 right-4">
              <span className="bg-[#16E3FF]/20 text-[#16E3FF] px-3 py-1 rounded-full text-sm">
                Coming Soon
              </span>
            </div>
            
            <div className="text-center">
              <Mic size={64} className="mx-auto mb-6 text-[#16E3FF]" />
              <h3 className="font-space-age text-3xl mb-4 text-[#16E3FF]">
                Just talk to us and our AI will sort it out
              </h3>
              <p className="text-white/60 mb-8">
                No forms, no typing—just speak naturally and we will understand your needs
              </p>
              <button
                disabled
                className="bg-white/10 px-8 py-4 rounded-full text-white/40 cursor-not-allowed"
              >
                <Mic className="inline mr-2" size={20} />
                Record Message
              </button>
            </div>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <p className="text-white/60 text-sm mb-6 text-center">
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
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#16E3FF] focus:outline-none"
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

        <div className="mt-16 card-glass rounded-2xl p-8">
          <div className="text-center mb-8">
            <Calendar size={48} className="mx-auto mb-4 text-[#16E3FF]" />
            <h3 className="font-space-age text-3xl mb-4 text-[#16E3FF]">
              Book Time
            </h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Send email or book a meeting. Whether you want to start big or small, let us get started bringing your organizations true capabilities to life!
            </p>
          </div>
          
          <div className="text-center text-white/60">
            <p>Calendar booking integration coming soon</p>
            <p className="text-sm mt-2">(Requires Google Calendar OAuth setup)</p>
          </div>
        </div>
      </div>
    </section>
  );
}
