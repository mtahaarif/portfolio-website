import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'
import { profile, seoKeywords } from './data/profile'
import { certifications } from './data/certifications'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL(profile.website),

  title: {
    default: `${profile.name} | AI/ML Engineer | Computer Vision | Multimodal AI | ML Systems`,
    template: `%s | ${profile.name}`,
  },

  description:
    'AI/ML Engineer specializing in computer vision, multimodal AI, and production ML systems. Experience includes face anti-spoofing, document verification, and signature forgery detection at TruID Technologies, plus real-time edge and cloud AI delivery across FastAPI, Kafka, Kubernetes, and Terraform.',

  keywords: seoKeywords,

  authors: [{ name: profile.name, url: profile.github }],
  creator: profile.name,
  publisher: profile.name,

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: profile.website,
    siteName: `${profile.name} — AI/ML Engineer Portfolio`,
    title: `${profile.name} | AI/ML Engineer | Computer Vision | Multimodal AI`,
    description:
      'Computer vision and multimodal AI portfolio with real deployment evidence: biometrics pipelines, edge inference systems, and production ML architecture.',
    images: [
      {
        url: '/profile.jpg',
        width: 512,
        height: 512,
        alt: `${profile.name} — AI/ML Engineer`,
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${profile.name} | AI/ML Engineer | Computer Vision`,
    description:
      'Real-time computer vision, multimodal AI, and production ML systems with deployment experience across edge and cloud.',
    images: ['/profile.jpg'],
  },

  alternates: {
    canonical: profile.website,
  },

  category: 'technology',
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a1628' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' },
  ],
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: profile.name,
  jobTitle: profile.title,
  description: profile.summary,
  url: profile.website,
  image: `${profile.website}/profile.jpg`,
  email: profile.email,
  telephone: '+92-317-5434059',
  address: {
    '@type': 'PostalAddress',
    addressLocality: profile.location,
    addressCountry: 'Pakistan',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: profile.education.institution,
    url: 'https://nust.edu.pk',
  },
  knowsAbout: seoKeywords,
  hasCredential: certifications.map((cert) => ({
    '@type': 'EducationalOccupationalCredential',
    name: cert.title,
    recognizedBy: {
      '@type': 'Organization',
      name: cert.issuer,
    },
  })),
  sameAs: [
    profile.github,
    profile.linkedIn,
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
