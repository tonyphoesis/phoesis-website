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
