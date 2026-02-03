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

// SEO-Optimized Metadata for "Computer Engineering and AI Engineer & Computer Vision Specialist"
export const metadata: Metadata = {
  metadataBase: new URL('https://taha-portfolio-website-blond.vercel.app'),
  
  title: {
    default: 'Muhammad Taha | Computer Engineering & AI Engineer | Computer Vision Specialist',
    template: '%s | Muhammad Taha Portfolio'
  },
  
  description: 'Muhammad Taha - Computer Engineering student at NUST specializing as an AI Engineer & Computer Vision Specialist. Expert in TensorFlow, PyTorch, OpenCV, Deep Learning, Full-Stack Development (Next.js, TypeScript), and FPGA/Embedded Systems. View AI/ML projects, certifications from DeepLearning.AI & Stanford.',
  
  keywords: [
    // Primary SEO Keywords
    'Computer Engineering',
    'AI Engineer',
    'Computer Vision Specialist',
    'Machine Learning Engineer',
    'Deep Learning Engineer',
    
    // Technical Skills
    'TensorFlow Developer',
    'PyTorch Developer',
    'OpenCV Expert',
    'YOLO Object Detection',
    'CNN Neural Networks',
    'NLP Engineer',
    'LLM Developer',
    'LangChain',
    'RAG Applications',
    'Hugging Face',
    
    // Full-Stack
    'Full-Stack Developer',
    'Next.js Developer',
    'TypeScript Developer',
    'React Developer',
    'Node.js Developer',
    
    // Hardware
    'FPGA Developer',
    'Embedded Systems Engineer',
    'IoT Developer',
    'Verilog HDL',
    
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
    siteName: 'Muhammad Taha Portfolio',
    title: 'Muhammad Taha | Computer Engineering & AI Engineer | Computer Vision Specialist',
    description: 'AI Engineer & Computer Vision Specialist with expertise in TensorFlow, PyTorch, OpenCV, Deep Learning, Next.js, and FPGA development. View projects in Medical AI, Speech Emotion Recognition, and Full-Stack CMS development.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Taha - AI Engineer & Computer Vision Specialist Portfolio',
      },
    ],
  },
  
  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha | AI Engineer & Computer Vision Specialist',
    description: 'Computer Engineering student specializing in AI/ML, Computer Vision, and Full-Stack Development. View portfolio showcasing Deep Learning projects and certifications.',
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
  jobTitle: 'AI Engineer & Computer Vision Specialist',
  description: 'Computer Engineering student specializing in Artificial Intelligence, Machine Learning, Computer Vision, and Full-Stack Development',
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
    'Artificial Intelligence',
    'Machine Learning',
    'Deep Learning',
    'Computer Vision',
    'TensorFlow',
    'PyTorch',
    'OpenCV',
    'Next.js',
    'TypeScript',
    'Full-Stack Development',
    'FPGA Development',
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
