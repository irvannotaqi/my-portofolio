'use client';

import { useState } from 'react';
import Link from 'next/link';

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

export function Navbar({ mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Product Teardowns', href: '/writing' },
  ];

  return (
    <nav
      className="sticky top-0 z-50 transition-colors"
      style={{
        backgroundColor: '#F7F4EE',
      }}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <span
                className="text-xl font-bold cursor-pointer transition-opacity hover:opacity-70"
                style={{ color: '#1C1917' }}
              >
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
                  className="text-sm font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#1C1917' }}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile burger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 transition-colors"
            style={{ color: '#1C1917' }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#EFE9DD')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
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
          <div className="md:hidden pb-3 pt-2" style={{ backgroundColor: '#EFE9DD' }}>
            <div className="space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block rounded-md px-3 py-2 text-base font-medium transition-opacity hover:opacity-70"
                  style={{ color: '#1C1917' }}
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
