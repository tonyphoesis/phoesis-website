import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function WhyPhoesis() {
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
              Why Phoesis
            </h1>
            <p className="text-xl text-white/80">
              The Traditional Path Leads to the Same Dreadful Place
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="card-glass rounded-2xl p-8">
            <h2 className="font-space-age text-2xl mb-4 text-red-400">Traditional Platform</h2>
            <ul className="space-y-3 text-white/80">
              <li>❌ Vendor lock-in</li>
              <li>❌ Limited customization</li>
              <li>❌ Monthly fees forever</li>
              <li>❌ Your data held hostage</li>
              <li>❌ Features you cannot change</li>
              <li>❌ Updates break your workflows</li>
            </ul>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <h2 className="font-space-age text-2xl mb-4 text-red-400">Custom Development</h2>
            <ul className="space-y-3 text-white/80">
              <li>❌ 6-12 month timelines</li>
              <li>❌ $500K-$5M budgets</li>
              <li>❌ Technical debt from day one</li>
              <li>❌ Coordination overhead dominates</li>
              <li>❌ Original developers leave</li>
              <li>❌ System degrades over time</li>
            </ul>
          </div>
        </div>

        

        
      </section>

      <GetInTouch />
    </main>
  );
}
