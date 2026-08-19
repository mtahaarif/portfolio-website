import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { SITE_URL, siteUrl } from './data/site';

const NAME = 'Muhammad Taha';
const ROLE = 'Full-Stack AI Engineer';
const POSITIONING = 'FULL-STACK · MACHINE LEARNING · COMPUTER VISION · EDGE DEPLOYMENT · PRODUCTION SYSTEMS';
const TITLE = `${NAME} | ${ROLE} | ${POSITIONING}`;

const DESCRIPTION =
  'Full-Stack AI Engineer specialising in end-to-end AI deployment — from neural model ' +
  'optimisation to production web architecture. Work includes a 0.892-AUROC clinical ' +
  'deterioration predictor over 40GB of MIMIC-IV, a multimodal mental-health platform ' +
  'quantised to 3.86 MB on a Raspberry Pi 5, and a biometric anti-spoofing suite at ' +
  '99.8% validation accuracy on screen-replay detection.';

const SHORT_DESCRIPTION =
  'Models that survive the trip from notebook to production hardware — clinical ' +
  'prediction at 0.892 AUROC, biometric anti-spoofing at 99.8% validation accuracy, ' +
  'and multimodal AI quantised to 3.86 MB on a Raspberry Pi 5.';

/**
 * Four weights, down from six. `300` and `800` were declared but never used by a
 * single utility class, so every visitor downloaded two font files the design
 * never renders.
 */
const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: TITLE,
    template: `%s | ${NAME} — ${ROLE}`,
  },

  description: DESCRIPTION,

  keywords: [
    'Full-Stack AI Engineer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Computer Vision Engineer',
    'Applied AI Engineer',
    'Clinical AI',
    'Multimodal AI',
    'Edge AI',
    'Model Quantization',
    'Explainable AI',
    'Biometric Anti-Spoofing',
    'Document Fraud Detection',
    'PyTorch',
    'TensorFlow',
    'OpenCV',
    'Transformers',
    'RAG',
    'XGBoost',
    'Optuna',
    'SHAP',
    'Polars',
    '3D Gaussian Splatting',
    'TFLite',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'Verilog HDL',
    'FPGA',
    'Raspberry Pi',
    'Muhammad Taha',
    'AI Engineer Pakistan',
    'Computer Vision Engineer Islamabad',
    'NUST Computer Engineering',
  ],

  authors: [{ name: NAME, url: 'https://github.com/mtahaarif' }],
  creator: NAME,
  publisher: NAME,

  /**
   * Only assets that actually exist in /public are referenced.
   *
   * The previous version declared /favicon.ico, /icon.svg, /apple-touch-icon.png
   * and /og-image.png — none of which are in the repo, so every page load fired
   * four 404s and every social share rendered a blank preview card. Add the
   * files, then restore the `icons` block and an `images` entry below.
   */
  manifest: '/site.webmanifest',

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
    type: 'profile',
    firstName: 'Muhammad',
    lastName: 'Taha',
    locale: 'en_US',
    url: SITE_URL,
    siteName: `${NAME} — ${ROLE}`,
    title: TITLE,
    description: SHORT_DESCRIPTION,
    images: [
      {
        url: '/profile.jpg',
        width: 256,
        height: 256,
        alt: `${NAME} — ${ROLE}`,
      },
    ],
  },

  twitter: {
    card: 'summary',
    title: `${NAME} | ${ROLE}`,
    description: SHORT_DESCRIPTION,
    images: ['/profile.jpg'],
  },

  alternates: {
    canonical: SITE_URL,
  },

  category: 'technology',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0a1628' },
    { media: '(prefers-color-scheme: dark)', color: '#020817' },
  ],
  width: 'device-width',
  initialScale: 1,
  // maximumScale 5 keeps pinch-zoom available (WCAG 1.4.4 needs 200% minimum).
  maximumScale: 5,
};

const person = {
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: NAME,
  givenName: 'Muhammad',
  familyName: 'Taha',
  jobTitle: ROLE,
  description:
    'Full-Stack AI Engineer and Computer Engineer working across clinical prediction, ' +
    'edge-quantised multimodal systems, production web platforms, and hardware down to ' +
    'a custom instruction set in Verilog.',
  url: SITE_URL,
  image: siteUrl('/profile.jpg'),
  email: 'ch.tahaarif2005@gmail.com',
  telephone: '+92-317-5434059',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Islamabad',
    addressCountry: 'PK',
  },
  nationality: { '@type': 'Country', name: 'Pakistan' },
  knowsLanguage: ['en', 'ur'],
  alumniOf: {
    '@type': 'CollegeOrUniversity',
    name: 'National University of Sciences & Technology (NUST)',
    url: 'https://nust.edu.pk',
  },
  worksFor: {
    '@type': 'Organization',
    name: 'A&T Nexus Solutions LLC',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Full-Stack AI Engineer',
    occupationalCategory: '15-2051.00', // O*NET: Data Scientists
    skills:
      'Machine learning, computer vision, model quantisation, edge deployment, ' +
      'full-stack web architecture',
  },
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Deep Learning Specialization',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'DeepLearning.AI' },
      url: 'https://www.coursera.org/account/accomplishments/specialization/108CJVFYUFG4',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Machine Learning Specialization',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'DeepLearning.AI' },
      url: 'https://www.coursera.org/account/accomplishments/specialization/certificate/CCNSYYU42C28',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'AI for Everyone',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'DeepLearning.AI' },
      url: 'https://www.coursera.org/account/accomplishments/verify/DQRNLTNU8F3D',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Introduction to Front-End Development',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'Meta' },
      url: 'https://www.coursera.org/account/accomplishments/verify/5W3GG5G4JVNY',
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'CS50P: Introduction to Programming with Python',
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: 'Harvard University' },
      url: 'https://certificates.cs50.io/a31f82a1-78d3-417d-9b38-7b58af74cd4c.pdf?size=letter',
    },
  ],
  knowsAbout: [
    'Clinical Deterioration Prediction',
    'Computer Vision',
    'Multimodal AI',
    'Deep Learning',
    'Machine Learning',
    'Face Anti-Spoofing',
    'Document Tamper Detection',
    'Model Quantization',
    'Edge AI',
    'Explainable AI',
    'Real-Time Inference',
    'Retrieval-Augmented Generation',
    'PyTorch',
    'TensorFlow',
    'Keras',
    'OpenCV',
    'MediaPipe',
    'Scikit-learn',
    'Polars',
    'XGBoost',
    'LightGBM',
    'Optuna',
    'SHAP',
    'Transformers',
    'CNN',
    'BiLSTM',
    '3D Gaussian Splatting',
    'TFLite',
    'FastAPI',
    'Next.js',
    'React',
    'TypeScript',
    'PostgreSQL',
    'Prisma',
    'Verilog HDL',
    'FPGA',
    'ISA Design',
    'Raspberry Pi',
    'Embedded Systems',
  ],
  sameAs: ['https://github.com/mtahaarif', 'https://www.linkedin.com/in/muhammad-taha-21a163256/'],
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/#profilepage`,
      url: SITE_URL,
      name: TITLE,
      description: DESCRIPTION,
      inLanguage: 'en',
      mainEntity: { '@id': `${SITE_URL}/#person` },
    },
    person,
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          // Rendered at the end of <body>: structured data is for crawlers, and
          // ~4KB of JSON in <head> only delays the parser reaching the content.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
