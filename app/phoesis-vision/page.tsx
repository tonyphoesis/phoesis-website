import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function PhoesisVision() {
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
              Phoesis Vision
            </h1>
            <p className="text-xl text-white/80">
              Universal Business Infrastructure for the AI Age
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">Our Mission</h2>
          <p className="text-lg text-white/80 leading-relaxed">
            We solve the Universal Organizational Debt Crisis—the 50,000-year-old problem of human coordination at scale. 
            Every organization, from ancient Rome to modern enterprises, faces the same challenge: how to maintain quality 
            and efficiency as they grow. We have cracked the code by applying proven organizational principles to AI orchestration.
          </p>
        </div>

        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">The Strategy-Execution Canyon</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-4">
            Traditional software development suffers from an 80/20 problem: 80% coordination overhead, 20% actual building. 
            Context fragments between systems, decisions get lost, and technical debt accumulates. Concretus bridges this 
            canyon by providing Universal Business Infrastructure—one integrated platform where strategy, execution, and 
            documentation flow seamlessly.
          </p>
        </div>

        
      </section>

      <GetInTouch />
    </main>
  );
}
