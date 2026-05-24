'use client';

import { useState } from 'react';
import Link from 'next/link';

// ============================================================================
// TYPES
// ============================================================================

type TerminalStatus = 'idle' | 'loading' | 'done' | 'error';

// ============================================================================
// SYNTAX HIGHLIGHTER
// Walks a pretty-printed JSON string token by token and wraps each token
// in a <span> with a colour class. No external library required.
// ============================================================================

function syntaxHighlight(json: string): React.ReactNode[] {
  // Regex: captures keys, strings, numbers, booleans, nulls, and punctuation
  const tokenRegex = /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?|[{}[\],:])/g;

  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = tokenRegex.exec(json)) !== null) {
    const token = match[0];
    const start = match.index;

    // Push any whitespace/newlines between tokens as plain text
    if (start > lastIndex) {
      nodes.push(json.slice(lastIndex, start));
    }

    // Determine token type and assign colour
    let cls = 'text-slate-400'; // default: punctuation / brackets

    if (/^"/.test(token)) {
      if (/:$/.test(token)) {
        // Object key  →  sky blue
        cls = 'text-sky-400';
      } else {
        // String value  →  emerald green
        cls = 'text-emerald-400';
      }
    } else if (/true|false/.test(token)) {
      // Boolean  →  rose
      cls = 'text-rose-400';
    } else if (/null/.test(token)) {
      // Null  →  rose (dimmer)
      cls = 'text-rose-300';
    } else if (/^-?\d/.test(token)) {
      // Number  →  amber
      cls = 'text-amber-400';
    }

    nodes.push(
      <span key={start} className={cls}>
        {token}
      </span>
    );

    lastIndex = start + token.length;
  }

  // Trailing whitespace after last token
  if (lastIndex < json.length) {
    nodes.push(json.slice(lastIndex));
  }

  return nodes;
}

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function HomePage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
      />

      <main>
        <HeroSection />
        <BioShellSection />
      </main>

      <Footer />
    </div>
  );
}

// ============================================================================
// NAVBAR
// ============================================================================

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Blog/Teardowns', href: '/blog' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-slate-900 text-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span className="text-xl font-bold text-indigo-400 cursor-pointer">
                Irvanno Taqi
              </span>
            </Link>
          </div>

          {/* Desktop links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="relative text-sm font-medium text-slate-300 transition-colors hover:text-indigo-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d={
                  mobileMenuOpen
                    ? 'M6 18L18 6M6 6l12 12'
                    : 'M4 6h16M4 12h16M4 18h16'
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-3 pt-2">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium text-slate-300 hover:bg-slate-800 hover:text-indigo-400 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// ============================================================================
// HERO SECTION
// ============================================================================

function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
      {/* Subtle grid texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        {/* Badge */}
        <div className="flex justify-center mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Open to PM Opportunities
          </span>
        </div>

        {/* Headline */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight text-white mb-6 leading-[1.1]">
            Fintech-oriented{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
              Technical
            </span>
            <br />
            Product Manager
          </h1>

          {/* Sub-headline */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto mb-4 leading-relaxed">
            7+ years engineering and owning high-volume payment systems
            across{' '}
            <span className="text-slate-200 font-medium">GoPay</span>,{' '}
            <span className="text-slate-200 font-medium">Tokopedia</span>, and{' '}
            <span className="text-slate-200 font-medium">Gojek</span>.
          </p>
          <p className="text-sm sm:text-base text-slate-500 max-w-xl mx-auto mb-12">
            From SDET writing test automation frameworks to PM writing PRDs —
            I bridge the gap between engineering precision and product delivery.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* Primary CTA */}
            <Link
              href="/tools/funnel-simulator"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 group"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:-translate-y-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zm6-4a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zm6-3a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
              </svg>
              View Payment Funnel Dashboard
            </Link>

            {/* Ghost CTA */}
            <Link
              href="/blog"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 border border-slate-600 hover:border-slate-400 text-slate-300 hover:text-white font-semibold px-8 py-3.5 rounded-xl transition-all duration-200 group"
            >
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M2 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 002 2H4a2 2 0 01-2-2V5zm3 1h6v4H5V6zm6 6H5v2h6v-2z"
                  clipRule="evenodd"
                />
                <path d="M15 7h1a2 2 0 012 2v5.5a1.5 1.5 0 01-3 0V7z" />
              </svg>
              Read Product Teardowns
            </Link>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center mt-20">
          <div className="flex flex-col items-center gap-1 text-slate-600">
            <span className="text-xs tracking-widest uppercase">
              Explore
            </span>
            <svg
              className="h-4 w-4 animate-bounce"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BIO SHELL SECTION — light bg wrapper + dark terminal chrome
// ============================================================================

function BioShellSection() {
  return (
    <section className="bg-slate-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Section heading */}
        <div className="text-center mb-12">
          <p className="text-xs font-semibold uppercase tracking-widest text-indigo-500 mb-3">
            Developer API
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Query my profile directly
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto">
            My career data is served from a live{' '}
            <code className="text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded text-sm font-mono">
              /api/profile
            </code>{' '}
            endpoint. Hit{' '}
            <span className="font-medium text-slate-700">Run Command</span>{' '}
            to fetch it in real time.
          </p>
        </div>

        {/* The terminal */}
        <BioShell />

        {/* Footnote */}
        <p className="text-center text-xs text-slate-400 mt-6">
          Edge runtime · Vercel · Jakarta, Indonesia ·{' '}
          <code className="font-mono">GET /api/profile</code>
        </p>
      </div>
    </section>
  );
}

// ============================================================================
// BIO SHELL — interactive terminal component
// ============================================================================

function BioShell() {
  const [status, setStatus] = useState<TerminalStatus>('idle');
  const [profileJson, setProfileJson] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const PROMPT = 'irvanno@macbook ~ %';
  const COMMAND = 'curl http://localhost:3000/api/profile';

  async function handleRun() {
    setStatus('loading');
    setProfileJson(null);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/profile');
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      setProfileJson(JSON.stringify(data, null, 2));
      setStatus('done');
    } catch (err) {
      setErrorMsg(
        err instanceof Error ? err.message : 'Unknown error occurred'
      );
      setStatus('error');
    }
  }

  return (
    <div className="bg-slate-950 rounded-2xl shadow-2xl border border-slate-800 overflow-hidden font-mono text-sm">
      {/* ── Terminal chrome bar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800">
        {/* macOS traffic lights */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
        </div>

        {/* Window title */}
        <span className="text-xs text-slate-500 tracking-wide select-none">
          irvanno@macbook: ~
        </span>

        {/* Run button */}
        <button
          onClick={handleRun}
          disabled={status === 'loading'}
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold transition-all duration-200 ${
            status === 'loading'
              ? 'bg-slate-700 text-slate-500 cursor-not-allowed'
              : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-lg shadow-indigo-500/20'
          }`}
        >
          {status === 'loading' ? (
            <>
              <svg
                className="h-3 w-3 animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              Fetching...
            </>
          ) : (
            <>
              {/* Play icon */}
              <svg
                className="h-3 w-3"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              {status === 'done' || status === 'error' ? 'Re-run' : 'Run Command'}
            </>
          )}
        </button>
      </div>

      {/* ── Terminal body ── */}
      <div className="px-5 py-5 min-h-64 max-h-[560px] overflow-y-auto overflow-x-auto">
        {/* The prompt line — always visible */}
        <div className="flex items-start gap-2 flex-wrap">
          <span className="text-emerald-500 select-none shrink-0">{PROMPT}</span>
          <span className="text-slate-300 break-all">{COMMAND}</span>
        </div>

        {/* ── Idle: blinking cursor ── */}
        {status === 'idle' && (
          <div className="mt-2 flex items-center gap-0.5">
            <span className="text-slate-500 select-none">{PROMPT}</span>
            <span className="ml-2 inline-block h-4 w-2 bg-indigo-400 animate-pulse rounded-sm" />
          </div>
        )}

        {/* ── Loading: spinner line ── */}
        {status === 'loading' && (
          <div className="mt-3 flex items-center gap-2 text-slate-500">
            <svg
              className="h-3.5 w-3.5 animate-spin shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            <span className="text-slate-400 italic">
              Connecting to{' '}
              <span className="text-sky-500 not-italic">/api/profile</span>
              <span className="animate-pulse">...</span>
            </span>
          </div>
        )}

        {/* ── Error ── */}
        {status === 'error' && errorMsg && (
          <div className="mt-3 space-y-1">
            <p className="text-rose-500">
              <span className="text-slate-500">curl: </span>
              {errorMsg}
            </p>
            <p className="text-slate-600 text-xs mt-2">
              # Make sure the dev server is running on port 3000
            </p>
          </div>
        )}

        {/* ── Done: syntax-highlighted JSON ── */}
        {status === 'done' && profileJson && (
          <div className="mt-3">
            {/* HTTP status line for realism */}
            <p className="text-slate-600 text-xs mb-2 select-none">
              HTTP/1.1 200 OK · Content-Type: application/json
            </p>
            <pre className="leading-relaxed whitespace-pre text-xs sm:text-sm">
              {syntaxHighlight(profileJson)}
            </pre>
            {/* Trailing prompt after output */}
            <div className="mt-4 flex items-center gap-0.5">
              <span className="text-emerald-500 select-none">{PROMPT}</span>
              <span className="ml-2 inline-block h-4 w-2 bg-indigo-400 animate-pulse rounded-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// FOOTER
// ============================================================================

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © 2025 Irvanno Taqi Irmawan. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a
              href="https://www.linkedin.com/in/irvanno-taqi-irmawan-ab1315155/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/irvannotaqi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href="mailto:irvanno.taqi@gmail.com"
              className="hover:text-indigo-400 transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
