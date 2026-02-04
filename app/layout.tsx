import type { Metadata, Viewport } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display: 'swap', // Performance: prevent FOIT
  preload: true,
})

// SEO-Optimized Metadata for "AI Engineer | Computer Vision Specialist | Embedded AI"
export const metadata: Metadata = {
  metadataBase: new URL('https://taha-portfolio-website-blond.vercel.app'),
  
  title: {
    default: 'Muhammad Taha | AI/ML Engineer | Computer Vision & Embedded AI Specialist',
    template: '%s | Muhammad Taha - AI Engineer'
  },
  
  description: 'AI/ML Engineer specializing in Multimodal AI Systems, Computer Vision, Medical Imaging, and Speech Emotion Recognition. Expert in TensorFlow, CNNs, Transformers, and Librosa. Full-stack delivery with PHP, MySQL, WordPress, and Vercel. FPGA/Verilog hardware design with MATLAB validation. NUST Computer Engineering.',
  
  keywords: [
    // Tier 1: AI Engineering (Primary)
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Vision Specialist',
    'Deep Learning Engineer',
    'TensorFlow Developer',
    'Multimodal AI',
    'Speech Emotion Recognition',
    'Medical Imaging AI',
    'CNN Developer',
    'Transformer Architecture',
    'Librosa',
    'Medical AI',
    'Histopathology Classification',
    
    // Tier 2: Software Engineering
    'Full-Stack Developer',
    'PHP Developer',
    'MySQL Database',
    'WordPress Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'Vercel Deployment',
    'HostGator',
    'Flask API',
    
    // Tier 3: Embedded & Hardware
    'FPGA Developer',
    'Verilog HDL',
    'Embedded AI',
    'MATLAB Simulation',
    'Fixed-Point Filter',
    'Control Systems',
    'Hardware Engineer',
    
    // Location & Education
    'NUST Pakistan',
    'AI Engineer Pakistan',
    'Computer Vision Engineer Islamabad',
    'Muhammad Taha',
    'Muhammad Taha Portfolio',
    'Muhammad Taha NUST'
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
    siteName: 'Muhammad Taha - AI/ML Engineer Portfolio',
    title: 'Muhammad Taha | AI/ML Engineer | Computer Vision & Embedded AI',
    description: 'AI/ML Engineer building Multimodal AI Systems, Medical Imaging classifiers, and Speech Emotion Recognition. Full-stack delivery for healthcare clients. FPGA hardware design with MATLAB validation.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Taha - AI/ML Engineer & Computer Vision Specialist',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha | AI/ML Engineer | Computer Vision Specialist',
    description: 'Building Multimodal AI, Medical Imaging, and Speech Emotion Recognition systems. Full-stack delivery & FPGA hardware design.',
    images: ['/og-image.png'],
    creator: '@mtahaarif',
  },
  
  alternates: {
    canonical: 'https://taha-portfolio-website-blond.vercel.app',
  },
  
  category: 'technology',
  
  verification: {
    // Add your verification codes here
    // google: 'your-google-verification-code',
  },
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

// JSON-LD Structured Data for SEO
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Muhammad Taha',
  jobTitle: 'AI/ML Engineer | Computer Vision & Embedded AI Specialist',
  description: 'AI/ML Engineer specializing in Multimodal AI Systems, Computer Vision, Medical Imaging Classification, and Speech Emotion Recognition. Expert in TensorFlow, CNNs, Transformers, and Librosa. Full-stack delivery with PHP, MySQL, WordPress, and Vercel. FPGA/Verilog hardware design with MATLAB validation.',
  url: 'https://taha-portfolio-website-blond.vercel.app',
  image: 'https://taha-portfolio-website-blond.vercel.app/profile.jpg',
  email: 'ch.tahaarif2005@gmail.com',
  telephone: '+92-316-5765670',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'Pakistan'
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'NUST (National University of Sciences & Technology)',
    url: 'https://nust.edu.pk'
  },
  knowsAbout: [
    // Tier 1: AI Engineering
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'TensorFlow',
    'CNNs (Convolutional Neural Networks)',
    'Transformer Architecture',
    'Multimodal AI',
    'Speech Emotion Recognition',
    'Librosa',
    'Medical Imaging AI',
    'Histopathology Classification',
    
    // Tier 2: Software Engineering
    'Full-Stack Development',
    'PHP',
    'MySQL',
    'WordPress',
    'Next.js',
    'TypeScript',
    'Flask',
    'Vercel',
    'HostGator',
    
    // Tier 3: Embedded & Hardware
    'FPGA Development',
    'Verilog HDL',
    'MATLAB',
    'Fixed-Point Filters',
    'Control Systems',
    'Embedded Systems'
  ],
  sameAs: [
    'https://github.com/mtahaarif',
    'https://linkedin.com/in/muhammad-taha-21a163256'
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
      </head>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
