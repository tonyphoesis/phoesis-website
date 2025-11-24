import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function ApplicationPortfolio() {
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
              Application Portfolio
            </h1>
            <p className="text-xl text-white/80">
              Proof of Concept and Production Systems
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        {/*}
        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">Featured: H-2B Visa Management System</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Challenge</h3>
              <p className="text-white/80 mb-4">
                Immigration law firm needed case management system for H-2B visa applications. Traditional development 
                quoted 6 months and $250K+.
              </p>
              <h3 className="text-xl font-semibold mb-4 text-white">Solution</h3>
              <p className="text-white/80">
                Built complete system in 1 hour prototype, 2 weeks to production. Handles 220,000 rows of data with 
                real-time processing and comprehensive audit trails.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-4 text-white">Results</h3>
              <ul className="space-y-2 text-white/80">
                <li>• 324x faster development vs traditional</li>
                <li>• 220K rows processed in 15 minutes (vs 6 hours with competitors)</li>
                <li>• 207x performance improvement</li>
                <li>• $10.8M pipeline value demonstrated</li>
                <li>• Full customization and control</li>
              </ul>
            </div>
          </div>
        </div>
        */}

        <div className="grid md:grid-cols-2 gap-8">
          <div className="card-glass rounded-2xl p-8">
            <h3 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Coming Soon</h3>
            <p className="text-white/80">
              Additional case studies showcasing TEV Factory model across multiple verticals.
            </p>
          </div>

          <div className="card-glass rounded-2xl p-8">
            <h3 className="font-space-age text-2xl mb-4 text-[#16E3FF]">Your Project Here</h3>
            <p className="text-white/80 mb-4">
              Ready to build your vertical-specific application in weeks instead of months?
            </p>
            <a href="/contact-us" className="btn-primary inline-block px-6 py-3 rounded-full">
              Start Your TEV →
            </a>
          </div>
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
