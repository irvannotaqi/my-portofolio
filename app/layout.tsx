import type { Metadata } from 'next';
import './globals.css';
import { NavbarWrapper } from '@/components/NavbarWrapper';
import { Footer } from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Irvanno Taqi — Product Manager & Fintech Builder',
  description:
    'Portfolio showcasing fintech projects, interactive tools, and product insights from a Technical Product Manager with deep expertise in payment systems and financial technology.',
  keywords: [
    'Product Manager',
    'Fintech',
    'Payment Systems',
    'Technical PM',
    'Portfolio',
  ],
  authors: [{ name: 'Irvanno Taqi' }],
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://irvanno.dev',
    title: 'Irvanno Taqi — Product Manager & Fintech Builder',
    description: 'Portfolio and interactive fintech tools.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="antialiased" style={{ backgroundColor: '#F7F4EE', color: '#1C1917' }}>
        <NavbarWrapper />
        {children}
        <Footer />
      </body>
    </html>
  );
}
