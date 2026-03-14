import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './Providers';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Dikio - L\'agence de growth des inventeurs et créateurs ambitieux',
  description: 'Dikio est une agence digitale spécialisée dans la croissance rapide et durable des projets innovants. Nous accompagnons les inventeurs, créateurs, start-ups et porteurs de projet.',
  authors: [{ name: 'Dikio' }],
  openGraph: {
    title: 'Dikio - L\'agence de growth des inventeurs et créateurs ambitieux',
    description: 'Dikio est une agence digitale spécialisée dans la croissance rapide et durable des projets innovants.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    site: '@dikio',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href="/images/c408f7e1-9171-44c5-847c-9754bd6d5c72.png" type="image/png" />
      </head>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
