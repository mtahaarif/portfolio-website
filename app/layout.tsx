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
    default: 'Muhammad Taha | Full Stack AI Engineer | Computer Vision · Multimodal AI · Edge Deployment',
    template: '%s | Muhammad Taha — Full Stack AI Engineer',
  },

  description:
    'Full Stack AI Engineer specialising in end-to-end AI deployment — from neural model optimisation to production web architecture. Work includes a 0.892-AUROC clinical deterioration predictor over 40GB of MIMIC-IV, a multimodal mental-health platform quantised to 3.86 MB on a Raspberry Pi 5, and a production biometric anti-spoofing suite at 98.9% face liveness.',

  keywords: [
    'Full Stack AI Engineer',
    'AI Engineer',
    'Computer Vision Engineer',
    'Applied AI Engineer',
    'Machine Learning Engineer',
    'Multimodal AI',
    'ML Systems',
    'Model Quantization',
    'Explainable AI',
    'Clinical AI',
    'Biometric Authentication',
    'Fraud Detection',
    'Deep Learning',
    'Real-Time Inference',
    'Edge AI',
    'Embedded AI',
    'Face Anti-Spoofing',
    'PyTorch',
    'TensorFlow',
    'OpenCV',
    'YOLOv8',
    'Transformers',
    'RAG',
    'FAISS',
    'LoRA',
    'XGBoost',
    'Optuna',
    'SHAP',
    '3D Gaussian Splatting',
    'TFLite',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'FPGA',
    'Verilog',
    'Raspberry Pi',
    'Muhammad Taha',
    'AI Engineer Pakistan',
    'Computer Vision Engineer Islamabad',
    'NUST Computer Engineering',
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
    siteName: 'Muhammad Taha — Full Stack AI Engineer Portfolio',
    title: 'Muhammad Taha | Full Stack AI Engineer | Computer Vision · Multimodal AI · Edge Deployment',
    description:
      'Full Stack AI Engineer shipping models from research notebook to production edge device. Clinical deterioration prediction at 0.892 AUROC, biometric anti-spoofing at 98.9% face liveness, and multimodal AI quantised to 3.86 MB on a Raspberry Pi 5.',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Taha — Full Stack AI Engineer | Computer Vision · Multimodal AI · Edge Deployment',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Muhammad Taha | Full Stack AI Engineer',
    description:
      'Shipping models from research notebook to production edge device — computer vision, multimodal AI, clinical prediction, and the applications that serve them.',
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
  jobTitle: 'Full Stack AI Engineer | Computer Vision · Multimodal AI · Edge Deployment · Production Web',
  description:
    'Full Stack AI Engineer with expertise in computer vision, multimodal AI, and end-to-end model deployment. Delivered biometric anti-spoofing, document tamper detection, calibrated clinical risk prediction, and edge-quantised inference on Raspberry Pi, alongside production web platforms in Next.js.',
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
    'Document Tamper Detection',
    'Clinical Deterioration Prediction',
    'Model Quantization',
    'Explainable AI',
    'Real-Time Inference',
    'Edge AI',
    'PyTorch',
    'TensorFlow',
    'OpenCV',
    'YOLOv8',
    'CNN',
    'BiLSTM',
    'Transformers',
    'RAG',
    'FAISS',
    'LoRA',
    'XGBoost',
    'Optuna',
    'SHAP',
    '3D Gaussian Splatting',
    'TFLite',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'FPGA',
    'Verilog HDL',
    'Raspberry Pi',
    'Embedded Systems',
  ],
  sameAs: [
    'https://github.com/mtahaarif',
    'https://linkedin.com/in/muhammadtaha',
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
