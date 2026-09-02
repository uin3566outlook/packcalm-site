import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://packcalm.uin3566.chatgpt.site';
const socialImageUrl = new URL('/og.png', siteUrl).toString();

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'PackCalm — Stop remembering. Start packing.',
  description: 'Reusable packing lists, clear progress, and calmer departures. PackCalm is free for iPhone and keeps your travel data on your device.',
  applicationName: 'PackCalm',
  icons: {
    icon: '/assets/app-icon.png',
    apple: '/assets/app-icon.png',
  },
  openGraph: {
    type: 'website',
    title: 'PackCalm — Stop remembering. Start packing.',
    description: 'Reusable packing lists for calmer departures.',
    images: [{ url: socialImageUrl, width: 1200, height: 630, alt: 'PackCalm — reusable packing lists for calmer departures' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackCalm — Stop remembering. Start packing.',
    description: 'Reusable packing lists for calmer departures.',
    images: [socialImageUrl],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
