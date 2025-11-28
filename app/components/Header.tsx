'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: '/phoesis-vision', label: 'Vision' },
    { href: '/why-phoesis', label: 'Why Phoesis' },
    { href: '/phoesis-difference', label: 'Difference' },
    { href: '/platform', label: 'Platform' },
    { href: '/application-portfolio', label: 'Portfolio' },
    { href: '/engagement-process', label: 'Process' },
    { href: '/about-us', label: 'About' },
    { href: '/contact-us', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <Image
            src="/images/logos/phoesis-logo-horizontal-white.png"
            alt="Phoesis"
            width={200}
            height={57}
            priority
          />
        </Link>

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-white"
        >
          {isOpen ? <X size={32} /> : <Menu size={32} />}
        </button>

        <nav className={`${isOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-black/95 lg:bg-transparent`}>
          <ul className="flex flex-col lg:flex-row gap-6 p-6 lg:p-0">
            {navLinks.map(link => (
              <li key={link.href}>
                <Link 
                  href={link.href}
                  className="text-white hover:text-[#16E3FF] transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}