import type { Metadata } from 'next'
import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'UAV Human Detection 2025 | AI-Powered Aerial Surveillance',
  description: 'Advancing aerial surveillance through AI-powered computer vision. Faster R-CNN models trained for search and rescue, disaster response, and security applications.',
  keywords: ['UAV', 'drone', 'human detection', 'computer vision', 'AI', 'search and rescue', 'thermal imaging', 'Faster R-CNN'],
  authors: [{ name: 'UAV Detection Team' }],
  openGraph: {
    title: 'UAV Human Detection 2025',
    description: 'AI-powered human detection from aerial perspectives',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UAV Human Detection 2025',
    description: 'AI-powered human detection from aerial perspectives',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-deep-black text-white antialiased">
        {children}
      </body>
    </html>
  )
}
