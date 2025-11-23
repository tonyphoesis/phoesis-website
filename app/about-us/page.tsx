import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function AboutUs() {
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
              About Us
            </h1>
            <p className="text-xl text-white/80">
              Building the Future of Software Development
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="card-glass rounded-2xl p-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="flex justify-center">
              <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-[#16E3FF] shadow-lg shadow-[#16E3FF]/30">
                <Image
                  src="/images/tony 400x400 1.jpg"
                  alt="Tony Elliot"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div>
              <p className="text-[#16E3FF] font-semibold mb-2">Our Founder</p>
              <h2 className="font-space-age text-4xl mb-4">Tony Elliot</h2>
              <p className="text-white/80 leading-relaxed mb-4">
                Tony combines 12+ years in transportation management systems at companies like Trimble and Love's Travel Stops 
                with philosophy education, bringing unique pattern recognition and systems thinking to software architecture.
              </p>
              <p className="text-white/80 leading-relaxed">
                He built the entire Concretus platform in 7 days with no traditional coding background, demonstrating the power 
                of AI-assisted development when guided by deep systems understanding and organizational principles.
              </p>
            </div>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-center text-[#16E3FF]">Our Global Team</h2>
          <p className="text-center text-white/80 mb-8 max-w-3xl mx-auto">
            Hundreds of years of combined development experience from around the world. Our distributed team includes:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Eric Verdiguel</h3>
              <p className="text-white/70">30% equity business partner, Texas operations</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Rick Davis</h3>
              <p className="text-white/70">Technical expert from Trimble/PeopleNet</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Kawanna</h3>
              <p className="text-white/70">Phoenix operations</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Norman Thomas</h3>
              <p className="text-white/70">Advisor with Love's Travel Stops connections</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-glass rounded-2xl p-8 text-center">
            <h3 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Phoesis</h3>
            <p className="text-white/80">Nature - The natural emergence of order from chaos</p>
          </div>
          <div className="card-glass rounded-2xl p-8 text-center">
            <h3 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Concretus</h3>
            <p className="text-white/80">Concrete - Software that strengthens over time</p>
          </div>
          <div className="card-glass rounded-2xl p-8 text-center">
            <h3 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Perpetuum</h3>
            <p className="text-white/80">Forever - Systems built to last generations</p>
          </div>
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
