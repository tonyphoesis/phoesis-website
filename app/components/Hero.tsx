'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const slides = [
    {
      id: 'welcome',
      hasVideo: true,
      titleLine1: 'Build in Weeks',
      titleLine2: 'Not Quarters',
      subtitle: 'Our AI-native platform builds software with the durability of Roman concrete.',
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
      title: 'Our Core Platform',
      content: 'Enterprise-grade technology stack including Supabase, Claude AI, OpenAI, Google Cloud, Perplexity, Vercel, GitHub, PostgreSQL, and Vite.',
      link: '/platform',
    },
    {
      id: 'dogfood',
      titleLine1: 'We eat our',
      titleLine2: 'own cooking',
      content: 'Tired of technology vendors telling you how to use technology when they do not do it themselves? We make the best software fast, affordable, and rugged. Why would we use other peoples software when we can build better in days?',
      link: '/platform',
    },
    {
      id: 'process',
      title: 'Our Engagement Process',
      content: 'From Discovery to Architecture, Build, Validate, Deploy, and Scale. We transform your organizations capabilities.',
      link: '/engagement-process',
    },
    {
      id: 'about',
      title: 'About Us',
      content: 'Founded by Tony Elliot, combining 15+ years in technology with philosophy education and 30 years in business. Our globally diverse team brings hundreds of years of combined development experience.',
      link: '/about-us',
    },
  ];

  // Auto-rotate every 20 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 20000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleVideoEnded = () => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, 3000);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }
    if (isRightSwipe) {
      setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    }
    
    setTouchStart(0);
    setTouchEnd(0);
  };

  return (
    <section className="relative pt-24 pb-0">
      <div 
        className="relative h-[550px] overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
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
              
              {/* Video background layer - only on video slide */}
              {slide.hasVideo && index === currentSlide && (
                <div className="absolute inset-0 flex items-center justify-center z-5">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    playsInline
                    onEnded={handleVideoEnded}
                    className="w-[500px] h-[500px] object-contain"
                  >
                    <source src="/videos/Phoesis Animation v3.MP4" type="video/mp4" />
                  </video>
                </div>
              )}
              
              {/* Text overlay - centered vertically */}
              <div className="relative z-10 h-full flex items-center justify-center px-6">
                <div className="max-w-4xl text-center">
                  {/* Multi-line titles */}
                  {slide.titleLine1 && slide.titleLine2 ? (
                    <h1 className="font-space-age text-4xl md:text-5xl lg:text-6xl mb-6 text-glow-cyan text-[#16E3FF]">
                      {slide.titleLine1}
                      <br />
                      {slide.titleLine2}
                    </h1>
                  ) : (
                    <h1 className="font-space-age text-4xl md:text-5xl lg:text-6xl mb-6 text-glow-cyan text-[#16E3FF]">
                      {slide.title}
                    </h1>
                  )}
                  
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
        
        {/* Slide indicator dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? 'bg-[#16E3FF] w-8' : 'bg-white/30'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
