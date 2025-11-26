import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { PHProvider } from './providers';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Phoesis | Build Enterprise Applications in Weeks',
    template: '%s | Phoesis',
  },
  description:
    'Phoesis builds enterprise-grade applications using AI-native development. Our Concretus platform delivers software that strengthens over time instead of accumulating technical debt.',
  keywords: [
    'Phoesis',
    'Phoesis Holdings',
    'enterprise applications',
    'AI development',
    'Concretus',
    'software development',
    'AI-native platform',
  ],
  authors: [{ name: 'Phoesis Holdings LLC' }],
  creator: 'Phoesis',
  publisher: 'Phoesis Holdings LLC',
  metadataBase: new URL('https://phoesis.io'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://phoesis.io',
    siteName: 'Phoesis',
    title: 'Phoesis | Build Enterprise Applications in Weeks',
    description:
      'Phoesis builds enterprise-grade applications using AI-native development. Software that strengthens over time.',
    images: [
      {
        url: '/images/og-image.png', // Place your image in the /public folder
        width: 1200,
        height: 630,
        alt: 'Phoesis - Build Enterprise Applications in Weeks',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Phoesis | Build Enterprise Applications in Weeks',
    description:
      'Phoesis builds enterprise-grade applications using AI-native development.',
    images: ['/images/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`}>
        <PHProvider>
          <Header />
          {children}
          <Footer />
        </PHProvider>
      </body>
    </html>
  );
}
