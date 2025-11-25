// ================================================
// FOOTER COMPONENT
// ================================================

import Image from 'next/image';
import Link from 'next/link';

export default function Footer() {
  // --- Navigation Structure ---
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

  // --- Render ---
  return (
    <footer className="bg-[#1D1D1D] border-t border-white/10 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Logo */}
        <div className="flex flex-col items-center mb-6">
          <Image
            src="/images/logos/Combo - Horizontal - White Phoesis (Blue Stars) - No BG - 700x200.png"
            alt="Phoesis"
            width={200}
            height={57}
          />
        </div>
        
        {/* Navigation Links */}
        <div className="grid md:grid-cols-2 gap-6 mb-6 max-w-2xl mx-auto">
          <div>
            <h3 className="text-[#16E3FF] font-semibold mb-2 text-sm">Company</h3>
            <ul className="space-y-1">
              {navigation.company.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#16E3FF] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-[#16E3FF] font-semibold mb-2 text-sm">Product</h3>
            <ul className="space-y-1">
              {navigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-white/60 hover:text-[#16E3FF] transition-colors text-sm"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Copyright & Legal */}
        <div className="border-t border-white/10 pt-4 text-center space-y-1">
          <p className="text-white/40 text-xs">
            © 2025 Phoesis Holdings LLC. All rights reserved.
          </p>
          <p className="text-white/40 text-xs">
            <Link href="/privacy" className="hover:text-[#16E3FF] transition-colors">
              Privacy Policy
            </Link>
          </p>
          <p className="font-space-age text-xl text-[#16E3FF] text-glow-cyan">
            We are the sky.
          </p>
          <p className="text-white/60 text-xs">
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
