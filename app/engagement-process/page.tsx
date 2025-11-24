import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function EngagementProcess() {
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
              Our Engagement Process
            </h1>
            <p className="text-xl text-white/80">
              From Discovery to Scale in 10-12 Weeks
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16 space-y-12">
        <div className="space-y-8">
          {[
            {
              phase: '1. Discovery',
              duration: '',
              description: 'Deep dive into your organization, processes, and pain points. We identify quick wins and long-term opportunities.',
              deliverables: ['Comprehensive requirements document', 'Technology stack recommendations', 'Timeline and budget proposal']
            },
            {
              phase: '2. Architecture',
              duration: '',
              description: 'Design the complete system architecture with database schemas, API structures, and integration points.',
              deliverables: ['Database schema design', 'API documentation', 'Security and compliance plan']
            },
            {
              phase: '3. Build',
              duration: '',
              description: 'Rapid development using Concretus platform. Weekly demos and continuous feedback integration.',
              deliverables: ['Working application', 'Automated testing', 'Performance optimization']
            },
            {
              phase: '4. Validate',
              duration: '',
              description: 'Real-world testing with actual users and data. Refinement based on feedback.',
              deliverables: ['User acceptance testing', 'Bug fixes and improvements', 'Documentation']
            },
            {
              phase: '5. Deploy',
              duration: '',
              description: 'Production deployment with monitoring, backup systems, and security hardening.',
              deliverables: ['Live production system', 'Monitoring dashboards', 'Deployment documentation']
            },
            {
              phase: '6. Scale',
              duration: '',
              description: 'Continuous improvement, feature additions, and performance optimization as your needs evolve.',
              deliverables: ['Regular updates', 'New feature development', '24/7 support']
            }
          ].map((step) => (
            <div key={step.phase} className="card-glass rounded-2xl p-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                <h2 className="font-space-age text-2xl text-[#16E3FF]">{step.phase}</h2>
                <span className="text-white/60">{step.duration}</span>
              </div>
              <p className="text-white/80 mb-4">{step.description}</p>
              <div>
                <h3 className="text-[#16E3FF] font-semibold mb-2">Deliverables:</h3>
                <ul className="space-y-1 text-white/70">
                  {step.deliverables.map((item, idx) => (
                    <li key={idx}>• {item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        <div className="card-glass rounded-2xl p-8 text-center">
          <h2 className="font-space-age text-3xl mb-4 text-[#16E3FF]">Ready to Get Started?</h2>
          <p className="text-white/80 mb-6">
            Start bringing your organization's true capabilities to life.
          </p>
          <a href="/contact-us" className="btn-primary inline-block px-8 py-4 rounded-full">
            Schedule Discovery Call →
          </a>
        </div>
      </section>

      <GetInTouch />
    </main>
  );
}
