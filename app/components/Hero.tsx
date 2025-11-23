// ================================================
// FILE 1: app/components/Hero.tsx
// The main carousel with 7 slides and video animation
// ================================================

'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [videoPlayCount, setVideoPlayCount] = useState(0);
  const [showLogo, setShowLogo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      id: 'welcome',
      hasVideo: true,
      title: 'Build Enterprise Applications in Weeks, Not Months',
      subtitle: 'Concretus is our revolutionary AI-native platform that delivers software like Roman concrete — strengthening over time instead of accumulating technical debt.',
    },
    {
      id: 'problem',
      title: 'The Inevitable Problem',
      content: 'Traditional choices for software have been Platform or Custom. Both paths lead to the same dreadful place—mounting technical debt, coordination failures, and systems that degrade over time. Are you sick and tired of being sick and tired of these paths? We were. That is why we started Phoesis.',
      link: '/why-phoesis',
    },
    {
      id: 'difference',
      title: 'The Phoesis Difference',
      content: 'We apply the same organizational principles that scaled Roman civilization and modern enterprises to AI orchestration. The result? Software that strengthens over time through standardized training, documented procedures, hierarchical coordination, and continuous improvement.',
      link: '/phoesis-difference',
    },
    {
      id: 'platform',
      title: 'Our Core Platform Enables',
      content: 'Enterprise-grade technology stack including Supabase, Claude AI, OpenAI, Google Cloud, Perplexity, Vercel, GitHub, PostgreSQL, and Vite.',
      link: '/platform',
    },
    {
      id: 'dogfood',
      title: 'We Eat Our Own Dog Food',
      content: 'Tired of technology vendors telling you how to use technology when they do not do it themselves? We make the best software fast, affordable, and rugged. Why would we use other peoples software when we can build better in days?',
      subtitle: 'This website was built with Concretus in 3 days.',
      link: '/platform',
    },
    {
      id: 'process',
      title: 'Our Engagement Process',
      content: 'From Discovery to Architecture, Build, Validate, Deploy, and Scale—typically 10-12 weeks to transform your organizations capabilities.',
      link: '/engagement-process',
    },
    {
      id: 'about',
      title: 'About Us',
      content: 'Founded by Tony Elliot, combining 12 plus years in transportation systems with philosophy education. Our global team brings hundreds of years of combined development experience.',
      link: '/about-us',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleVideoEnded = () => {
    setVideoPlayCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) {
        setTimeout(() => setShowLogo(true), 100);
      } else if (videoRef.current) {
        videoRef.current.play();
      }
      return newCount;
    });
  };

  return (
    <section className="relative min-h-screen pt-24">
      <div className="relative h-[700px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <Image
                src="/images/Full Sky Background - 2600x1600.png"
                alt="Background"
                fill
                className="object-cover"
                priority={index === 0}
              />
              
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="max-w-4xl text-center">
                  {slide.hasVideo && index === currentSlide && (
                    <div className="relative mb-8 mx-auto" style={{ width: '400px', height: '400px' }}>
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        playsInline
                        onEnded={handleVideoEnded}
                        className={`absolute inset-0 w-full h-full object-contain transition-opacity duration-2000 ${showLogo ? 'opacity-0' : 'opacity-100'}`}
                      >
                        <source src="/videos/Phoesis Animation v3.MP4" type="video/mp4" />
                      </video>
                      
                      {showLogo && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Image
                            src="/images/logos/Blue Circle - No BG - 512x512.png"
                            alt="Phoesis"
                            width={400}
                            height={400}
                          />
                        </div>
                      )}
                    </div>
                  )}
                  
                  <h1 className="font-space-age text-4xl md:text-5xl lg:text-6xl mb-6 text-glow-cyan text-[#16E3FF]">
                    {slide.title}
                  </h1>
                  
                  {slide.subtitle && (
                    <p className="text-lg md:text-xl lg:text-2xl mb-8 text-white/90">
                      {slide.subtitle}
                    </p>
                  )}
                  
                  {slide.content && (
                    <p className="text-base md:text-lg lg:text-xl mb-8 text-white/80 max-w-3xl mx-auto">
                      {slide.content}
                    </p>
                  )}
                  
                  {slide.link && (
                    <Link
                      href={slide.link}
                      className="btn-primary inline-block px-8 py-4 rounded-full text-white font-semibold hover:scale-105 transition-transform"
                    >
                      Learn More →
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
        >
          <ChevronLeft size={32} />
        </button>
        
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 p-3 rounded-full transition-colors"
        >
          <ChevronRight size={32} />
        </button>
        
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#16E3FF] w-8' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ================================================
// FILE 2: app/components/GetInTouch.tsx
// Contact form and booking calendar section
// ================================================

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
          {/* Voice Recording Placeholder */}
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

          {/* Contact Form */}
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

        {/* Booking Calendar Section */}
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

// ================================================
// FILE 3: app/components/Footer.tsx
// Site footer with navigation and branding
// ================================================

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  const navigation = {
    company: [
      { name: 'Vision', href: '/phoesis-vision' },
      { name: 'Why Phoesis', href: '/why-phoesis' },
      { name: 'Difference', href: '/phoesis-difference' },
      { name: 'About Us', href: '/about-us' },
    ],
    product: [
      { name: 'Platform', href: '/platform' },
      { name: 'Portfolio', href: '/application-portfolio' },
      { name: 'Process', href: '/engagement-process' },
      { name: 'Contact', href: '/contact-us' },
    ],
  };

  return (
    <footer className="bg-[#1D1D1D] border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col items-center mb-8">
          <Image
            src="/images/logos/Combo - Horizontal - White Phoesis (Blue Stars) - No BG - 700x200.png"
            alt="Phoesis"
            width={250}
            height={71}
          />
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <h3 className="text-[#16E3FF] font-semibold mb-4">Company</h3>
            <ul className="space-y-2">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#16E3FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#16E3FF] font-semibold mb-4">Product</h3>
            <ul className="space-y-2">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#16E3FF] transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 text-center space-y-2">
          <p className="text-white/40 text-sm">
            © 2025 Phoesis Holdings LLC. All rights reserved.
          </p>
          <p className="font-space-age text-2xl text-[#16E3FF] text-glow-cyan">
            We are the sky.
          </p>
          <p className="text-white/60 text-sm">
            Powered by{' '}
            <Link href="/platform" className="text-[#16E3FF] hover:underline">
              Concretus
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
