import { NextResponse } from 'next/server';

// ============================================================================
// RUNTIME — Vercel Edge Network for low-latency responses globally
// ============================================================================

export const runtime = 'edge';

// ============================================================================
// TYPESCRIPT INTERFACES
// ============================================================================

interface ProfileContact {
  email: string;
  linkedin: string;
  github: string;
}

interface ProfileCompetencies {
  pm: string[];
  technical: string[];
}

interface ProjectEntry {
  name: string;
  company: string;
  role: string;
  period: string;
  highlights: string[];
}

interface ProfileMetadata {
  api_version: string;
  environment: string;
  runtime: string;
  generated_at: string;
}

interface ProfileData {
  name: string;
  location: string;
  contact: ProfileContact;
  mission: string;
  headline: string;
  experience_years: number;
  competencies: ProfileCompetencies;
  projects: ProjectEntry[];
  metadata: ProfileMetadata;
}

// ============================================================================
// CORS HEADERS — applied to every response so any client can query this
// ============================================================================

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

// ============================================================================
// PROFILE DATA
// ============================================================================

function buildProfile(): ProfileData {
  return {
    name: 'Irvanno Taqi Irmawan',
    location: 'Jakarta, Indonesia',

    contact: {
      email: 'irvanno.taqi@gmail.com',
      linkedin: 'https://www.linkedin.com/in/irvanno-taqi-irmawan-ab1315155/',
      github: 'https://github.com/irvannotaqi',
    },

    mission: 'Technical Product Manager | Ex-Fintech SDET',

    headline:
      '7+ years of experience across high-volume payments and e-commerce systems, ' +
      'spanning GoPay, Tokopedia, and Gojek. Bridges deep technical fluency — ' +
      'test automation, CI/CD, API design — with product strategy and stakeholder delivery.',

    experience_years: 7,

    competencies: {
      pm: [
        'Product Strategy & Roadmapping',
        'PRD Writing & Specification',
        'Funnel Analysis & Conversion Optimisation',
        'Stakeholder Alignment & Executive Communication',
        'OKR Definition & Prioritisation Frameworks',
        'Vendor & Contract Team Management',
      ],
      technical: [
        'API Design & System Architecture',
        'SQL & Data Analysis',
        'CI/CD Pipelines (Jenkins, GitHub Actions)',
        'Test Automation Frameworks (Selenium, Appium, REST Assured)',
        'Payment Systems & Financial Infrastructure',
        'Observability & Incident Management',
      ],
    },

    projects: [
      {
        name: 'GoPay Payment Platform',
        company: 'GoTo Financial',
        role: 'Technical Product Manager',
        period: 'Aug 2024 – Present',
        highlights: [
          "Driving product strategy for GoPay's core payment flows serving millions of daily active users.",
          'Defining and owning PRDs across checkout, disbursement, and wallet top-up surfaces.',
          'Collaborating with engineering, risk, compliance, and design to deliver end-to-end payment features.',
          'Leveraging prior SDET background to write technically precise acceptance criteria and reduce spec ambiguity.',
          'Tracking funnel drop-off metrics and conversion KPIs to surface revenue recovery opportunities.',
        ],
      },
      {
        name: 'E-Commerce Checkout & Payment Infrastructure',
        company: 'Tokopedia',
        role: 'Technical Product Manager',
        period: 'May 2019 – Aug 2024',
        highlights: [
          'Managed an outsourced engineering contract team end-to-end: owned sprint planning, delivery commitments, vendor accountability, and performance reviews across a multi-year engagement.',
          'Led product discovery and delivery for checkout, payment method selection, and OTP verification flows at Tokopedia scale.',
          'Reduced checkout abandonment rate by identifying and eliminating friction points through funnel analysis and A/B testing.',
          'Authored detailed PRDs and technical specs that served as the single source of truth for both in-house and contracted engineering squads.',
          'Coordinated cross-functional dependencies across payments, fraud, logistics, and platform teams to ship high-impact releases on schedule.',
          'Established QA gates and release criteria that cut post-deployment incidents by enforcing structured test coverage requirements.',
        ],
      },
      {
        name: 'Quality Assurance — Super App Platform',
        company: 'Gojek',
        role: 'QA Engineer Intern',
        period: 'Jan 2018 – Mar 2018',
        highlights: [
          'Contributed to manual and exploratory testing of core Gojek super-app features during a high-growth period.',
          'Gained foundational exposure to large-scale microservices architecture and agile QA workflows.',
          'Wrote and executed test cases for ride-hailing and food delivery flows, feeding defect findings back into sprint cycles.',
        ],
      },
    ],

    metadata: {
      api_version: '1.0.0',
      environment: 'vercel',
      runtime: 'edge',
      generated_at: new Date().toISOString(),
    },
  };
}

// ============================================================================
// ROUTE HANDLERS
// ============================================================================

/**
 * OPTIONS /api/profile
 * Handles CORS preflight requests from browser clients.
 */
export function OPTIONS(): Response {
  return new Response(null, {
    status: 204,
    headers: CORS_HEADERS,
  });
}

/**
 * GET /api/profile
 * Returns a structured JSON payload describing Irvanno's career profile.
 */
export function GET(): NextResponse<ProfileData> {
  const profile = buildProfile();

  return NextResponse.json(profile, {
    status: 200,
    headers: CORS_HEADERS,
  });
}
