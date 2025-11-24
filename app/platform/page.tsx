import Image from 'next/image';
import GetInTouch from '../components/GetInTouch';

export default function Platform() {
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
              Concretus Platform
            </h1>
            <p className="text-xl text-white/80">
              Universal Business Infrastructure
            </p>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="card-glass rounded-2xl p-8 mb-12">
          <div className="flex items-center justify-center mb-6">
            <div className="bg-gradient-to-r from-[#16E3FF] to-[#0A82BF] px-6 py-3 rounded-full">
              <span className="font-space-age text-xl">Powered by Concretus</span>
            </div>
          </div>
          <p className="text-center text-white/80 max-w-3xl mx-auto">
            Our proprietary platform for software development.
          </p>
        </div>

        <div className="mb-16">
          <h2 className="font-space-age text-4xl mb-8 text-center text-[#16E3FF]">Technology Stack</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-white/20">
                  <th className="p-4 text-[#16E3FF]">Category</th>
                  <th className="p-4 text-[#16E3FF]">Tool</th>
                  <th className="p-4 text-[#16E3FF]">What It Does</th>
                  <th className="p-4 text-[#16E3FF]">Why It Matters</th>
                </tr>
              </thead>
              <tbody className="text-white/80">
                <tr className="border-b border-white/10">
                  <td className="p-4">Core Database</td>
                  <td className="p-4">Supabase (PostgreSQL)</td>
                  <td className="p-4">Production database with built-in APIs</td>
                  <td className="p-4">30+ years proven reliability</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">AI Orchestration</td>
                  <td className="p-4">Multi-Model Engine</td>
                  <td className="p-4">Intelligent routing across Claude, GPT-4, Gemini</td>
                  <td className="p-4">Best results without vendor lock-in</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Deployment</td>
                  <td className="p-4">Vercel Edge Network</td>
                  <td className="p-4">Global CDN with instant deployment</td>
                  <td className="p-4">Sub-100ms response times worldwide</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Version Control</td>
                  <td className="p-4">GitHub Enterprise</td>
                  <td className="p-4">Code repository and deployment pipelines</td>
                  <td className="p-4">Industry standard, 100M+ developers</td>
                </tr>
                <tr className="border-b border-white/10">
                  <td className="p-4">Security</td>
                  <td className="p-4">Row-Level Security + OAuth 2.0</td>
                  <td className="p-4">Database-level security with enterprise auth</td>
                  <td className="p-4">Military-grade encryption, zero-trust architecture</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Temporarily hidden
        <div className="card-glass rounded-2xl p-8">
          <h2 className="font-space-age text-3xl mb-6 text-[#16E3FF]">Platform Features</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Data Builder</h3>
              <p className="text-white/80">Visual database schema design with automatic API generation</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Ask Ricky</h3>
              <p className="text-white/80">AI assistant with multi-model routing for optimal results</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Ricky Empire</h3>
              <p className="text-white/80">Hierarchical AI agent network inspired by Roman military organization</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2 text-[#16E3FF]">Circle of Service</h3>
              <p className="text-white/80">Complete workflow from prompt to production in 10 minutes</p>
            </div>
          </div>
        </div>
        */}
      </section>

      <GetInTouch />
    </main>
  );
}
