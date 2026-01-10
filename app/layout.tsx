import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import './globals.css'

const poppins = Poppins({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins'
})

export const metadata: Metadata = {
  title: 'Muhammad Taha | AI Engineer & Computer Vision Specialist',
  description: 'Final-year Computer Engineering student at NUST specializing in Generative AI, Computer Vision, and Embedded Systems. Portfolio showcasing projects in LLMs, Deep Learning, FPGA, and IoT.',
  keywords: ['AI Engineer', 'Computer Vision', 'Machine Learning', 'Deep Learning', 'FPGA', 'NUST', 'Portfolio', 'Muhammad Taha'],
  authors: [{ name: 'Muhammad Taha' }],
  openGraph: {
    title: 'Muhammad Taha | AI Engineer',
    description: 'AI Engineer & Computer Vision Specialist',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
