import type { Metadata, Viewport } from 'next';
import { Space_Grotesk, JetBrains_Mono } from 'next/font/google';
import { JsonLdSchema } from './components/json-ld-schema';
import { profile } from './data/profile';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

const seoDescription =
  'Cinematic premium portfolio for AI/ML and Computer Vision Engineer Muhammad Taha, featuring multimodal AI, edge inference, and production-grade ML systems.';

const seoSkills = ['PyTorch', 'OpenCV', 'Multimodal AI', 'Edge AI', 'LLMs'];

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL(profile.website),
    title: {
      default: `${profile.name} | AI/ML Engineer | Computer Vision | Edge AI`,
      template: `%s | ${profile.name}`,
    },
    description: seoDescription,
    keywords: [
      'Muhammad Taha',
      'AI ML Engineer',
      'Computer Vision Engineer',
      'Multimodal AI',
      'Edge AI',
      'LLM Engineer',
      ...seoSkills,
    ],
    alternates: {
      canonical: profile.website,
    },
    authors: [{ name: profile.name, url: profile.linkedIn }],
    creator: profile.name,
    publisher: profile.name,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: 'profile',
      url: profile.website,
      siteName: `${profile.name} Portfolio`,
      title: `${profile.name} | AI/ML Engineer | Computer Vision | Edge AI | NUST '26`,
      description: seoDescription,
      images: [
        {
          url: '/profile.jpg',
          width: 1200,
          height: 630,
          alt: `${profile.name} portfolio preview`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${profile.name} | AI/ML Engineer | Computer Vision`,
      description: seoDescription,
      images: ['/profile.jpg'],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0b0908',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} dark`} suppressHydrationWarning>
      <body className="bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">
        <JsonLdSchema />
        {children}
      </body>
    </html>
  );
}
