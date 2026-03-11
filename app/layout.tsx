import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://taha-portfolio-website-blond.vercel.app'),

  title: {
    default: 'Muhammad Taha | AI Engineer | Computer Vision, Multimodal AI & ML Systems',
    template: '%s | Muhammad Taha — AI Engineer',
  },

  description:
    'AI Engineer specializing in computer vision, multimodal deep learning, and production ML systems. Deployed face anti-spoofing, document verification, and signature forgery detection at TruID Technologies. Building real-time inference pipelines, edge AI, and full-stack applications.',

  keywords: [
    'AI Engineer',
    'Computer Vision Engineer',
    'Applied AI Engineer',
    'Machine Learning Engineer',
    'Multimodal AI',
    'ML Systems',
    'Deep Learning',
    'Real-Time Inference',
    'Edge AI',
    'Embedded AI',
    'Biometrics',
    'Face Anti-Spoofing',
    'PyTorch',
    'TensorFlow',
    'OpenCV',
    'YOLO',
    'CNN',
    'LSTM',
    'Transformer',
    'RAG',
    'LoRA',
    'FastAPI',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Kafka',
    'Next.js',
    'TypeScript',
    'FPGA',
    'Verilog',
    'Raspberry Pi',
    'Muhammad Taha',
    'AI Engineer Pakistan',
    'Computer Vision Engineer Islamabad',
  ],

  authors: [{ name: 'Muhammad Taha', url: 'https://github.com/mtahaarif' }],
  creator: 'Muhammad Taha',
  publisher: 'Muhammad Taha',

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
    url: 'https://taha-portfolio-website-blond.vercel.app',
    siteName: 'Muhammad Taha — AI Engineer Portfolio',
    title: 'Muhammad Taha | AI Engineer | Computer Vision, Multimodal AI & ML Systems',
    description:
      'AI Engineer building real-time computer vision, multimodal AI, and production ML systems. Experience includes face anti-spoofing, document verification, and production CV pipelines at TruID Technologies.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Taha — AI Engineer | Computer Vision, Multimodal AI & ML Systems',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha | AI Engineer | Computer Vision & ML Systems',
    description:
      'Building real-time computer vision, multimodal AI, and production ML systems. Deployed biometrics pipelines and edge AI systems.',
    images: ['/og-image.png'],
    creator: '@mtahaarif',
  },

  alternates: {
    canonical: 'https://taha-portfolio-website-blond.vercel.app',
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
  name: 'Muhammad Taha',
  jobTitle: 'AI Engineer | Computer Vision, Multimodal AI, ML Systems & Embedded AI',
  description:
    'AI Engineer specializing in computer vision, multimodal deep learning, and production ML systems. Deployed face anti-spoofing, document verification, and signature forgery detection models. Built real-time emotion recognition systems with edge deployment.',
  url: 'https://taha-portfolio-website-blond.vercel.app',
  image: 'https://taha-portfolio-website-blond.vercel.app/profile.jpg',
  email: 'ch.tahaarif2005@gmail.com',
  telephone: '+92-317-5434059',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'Pakistan',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'NUST (National University of Sciences & Technology)',
    url: 'https://nust.edu.pk',
  },
  knowsAbout: [
    'Computer Vision',
    'Multimodal AI',
    'Deep Learning',
    'Machine Learning',
    'Face Anti-Spoofing',
    'Real-Time Inference',
    'Edge AI',
    'PyTorch',
    'TensorFlow',
    'OpenCV',
    'YOLO',
    'CNN',
    'LSTM',
    'Transformer',
    'RAG',
    'LoRA',
    'FastAPI',
    'Docker',
    'Kubernetes',
    'Terraform',
    'Kafka',
    'Next.js',
    'TypeScript',
    'FPGA',
    'Verilog HDL',
    'Raspberry Pi',
    'Embedded Systems',
  ],
  sameAs: [
    'https://github.com/mtahaarif',
    'https://linkedin.com/in/muhammad-taha-21a163256',
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
