import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'ScrapMatch — AI-Powered B2B Circular Materials Exchange',
    template: '%s | ScrapMatch',
  },
  description:
    'ScrapMatch connects industrial manufacturers, processors, and procurement teams through AI-powered materials matching. Turn by-products into revenue. Source secondary raw materials reliably. Meet your ESG targets.',
  keywords: [
    'industrial scrap marketplace',
    'B2B materials exchange',
    'circular economy India',
    'secondary raw materials',
    'industrial waste management',
    'scrap trading platform',
    'AI materials matching',
  ],
  authors: [{ name: 'ScrapMatch Technologies Pvt. Ltd.' }],
  creator: 'ScrapMatch',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    url: 'https://scrapmatch.in',
    siteName: 'ScrapMatch',
    title: 'ScrapMatch — AI-Powered B2B Circular Materials Exchange',
    description:
      'Turn industrial waste into working capital. AI-matched materials trading for Indian manufacturing.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ScrapMatch — AI-Powered B2B Circular Materials Exchange',
    description: 'Turn industrial waste into working capital.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
