import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://uin3566outlook.github.io/packcalm-site/';
const socialImageUrl = new URL('og.jpg', siteUrl).toString();

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
  alternates: { canonical: siteUrl },
  title: 'PackGo — Pack with ease. Travel ready.',
  description:
    'Reusable packing lists, clear progress, and calmer departures. PackGo is free for iPhone and keeps your travel data on your device.',
  applicationName: 'PackGo',
  other: { 'apple-itunes-app': 'app-id=6809829261' },
  icons: {
    icon: new URL('assets/app-icon.png', siteUrl).toString(),
    apple: new URL('assets/app-icon.png', siteUrl).toString(),
  },
  openGraph: {
    type: 'website',
    title: 'PackGo — Pack with ease. Travel ready.',
    description: 'Reusable packing lists for calmer departures.',
    images: [
      {
        url: socialImageUrl,
        width: 1200,
        height: 630,
        alt: 'PackGo — reusable packing lists for calmer departures',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'PackGo — Pack with ease. Travel ready.',
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
