'use client';

import { useState } from 'react';
import { syntaxHighlight } from '@/utils/syntaxHighlight';

// ============================================================================
// TYPES
// ============================================================================

type TerminalStatus = 'idle' | 'loading' | 'done' | 'error';

// ============================================================================
// MAIN PAGE
// ============================================================================

export default function HomePage() {
  return (
    <main style={{ backgroundColor: '#F7F4EE' }}>
      <StudioSection />
    </main>
  );
}

// ============================================================================
// STUDIO SECTION — Asymmetric Engineering Studio Layout
// ============================================================================

function StudioSection() {
  return (
    <section className="min-h-screen px-4 sm:px-6 lg:px-12 py-16 lg:py-24" style={{ backgroundColor: '#F7F4EE' }}>
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 lg:items-start">
          {/* ═══ LEFT COLUMN — The Product Mind ═══ */}
          <div className="flex flex-col gap-8 order-1">
            {/* Micro-capsule badge */}
            <div className="flex justify-start opacity-0 animate-fade-in-up" style={{ animationDelay: '0ms' }}>
              <span
                className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase"
                style={{ backgroundColor: '#C67C4E1A', color: '#C67C4E' }}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: '#C67C4E' }} />
                7+ Years Testing Scale → Building Product
              </span>
            </div>

            {/* Headline */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.2] mb-6" style={{ color: '#1C1917' }}>
                Hi, I'm Irvanno. I spent 7+ years breaking and securing code at{' '}
                <span className="font-semibold" style={{ color: '#00AED6' }}>GoPay</span>
                {' '}and{' '}
                <span className="font-semibold" style={{ color: '#03AC0E' }}>Tokopedia</span>
                . Now, I'm building the products instead.
              </h1>

              <p className="text-base sm:text-lg mb-8 leading-relaxed" style={{ color: '#1C1917' }}>
                From SDET writing test automation frameworks to PM writing PRDs — I bridge the gap between engineering precision and product delivery.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                {/* View Resume Button */}
                <a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold transition-colors group"
                  style={{
                    backgroundColor: '#1C1917',
                    color: '#F7F4EE',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#2563EB')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#1C1917')}
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
                  className="inline-flex items-center justify-center gap-2 rounded-2xl px-6 py-3 font-semibold border transition-colors group"
                  style={{
                    borderColor: '#DDD6C8',
                    color: '#1C1917',
                    backgroundColor: 'transparent',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = '#EFE9DD';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
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

          {/* ═══ RIGHT COLUMN — The Engineering Proof ═══ */}
          <div className="flex flex-col gap-6 order-4 lg:order-2">
            {/* Section eyebrow */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
              <p className="text-xs font-semibold uppercase tracking-widest mb-2" style={{ color: '#6B7280' }}>
                Developer API
              </p>
            </div>

            {/* cURL Snippet */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '250ms' }}>
              <CurlSnippet command="curl -L https://www.irvanno.com/api/profile" prompt="irvanno@irvanno.com ~ %" />
            </div>

            {/* Terminal */}
            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '300ms' }}>
              <BioShell />
            </div>

            {/* Footnote */}
            <p className="text-center text-xs" style={{ color: '#6B7280' }}>
              Edge runtime · Vercel · Jakarta, Indonesia ·{' '}
              <code className="font-mono">GET /api/profile</code>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// BIO SHELL — Interactive Terminal Component
// ============================================================================

function BioShell() {
  const [status, setStatus] = useState<TerminalStatus>('idle');
  const [profileJson, setProfileJson] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);

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

  function triggerRun() {
    setHasRun(true);
    handleRun();
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

        {/* Run Command button — single-use, unmounts after click */}
        {!hasRun && (
          <button
            onClick={triggerRun}
            className="inline-flex items-center gap-1.5 bg-slate-700 hover:bg-slate-600 text-slate-200 text-xs px-2.5 py-1 rounded transition-colors font-sans font-medium"
          >
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
            Run Command
          </button>
        )}
      </div>

      {/* ── Terminal body ── */}
      <div
        className="px-5 py-5 min-h-64 max-h-[560px] overflow-y-auto overflow-x-auto"
        style={{ background: 'radial-gradient(ellipse at top left, #1e293b 0%, #020617 70%)' }}
      >
        {/* ── Idle: blinking cursor with hint ── */}
        {status === 'idle' && (
          <div className="mt-2">
            <div className="flex items-center gap-0.5">
              <span className="text-slate-500 select-none">{PROMPT}</span>
              <span className="ml-2 inline-block h-4 w-2 bg-slate-600 animate-pulse rounded-sm" />
            </div>
            {!hasRun && (
              <p className="mt-3 text-xs text-slate-600 italic select-none">
                → Press "Run Command" to fetch live profile data
              </p>
            )}
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
              <span className="ml-2 inline-block h-4 w-2 bg-slate-600 animate-pulse rounded-sm" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// CURL SNIPPET — Standalone component for displaying and copying the API command
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
