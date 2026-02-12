import HomeClient from '@/components/HomeClient'

// Force static generation so Netlify can detect forms at build time
export const dynamic = 'force-static'

export default function Home() {
  return (
    <>
      {/* Static form for Netlify Forms detection - must be in server component */}
      <form name="contact" data-netlify="true" netlify-honeypot="bot-field" hidden aria-hidden="true">
        <input type="hidden" name="form-name" value="contact" />
        <input name="bot-field" />
        <input name="name" />
        <input name="email" />
        <input name="subject" />
        <textarea name="message" />
      </form>
      <HomeClient />
    </>
  )
}
