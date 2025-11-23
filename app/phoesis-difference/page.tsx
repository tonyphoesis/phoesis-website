import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function PhoesisDifference() {
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
              The Phoesis Difference
            </h1>
            <p className="text-xl text-white/80">
              Roman Concrete for the Digital Age
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="card-glass rounded-2xl p-8">
            <h2 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Speed</h2>
            <p className="text-4xl font-bold text-[#16E3FF] mb-4">324-1000x</p>
            <p className="text-white/80">
              Faster than traditional development. What takes competitors 6 months, we deliver in weeks.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <h2 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Quality</h2>
            <p className="text-white/80">
              Self-healing architecture. Our systems strengthen over time through continuous learning, not technical debt accumulation.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <h2 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Economics</h2>
            <p className="text-white/80">
              TEV Factory model. Build vertical-specific applications rapidly, scale to millions in ARR, exit while retaining licensing fees.
            </p>
          </div>
        </div>

        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">The Roman Concrete Philosophy</h2>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            Roman concrete structures have stood for 2,000 years and actually strengthen over time through chemical reactions 
            with seawater. Traditional software does the opposite—it accumulates technical debt and degrades. We built Concretus 
            to embody this ancient principle: software that gets better with use.
          </p>
          <p className="text-lg text-white/80 leading-relaxed">
            How? By applying the same organizational principles that scaled successful civilizations: standardized training, 
            documented procedures, hierarchical coordination, quality control, and continuous improvement. AI has the same flaws 
            as humans—it needs the same coordination systems.
          </p>
        </div>

        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">Our Technology Stack</h2>
          <p className="text-white/80 mb-4">
            Enterprise-grade components, battle-tested at scale:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#16E3FF] font-semibold mb-2">Core Infrastructure</h3>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Supabase (PostgreSQL) - 30+ years proven</li>
                <li>• Vercel Edge Network - Sub-100ms global</li>
                <li>• GitHub Enterprise - Industry standard</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#16E3FF] font-semibold mb-2">AI Orchestration</h3>
              <ul className="space-y-1 text-white/70 text-sm">
                <li>• Multi-Model Engine (Claude, GPT-4, Gemini)</li>
                <li>• Intelligent routing - best model per task</li>
                <li>• Enterprise tier agreements</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
