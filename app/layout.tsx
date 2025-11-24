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
  title: 'Phoesis Holdings | Build Enterprise Applications in Weeks',
  description: 'Concretus is our revolutionary AI-native platform that delivers software like Roman concrete — strengthening over time instead of accumulating technical debt.',
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
