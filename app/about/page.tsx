'use client';

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: '#F7F4EE', color: '#1C1917' }} className="min-h-screen">
      <main className="px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="mx-auto max-w-2xl">
          {/* Avatar — Editorial Portrait (Float Left on Desktop) */}
          <div className="md:float-left md:mr-8 md:mb-4 mb-8 md:mb-0 flex justify-center md:justify-start">
            <div className="relative w-48 h-48">
              {/* Terracotta gradient ring */}
              <div
                className="absolute inset-0 rounded-xl p-[3px]"
                style={{ background: `linear-gradient(to bottom right, #C67C4E, #A0633A)` }}
              >
                {/* Avatar image */}
                <div className="w-full h-full rounded-xl overflow-hidden">
                  <Image
                    src="/avatar.png"
                    alt="Irvanno Taqi Irmawan"
                    width={192}
                    height={192}
                    className="w-full h-full object-cover object-top rounded-xl"
                    priority
                  />
                </div>
              </div>

              {/* Glow effect */}
              <div
                className="absolute -inset-4 rounded-xl blur-2xl -z-10"
                style={{ background: 'radial-gradient(circle, #C67C4E33 0%, transparent 70%)' }}
              />
            </div>
          </div>

          {/* Section Heading */}
          <div className="mb-12">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: '#6B7280' }}
            >
              My Story
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-[1.2] mb-6" style={{ color: '#1C1917' }}>
              From Quality Gatekeeper to Product Builder
            </h1>
          </div>

          {/* Narrative Block with Terracotta Accent */}
          <div className="border-l-4 pl-8 space-y-6" style={{ borderColor: '#C67C4E' }}>
            {/* First Paragraph */}
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#1C1917' }}>
              For over seven years, my job across Gojek, Tokopedia, and GoPay was to stress-test architectures, predict edge cases, and ensure financial transaction funnels didn't fail under multi-million user loads. I became obsessed with the brittle points where elegant code meets messy reality—the exact moments where a single millisecond of latency or a forgotten null check could cascade into millions of rupiah in lost revenue.
            </p>

            {/* Second Paragraph */}
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#1C1917' }}>
              Over time, I realized I didn't just want to protect the roadmap—I wanted to design it. Watching product decisions ship without understanding their technical cost, or worse, watching technical excellence get shipped but not marketed, felt like a waste of both worlds. The engineers solved the hard problem, and then nobody knew about it. The product shipped on schedule, and then crashed in production because the technical debt wasn't visible during planning.
            </p>

            {/* Third Paragraph */}
            <p className="text-base sm:text-lg leading-relaxed" style={{ color: '#1C1917' }}>
              I'm transitioning into Product Management because I love turning complex technical constraints into seamless user experiences. I want to be the bridge: fluent in the language of engineers, but speaking to business and users with clarity and conviction. My SDET background didn't teach me just to break things—it taught me to think probabilistically about failure modes, to automate repetitive validation, and to trust data over intuition. Those same skills apply to product discovery, user research, and managing technical roadmaps.
            </p>

            {/* Call to Action */}
            <div className="pt-8 md:clear-left">
              <p className="text-sm" style={{ color: '#1C1917' }}>
                Interested in chatting? Feel free to reach out via{' '}
                <a
                  href="mailto:irvanno.taqi@gmail.com"
                  className="font-semibold transition-colors"
                  style={{ color: '#2563EB' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  email
                </a>
                {' '}or{' '}
                <a
                  href="https://www.linkedin.com/in/irvanno-taqi-irmawan-ab1315155/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold transition-colors"
                  style={{ color: '#2563EB' }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.8')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  LinkedIn
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
