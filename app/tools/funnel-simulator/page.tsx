'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';

// ============================================================================
// TYPES
// ============================================================================

interface FunnelStep {
  id: string;
  label: string;
  usersIn: number;
  usersOut: number;
  dropOff: number;
  dropOffPercent: number;
  revenueLeaked: number;
}

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function FunnelSimulatorPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Dashboard */}
        <Dashboard />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ============================================================================
// NAVBAR COMPONENT
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
            <span className="text-xl font-bold text-indigo-400">Irvanno Taqi</span>
          </div>

          {/* Desktop Nav Links */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-400 hover:bg-slate-800 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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
                d={mobileMenuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'}
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
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
    <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-20 px-4 sm:px-6 lg:px-8 text-white">
      <div className="mx-auto max-w-7xl text-center">
        {/* Badge */}
        <div className="mb-6 inline-block">
          <span className="inline-flex items-center rounded-full bg-indigo-500 px-4 py-1 text-sm font-semibold text-white">
            🚀 Fintech Tool
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Payment Funnel & <span className="text-indigo-400">Revenue Leak</span> Simulator
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-3xl mx-auto">
          Visualize drop-off at every step of your payment flow. Discover exactly how much monthly revenue you're losing at checkout, payment selection, verification, and beyond.
        </p>

        {/* CTA */}
        <a
          href="#simulator"
          className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
        >
          Start Simulating
          <svg
            className="h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}

// ============================================================================
// DASHBOARD COMPONENT (Main Interactive Area)
// ============================================================================

function Dashboard() {
  // Input State
  const [totalMonthlyTraffic, setTotalMonthlyTraffic] = useState(100_000);
  const [averageOrderValue, setAverageOrderValue] = useState(25);
  const [checkoutLand, setCheckoutLand] = useState(60);
  const [selectPaymentMethod, setSelectPaymentMethod] = useState(75);
  const [otpVerification, setOtpVerification] = useState(80);
  const [paymentSuccess, setPaymentSuccess] = useState(85);

  // Derived State & Calculations
  const funnelData = useMemo(() => {
    const steps: FunnelStep[] = [];

    // Step 0: Land on Checkout
    const usersCheckout = totalMonthlyTraffic * (checkoutLand / 100);
    const dropOffCheckout = totalMonthlyTraffic - usersCheckout;
    steps.push({
      id: 'checkout',
      label: 'Land on Checkout Page',
      usersIn: totalMonthlyTraffic,
      usersOut: usersCheckout,
      dropOff: dropOffCheckout,
      dropOffPercent: 100 - checkoutLand,
      revenueLeaked: dropOffCheckout * averageOrderValue,
    });

    // Step 1: Select Payment Method
    const usersPayment = usersCheckout * (selectPaymentMethod / 100);
    const dropOffPayment = usersCheckout - usersPayment;
    steps.push({
      id: 'payment',
      label: 'Select Payment Method',
      usersIn: usersCheckout,
      usersOut: usersPayment,
      dropOff: dropOffPayment,
      dropOffPercent: 100 - selectPaymentMethod,
      revenueLeaked: dropOffPayment * averageOrderValue,
    });

    // Step 2: OTP / Biometric Verification
    const usersOTP = usersPayment * (otpVerification / 100);
    const dropOffOTP = usersPayment - usersOTP;
    steps.push({
      id: 'otp',
      label: 'OTP / Biometric Verification',
      usersIn: usersPayment,
      usersOut: usersOTP,
      dropOff: dropOffOTP,
      dropOffPercent: 100 - otpVerification,
      revenueLeaked: dropOffOTP * averageOrderValue,
    });

    // Step 3: Payment Success
    const usersSuccess = usersOTP * (paymentSuccess / 100);
    const dropOffSuccess = usersOTP - usersSuccess;
    steps.push({
      id: 'success',
      label: 'Payment Success',
      usersIn: usersOTP,
      usersOut: usersSuccess,
      dropOff: dropOffSuccess,
      dropOffPercent: 100 - paymentSuccess,
      revenueLeaked: dropOffSuccess * averageOrderValue,
    });

    // Calculate KPIs
    const totalLostRevenue = steps.reduce((sum, step) => sum + step.revenueLeaked, 0);
    const actualRevenue = usersSuccess * averageOrderValue;
    const potentialRevenue = totalMonthlyTraffic * averageOrderValue;
    const overallConversionRate = (usersSuccess / totalMonthlyTraffic) * 100;

    // Find biggest drop-off step
    const biggestDropStep = steps.reduce((max, step) => 
      step.dropOff > max.dropOff ? step : max
    );

    return {
      steps,
      totalLostRevenue,
      actualRevenue,
      potentialRevenue,
      overallConversionRate,
      biggestDropStep,
    };
  }, [totalMonthlyTraffic, averageOrderValue, checkoutLand, selectPaymentMethod, otpVerification, paymentSuccess]);

  return (
    <section id="simulator" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Section Title */}
        <div className="mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
            Interactive Simulator
          </h2>
          <p className="text-slate-600">
            Adjust your metrics below to see how drop-offs impact your monthly revenue.
          </p>
        </div>

        {/* Main Grid: Inputs (left) + Results (right) */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column: Input Card */}
          <div className="lg:col-span-2">
            <InputCard
              totalMonthlyTraffic={totalMonthlyTraffic}
              setTotalMonthlyTraffic={setTotalMonthlyTraffic}
              averageOrderValue={averageOrderValue}
              setAverageOrderValue={setAverageOrderValue}
              checkoutLand={checkoutLand}
              setCheckoutLand={setCheckoutLand}
              selectPaymentMethod={selectPaymentMethod}
              setSelectPaymentMethod={setSelectPaymentMethod}
              otpVerification={otpVerification}
              setOtpVerification={setOtpVerification}
              paymentSuccess={paymentSuccess}
              setPaymentSuccess={setPaymentSuccess}
            />
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-3">
            <ResultsPanel funnelData={funnelData} />
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================================
// INPUT CARD COMPONENT
// ============================================================================

interface InputCardProps {
  totalMonthlyTraffic: number;
  setTotalMonthlyTraffic: (value: number) => void;
  averageOrderValue: number;
  setAverageOrderValue: (value: number) => void;
  checkoutLand: number;
  setCheckoutLand: (value: number) => void;
  selectPaymentMethod: number;
  setSelectPaymentMethod: (value: number) => void;
  otpVerification: number;
  setOtpVerification: (value: number) => void;
  paymentSuccess: number;
  setPaymentSuccess: (value: number) => void;
}

function InputCard({
  totalMonthlyTraffic,
  setTotalMonthlyTraffic,
  averageOrderValue,
  setAverageOrderValue,
  checkoutLand,
  setCheckoutLand,
  selectPaymentMethod,
  setSelectPaymentMethod,
  otpVerification,
  setOtpVerification,
  paymentSuccess,
  setPaymentSuccess,
}: InputCardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-2xl font-bold text-slate-900 mb-8">Simulation Inputs</h3>

      {/* Traffic Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Total Monthly Traffic
        </label>
        <input
          type="number"
          value={totalMonthlyTraffic}
          onChange={(e) => setTotalMonthlyTraffic(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          placeholder="100000"
        />
        <p className="text-xs text-slate-500 mt-1">Number of visitors per month</p>
      </div>

      {/* AOV Input */}
      <div className="mb-8">
        <label className="block text-sm font-semibold text-slate-700 mb-2">
          Average Order Value (USD)
        </label>
        <input
          type="number"
          value={averageOrderValue}
          onChange={(e) => setAverageOrderValue(Math.max(0, parseInt(e.target.value) || 0))}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
          placeholder="25"
        />
        <p className="text-xs text-slate-500 mt-1">USD currency</p>
      </div>

      {/* Divider */}
      <div className="h-px bg-slate-200 my-8"></div>

      {/* Conversion Rate Sliders */}
      <div className="space-y-8">
        {/* Checkout Landing */}
        <ConversionRateInput
          label="Land on Checkout Page"
          value={checkoutLand}
          onChange={setCheckoutLand}
          description="% of traffic that reaches checkout"
        />

        {/* Payment Method Selection */}
        <ConversionRateInput
          label="Select Payment Method"
          value={selectPaymentMethod}
          onChange={setSelectPaymentMethod}
          description="% that select GoPay or GWM"
        />

        {/* OTP Verification */}
        <ConversionRateInput
          label="OTP / Biometric Verification"
          value={otpVerification}
          onChange={setOtpVerification}
          description="% that successfully verify"
        />

        {/* Payment Success */}
        <ConversionRateInput
          label="Payment Success"
          value={paymentSuccess}
          onChange={setPaymentSuccess}
          description="% with successful transactions"
        />
      </div>
    </div>
  );
}

// ============================================================================
// CONVERSION RATE INPUT COMPONENT (Slider + Number Synced)
// ============================================================================

interface ConversionRateInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  description: string;
}

function ConversionRateInput({
  label,
  value,
  onChange,
  description,
}: ConversionRateInputProps) {
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className="text-sm font-semibold text-slate-700">{label}</label>
        <span className="text-sm font-bold text-indigo-600">{value}%</span>
      </div>

      {/* Slider */}
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 mb-3"
      />

      {/* Synced Number Input */}
      <div className="flex items-center gap-2">
        <input
          type="number"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(Math.min(100, Math.max(0, parseInt(e.target.value) || 0)))}
          className="w-20 px-3 py-1 border border-slate-300 rounded text-sm focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
        />
        <span className="text-sm text-slate-600">%</span>
      </div>

      <p className="text-xs text-slate-500 mt-2">{description}</p>
    </div>
  );
}

// ============================================================================
// RESULTS PANEL COMPONENT
// ============================================================================

interface ResultsPanelProps {
  funnelData: {
    steps: FunnelStep[];
    totalLostRevenue: number;
    actualRevenue: number;
    potentialRevenue: number;
    overallConversionRate: number;
    biggestDropStep: FunnelStep;
  };
}

function ResultsPanel({ funnelData }: ResultsPanelProps) {
  const {
    steps,
    totalLostRevenue,
    actualRevenue,
    potentialRevenue,
    overallConversionRate,
    biggestDropStep,
  } = funnelData;

  return (
    <div className="space-y-8">
      {/* KPI Cards Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Total Lost Revenue */}
        <KPICard
          label="Total Lost Revenue"
          value={formatUSD(totalLostRevenue)}
          accentColor="red"
          icon="📉"
        />

        {/* Actual Revenue */}
        <KPICard
          label="Actual Revenue"
          value={formatUSD(actualRevenue)}
          accentColor="emerald"
          icon="✅"
        />

        {/* Overall Conversion */}
        <KPICard
          label="Overall Conversion"
          value={`${overallConversionRate.toFixed(1)}%`}
          accentColor="indigo"
          icon="📊"
        />

        {/* Biggest Drop-off */}
        <KPICard
          label="Biggest Drop-off"
          value={`${biggestDropStep.dropOffPercent.toFixed(0)}%`}
          subtext={biggestDropStep.label.split(' ').slice(0, 2).join(' ')}
          accentColor="amber"
          icon="⚠️"
        />
      </div>

      {/* Funnel Chart */}
      <FunnelChart steps={steps} totalTraffic={steps[0].usersIn} />
    </div>
  );
}

// ============================================================================
// KPI CARD COMPONENT
// ============================================================================

interface KPICardProps {
  label: string;
  value: string;
  subtext?: string;
  accentColor: 'red' | 'emerald' | 'indigo' | 'amber';
  icon: string;
}

function KPICard({ label, value, subtext, accentColor, icon }: KPICardProps) {
  const accentClasses = {
    red: 'bg-red-50 border-red-200 text-red-700',
    emerald: 'bg-emerald-50 border-emerald-200 text-emerald-700',
    indigo: 'bg-indigo-50 border-indigo-200 text-indigo-700',
    amber: 'bg-amber-50 border-amber-200 text-amber-700',
  };

  return (
    <div className={`border-2 rounded-xl p-4 transition-all min-w-0 overflow-hidden ${accentClasses[accentColor]}`}>
      <div className="flex items-start justify-between mb-2">
        <span className="text-2xl">{icon}</span>
      </div>
      <p className="text-xs font-medium opacity-75 mb-1">{label}</p>
      <p className="text-sm sm:text-base lg:text-lg font-bold break-words">{value}</p>
      {subtext && <p className="text-xs opacity-60 mt-1">{subtext}</p>}
    </div>
  );
}

// ============================================================================
// FUNNEL CHART COMPONENT
// ============================================================================

interface FunnelChartProps {
  steps: FunnelStep[];
  totalTraffic: number;
}

function FunnelChart({ steps, totalTraffic }: FunnelChartProps) {
  const colors = ['indigo', 'indigo', 'rose', 'red'] as const;

  const colorMap = {
    indigo: 'bg-indigo-500',
    rose: 'bg-rose-400',
    red: 'bg-red-500',
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h3 className="text-xl font-bold text-slate-900 mb-8">Payment Funnel Breakdown</h3>

      <div className="space-y-6">
        {steps.map((step, idx) => {
          const widthPercent = (step.usersOut / totalTraffic) * 100;
          const color = colorMap[colors[idx]];

          return (
            <div key={step.id}>
              {/* Row Label + Metrics */}
              <div className="flex items-center justify-between mb-2">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-slate-900">{step.label}</p>
                </div>
                <div className="text-right flex gap-3 text-xs">
                  <span className="font-mono text-slate-600">
                    {formatNumber(Math.round(step.usersOut))}
                  </span>
                  <span className={`font-bold ${step.dropOffPercent > 0 ? 'text-red-600' : 'text-slate-600'}`}>
                    {step.dropOffPercent > 0 ? `−${step.dropOffPercent.toFixed(0)}%` : ''}
                  </span>
                </div>
              </div>

              {/* Animated Bar */}
              <div className="h-10 bg-slate-100 rounded-lg overflow-hidden">
                <div
                  className={`h-full ${color} transition-all duration-700 ease-out flex items-center px-3`}
                  style={{ width: `${widthPercent}%` }}
                >
                  {widthPercent > 15 && (
                    <span className="text-white text-xs font-bold">{widthPercent.toFixed(0)}%</span>
                  )}
                </div>
              </div>

              {/* Drop-off Annotation */}
              {step.dropOff > 0 && (
                <p className="text-xs text-red-600 mt-1">
                  ↓ {formatNumber(Math.round(step.dropOff))} users dropped off ({formatUSD(step.revenueLeaked)} lost)
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-8 pt-6 border-t border-slate-200 flex flex-wrap gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-indigo-500"></div>
          <span className="text-slate-600">Strong Conversion</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-rose-400"></div>
          <span className="text-slate-600">Moderate Drop-off</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded bg-red-500"></div>
          <span className="text-slate-600">High Drop-off</span>
        </div>
      </div>
    </div>
  );
}

// ============================================================================
// FOOTER COMPONENT
// ============================================================================

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm mb-4 sm:mb-0">
            © 2025 Irvanno Taqi. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <a href="#" className="hover:text-indigo-400 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              GitHub
            </a>
            <a href="#" className="hover:text-indigo-400 transition-colors">
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

function formatUSD(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number): string {
  return new Intl.NumberFormat('id-ID').format(value);
}
