import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fawkesenergy.com'),
  title: 'Fawkes Energy - Battery Intelligence for the Electric Revolution',
  description: 'Intelligent systems to monitor and model battery health across life stages. Reducing warranty costs, improving ROI prediction, and enabling circular battery economy.',
  keywords: 'battery intelligence, battery health, electric vehicles, energy storage, battery analytics, SOH, RUL, predictive modeling',
  authors: [{ name: 'Fawkes Energy' }],
  robots: 'index, follow',
  openGraph: {
    title: 'Fawkes Energy - Battery Intelligence for the Electric Revolution',
    description: 'Intelligent systems to monitor and model battery health across life stages.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fawkes Energy - Battery Intelligence',
    description: 'Intelligent systems to monitor and model battery health across life stages.',
  },
  icons: {
    icon: '/images/icon.svg',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script id="gtm" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-T7FDT26B');`}
        </Script>
      </head>
      <body className="font-body" suppressHydrationWarning>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T7FDT26B"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
