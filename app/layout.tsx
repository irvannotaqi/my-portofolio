import type { Metadata } from 'next';
import './globals.css';

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
      <body className="bg-slate-50 text-slate-900 antialiased">
        {children}
      </body>
    </html>
  );
}
