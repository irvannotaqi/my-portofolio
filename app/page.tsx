'use client';

import { useState } from 'react';
import Link from 'next/link';
import { syntaxHighlight } from '@/utils/syntaxHighlight';

// ============================================================================
// TYPES
// ============================================================================

type TerminalStatus = 'idle' | 'loading' | 'done' | 'error';

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
        <HumanStorySection />
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
        <div className="flex justify-center mb-8 lg:justify-start">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Open to PM Opportunities
          </span>
        </div>

        {/* 2-Column Layout: Text (left) + Avatar (right) */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-16">
          {/* Left Column: Headline & CTAs */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
              Hi, I'm Irvanno. I spent 7+ years breaking and securing code at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                GoPay and Tokopedia
              </span>
              . Now, I'm building the products instead.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed">
              From SDET writing test automation frameworks to PM writing PRDs —
              I bridge the gap between engineering precision and product delivery.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4">
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

          {/* Right Column: Avatar Container */}
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 lg:w-64 lg:h-64">
              {/* Indigo gradient ring outer border */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 p-1">
                {/* Avatar content: slate background with initials */}
                <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center border-4 border-slate-800">
                  <div className="text-center">
                    <div className="text-5xl lg:text-7xl font-bold text-indigo-400">IT</div>
                    <p className="text-xs text-slate-500 mt-2 tracking-widest uppercase">Irvanno Taqi</p>
                  </div>
                </div>
              </div>

              {/* Optional glow effect behind avatar */}
              <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 rounded-full blur-2xl -z-10" />
            </div>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="flex justify-center lg:justify-start mt-16">
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
// HUMAN STORY SECTION — "The Human Behind the Code"
// ============================================================================

function HumanStorySection() {
  return (
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        {/* Section Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-8 text-center">
          From Quality Gatekeeper to Product Builder
        </h2>

        {/* Narrative Block with left-border accent */}
        <div className="border-l-4 border-indigo-500 pl-6 space-y-6">
          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            For over seven years, my job across Gojek, Tokopedia, and GoPay was to stress-test architectures, predict edge cases, and ensure financial transaction funnels didn't fail under multi-million user loads. I became obsessed with the brittle points where elegant code meets messy reality—the exact moments where a single millisecond of latency or a forgotten null check could cascade into millions of rupiah in lost revenue.
          </p>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            Over time, I realized I didn't just want to protect the roadmap—I wanted to design it. Watching product decisions ship without understanding their technical cost, or worse, watching technical excellence get shipped but not marketed, felt like a waste of both worlds.
          </p>

          <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
            I'm transitioning into Product Management because I love turning complex technical constraints into seamless user experiences. I want to be the bridge: fluent in the language of engineers, but speaking to business and users with clarity and conviction.
          </p>
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
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <p className="text-sm">
              © 2025 Irvanno Taqi Irmawan. All rights reserved.
            </p>
            <span className="hidden sm:block text-slate-700">•</span>
            <p className="text-xs text-slate-500 italic">
              Built with Next.js & Vitest. Fueled by iced Americano and zero failing assertions.
            </p>
          </div>
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
