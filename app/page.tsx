'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
    { label: 'Product Teardowns', href: '/writing' },
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
        <div className="flex justify-center mb-8 lg:justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-indigo-400">
            <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 animate-pulse" />
            Open to PM Opportunities
          </span>
        </div>

        {/* 2-Column Responsive Layout: Grid with Smart Ordering */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 mb-16 lg:items-center">
          {/* 1. Text Section (Headline + Sub-text) — order-1 on mobile, col 1 row 1 on desktop */}
          <div className="text-center lg:text-left lg:col-start-1 lg:row-start-1 opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6 leading-[1.2]">
              Hi, I'm Irvanno. I spent 7+ years breaking and securing code at{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-sky-400">
                GoPay and Tokopedia
              </span>
              . Now, I'm building the products instead.
            </h1>

            {/* Sub-headline */}
            <p className="text-base sm:text-lg text-slate-400 mb-8 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              From SDET writing test automation frameworks to PM writing PRDs —
              I bridge the gap between engineering precision and product delivery.
            </p>
           </div>

           {/* 3. Avatar Section — order-2 on mobile, col 2 row 1-2 on desktop */}
           <div className="flex flex-shrink-0 justify-center order-2 lg:col-start-2 lg:row-start-1 lg:row-span-2 lg:items-center opacity-0 animate-fade-in-up" style={{ animationDelay: '150ms' }}>
             <div className="flex flex-col items-center gap-4 lg:gap-5">
               {/* Avatar image with ring */}
               <div className="relative w-48 h-48 lg:w-64 lg:h-64">
                 {/* Indigo gradient ring outer border */}
                 <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-400 to-indigo-600 p-[3px]">
                   {/* Avatar image with clip wrapper */}
                   <div className="w-full h-full rounded-full overflow-hidden">
                     <Image
                       src="/avatar.png"
                       alt="Irvanno Taqi Irmawan"
                       width={256}
                       height={256}
                       className="w-full h-full object-cover object-top rounded-full"
                       priority
                     />
                   </div>
                 </div>

                 {/* Glow effect behind avatar */}
                 <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/20 to-sky-500/20 rounded-full blur-2xl -z-10" />
               </div>

               {/* Recruiter CTA Cluster */}
               <div className="flex w-full flex-col sm:flex-row lg:flex-col gap-3 lg:gap-3 justify-center items-center lg:items-center">
                   {/* View Resume Button */}
                   <a
                     href="/resume.pdf"
                     target="_blank"
                     rel="noopener noreferrer"
                     className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-700 bg-slate-900 text-white px-6 py-3 font-semibold hover:bg-white hover:text-slate-900 hover:border-white transition-colors duration-200 group"
                   >
                   <svg
                     className="h-4 w-4 transition-transform group-hover:translate-y-0.5"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                   >
                     <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1.3A4.5 4.5 0 1113.5 13H11V9.413l1.293 1.293a1 1 0 001.414-1.414l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13H5.5z" />
                   </svg>
                   View Resume
                 </a>

                   {/* Email Button */}
                   <a
                     href="mailto:irvanno.taqi@gmail.com"
                     className="w-full sm:w-auto lg:w-full inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-300 bg-transparent text-slate-100 px-6 py-3 font-semibold hover:bg-white hover:text-slate-900 hover:border-white transition-colors duration-200 group"
                   >
                   <svg
                     className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                     xmlns="http://www.w3.org/2000/svg"
                     viewBox="0 0 20 20"
                     fill="currentColor"
                   >
                     <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                     <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                   </svg>
                   Email me
                 </a>
               </div>
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
    <section className="bg-white py-20 px-4 sm:px-6 lg:px-8 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
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
        <div className="text-center mb-12 opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
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

        {/* cURL Snippet */}
        <CurlSnippet command="curl -L https://www.irvanno.com/api/profile" prompt="irvanno@irvanno.com ~ %" />

        {/* Spacing */}
        <div className="mb-4" />

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

  const PROMPT = 'irvanno@irvanno.com ~ %';

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
    <div className="bg-slate-950 rounded-2xl shadow-2xl border border-white/[0.06] overflow-hidden font-mono text-sm">
      {/* ── Terminal chrome bar ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-white/[0.06]">
        {/* macOS traffic lights */}
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-rose-500" />
          <span className="h-3 w-3 rounded-full bg-amber-400" />
          <span className="h-3 w-3 rounded-full bg-emerald-500" />
        </div>

        {/* Window title */}
        <span className="text-xs text-slate-500 tracking-wide select-none">
          irvanno@irvanno.com: ~
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
       <div className="px-5 py-5 min-h-64 max-h-[560px] overflow-y-auto overflow-x-auto" style={{ background: 'radial-gradient(ellipse at top left, #1e293b 0%, #020617 70%)' }}>
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
            <pre
              className="leading-relaxed whitespace-pre text-xs sm:text-sm"
              style={{ color: '#cbd5e1' }}
              dangerouslySetInnerHTML={{ __html: syntaxHighlight(profileJson) }}
            />
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
// CURL SNIPPET — standalone component for displaying and copying the API command
// ============================================================================

interface CurlSnippetProps {
  command: string;
  prompt: string;
}

function CurlSnippet({ command, prompt }: CurlSnippetProps) {
  const [copied, setCopied] = useState(false);

  function handleCopy() {
    navigator.clipboard.writeText('curl -L https://www.irvanno.com/api/profile').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-2xl border border-white/[0.06] bg-slate-900 overflow-hidden font-mono text-sm">
      {/* ── Header Row ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border-b border-white/[0.05]">
        {/* Label */}
        <span className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
          CURL ME
        </span>
        {/* Copy Button — Always Visible */}
        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 border border-slate-700/70 hover:border-slate-600 text-slate-300 hover:text-slate-100 px-2 py-1 rounded-md text-xs font-medium transition-all duration-200"
          title="Copy command"
        >
          {copied ? (
            <>
              <svg
                className="h-3.5 w-3.5 text-emerald-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="text-emerald-400">Copied!</span>
            </>
          ) : (
            <>
              <svg
                className="h-3.5 w-3.5"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M8 3a1 1 0 011-1h2a1 1 0 011 1v2h4V4a2 2 0 00-2-2H8a2 2 0 00-2 2v2h4V3z" />
                <path
                  fillRule="evenodd"
                  d="M3 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm5 11a1 1 0 100-2 1 1 0 000 2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Copy</span>
            </>
          )}
        </button>
      </div>

      {/* ── Command Line ── */}
      <div className="px-4 py-3.5 bg-slate-900 overflow-x-auto">
        <span className="text-slate-100 leading-relaxed whitespace-pre">{command}</span>
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
