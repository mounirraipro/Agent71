import { useEffect, useRef, useState } from 'react'

const socials = [
  ['Discord', 'M19.5 5.3A16.3 16.3 0 0 0 15.4 4l-.5 1a15 15 0 0 0-5.8 0l-.5-1a16.6 16.6 0 0 0-4.1 1.3C1.9 9.1 1.2 12.8 1.6 16.4a16.7 16.7 0 0 0 5 2.5l1.2-1.6-1.8-.9.4-.3c3.5 1.6 7.4 1.6 10.9 0l.4.3-1.8.9 1.2 1.6a16.7 16.7 0 0 0 5-2.5c.5-4.2-.8-7.9-2.6-11.1ZM8.2 14.2c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 1.9.9 1.9 2-.9 2-1.9 2Zm7.6 0c-1 0-1.9-.9-1.9-2s.8-2 1.9-2 1.9.9 1.9 2-.8 2-1.9 2Z'],
  ['X', 'M18.2 2h3.7l-8.1 9.2L23.3 22h-7.4l-5.8-7.6L3.4 22H-.3l8.7-10L-.7 2h7.6l5.2 6.9L18.2 2Zm-1.3 18.1h2L5.8 3.8H3.7l13.2 16.3Z'],
  ['LinkedIn', 'M4.9 3.5A2.5 2.5 0 1 1 0 3.5a2.5 2.5 0 0 1 4.9 0ZM.4 7.4h4.1V21H.4V7.4Zm6.6 0h4v1.9h.1c.6-1.1 2-2.3 4-2.3 4.3 0 5.1 2.8 5.1 6.5V21h-4.1v-6.7c0-1.6 0-3.7-2.3-3.7s-2.6 1.8-2.6 3.6V21H7V7.4Z'],
  ['GitHub', 'M12 .6A11.7 11.7 0 0 0 8.3 23.4c.6.1.8-.3.8-.6v-2.3c-3.4.7-4.1-1.4-4.1-1.4-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.8 0-1.3.5-2.3 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.9.1 3.2.8.9 1.2 2 1.2 3.2 0 4.5-2.8 5.5-5.5 5.8.4.4.8 1.1.8 2.2v3.3c0 .4.2.7.8.6A11.7 11.7 0 0 0 12 .6Z'],
]

export default function ProductFooter() {
  const watermarkRef = useRef(null)
  const textRef = useRef(null)
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const fit = () => {
      if (!watermarkRef.current || !textRef.current) return
      try {
        const box = textRef.current.getBBox()
        watermarkRef.current.setAttribute('viewBox', `${box.x} ${box.y} ${box.width} ${box.height}`)
      } catch { /* SVG may not be measurable before fonts settle. */ }
    }
    document.fonts?.ready.then(fit)
    window.addEventListener('resize', fit)
    fit()
    return () => window.removeEventListener('resize', fit)
  }, [])

  const submit = (event) => {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <section className="footer-section" id="contact">
      <div className="reference-footer-wrapper">
        <div className="reference-footer-left">
          <video className="reference-footer-video" autoPlay muted loop playsInline preload="metadata">
            <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260503_104800_bc43ae09-f494-43e3-97d7-2f8c1692cfd7.mp4" type="video/mp4" />
          </video>
          <a className="reference-footer-logo" href="#top"><span>71</span><strong>Agent 71</strong></a>
          <div className="reference-footer-tagline">Every part of your business,<br /><span>moving in one flow.</span></div>
          <div className="reference-footer-social-row">
            <a className="reference-contact-mail" href="mailto:contact@hikaritech.ma">contact@hikaritech.ma</a>
            <div className="reference-social-icons">{socials.map(([name, path]) => <a href="#contact" aria-label={name} key={name}><svg viewBox="0 0 24 24"><path d={path} /></svg></a>)}</div>
          </div>
        </div>
        <div className="reference-footer-right">
          <div className="reference-lucky-graphic"><div className="reference-lucky-cube"><span>71</span></div><div className="reference-lucky-row"><svg viewBox="0 0 24 24"><path d="M3 20 C 6 14, 10 9, 18 5" /><path d="M18 5 L 12 5" /><path d="M18 5 L 18 11" /></svg><span>Feeling ready?</span></div></div>
          <div className="reference-footer-nav-cols">
            <nav><strong>Navigation</strong><a href="#platform">How it works</a><a href="#benefits">Features</a><a href="#e-invoicing">E-invoicing</a><a href="/start.html">Product scope</a></nav>
            <nav><strong>Company</strong><a href="https://hikaritech.ma">About Hikari Tech</a><a href="mailto:contact@hikaritech.ma">Contact</a><a href="#terms">Terms and Conditions</a><a href="#privacy">Privacy Policy</a></nav>
          </div>
          <div className="reference-footer-bottom">
            <span>© 2026 Hikari Tech. All rights reserved.</span>
            <div className="reference-footer-mini"><h4>Business moves fast.<strong>Stay ahead with Agent 71.</strong></h4><form onSubmit={submit}><label className="sr-only" htmlFor="product-email">Email address</label><input id="product-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email address" required /><button type="submit">{subscribed ? 'Subscribed' : 'Subscribe'}</button></form></div>
          </div>
        </div>
      </div>
      <div className="reference-footer-watermark" aria-hidden="true"><svg ref={watermarkRef} viewBox="62 95 876 175" preserveAspectRatio="xMidYMid meet"><text ref={textRef} x="500" y="240" textAnchor="middle" fontSize="320">Agent 71</text></svg></div>
    </section>
  )
}
