import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import { PropsWithChildren } from 'react';

export const fontSans = Roboto({
  variable: '--font-main',
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'Ambient?',
  description: 'Some ambient music for you'
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="en">
      <body className={`${fontSans.variable}`}>{children}</body>
    </html>
  );
}
