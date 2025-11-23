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
