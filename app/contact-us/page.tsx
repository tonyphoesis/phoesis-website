import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function ContactUs() {
  return (
    <main className="min-h-screen bg-black pt-24">
      <section className="relative h-[400px] mb-16">
        <Image
          src="/images/Full Sky Background - 2600x1600.png"
          alt="Background"
          fill
          className="object-cover"
        />
        <div className="relative z-10 h-full flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            <h1 className="font-space-age text-5xl md:text-6xl mb-6 text-[#16E3FF] text-glow-cyan">
              Get In Touch
            </h1>
            <p className="text-xl text-white/80">
              Let's Build Something Extraordinary Together
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-8">
        <div className="card-glass rounded-2xl p-8 mb-12">
          <div className="grid md:grid-cols-2 gap-8 text-center md:text-left">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Phoenix Office</h3>
              <p className="text-white/70">Phoenix, Arizona</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Texas Office</h3>
              <p className="text-white/70">Pattonville, Texas</p>
            </div>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-space-age mb-4 text-center text-[#16E3FF]">
            Response Time
          </h3>
          <p className="text-center text-white/80">
            We typically respond to all inquiries within 24 hours during business hours (Monday-Friday, 9 AM - 5 PM MST).
          </p>
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
