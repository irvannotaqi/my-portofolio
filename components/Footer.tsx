'use client';

export function Footer() {
  return (
    <footer
      className="py-12 px-4 sm:px-6 lg:px-8"
      style={{
        backgroundColor: '#F7F4EE',
        color: '#1C1917',
      }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm" style={{ color: '#1C1917' }}>
              © 2025 Irvanno Taqi Irmawan. All rights reserved.
            </p>
            <span className="hidden sm:block" style={{ color: '#DDD6C8' }}>
              •
            </span>
            <p className="text-xs italic" style={{ color: '#6B7280' }}>
              Built with Next.js & Vitest. Fueled by iced Americano and zero failing assertions.
            </p>
          </div>
          <div className="flex gap-6 text-sm">
            <a
              href="https://www.linkedin.com/in/irvanno-taqi-irmawan-ab1315155/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#1C1917' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1C1917')}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/irvannotaqi"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors"
              style={{ color: '#1C1917' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1C1917')}
            >
              GitHub
            </a>
            <a
              href="mailto:irvanno.taqi@gmail.com"
              className="transition-colors"
              style={{ color: '#1C1917' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#2563EB')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1C1917')}
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
