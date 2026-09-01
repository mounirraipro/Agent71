import { ArrowLeft, ArrowRight } from 'lucide-react'
import BanknoteArt from './BanknoteArt'
import { BrandLockup } from './BrandLogo'

export function InfoHeader() {
  return <header className="start-header info-header"><a className="start-back" href="/"><ArrowLeft /><span>Back to Agent 71</span></a><a className="start-wordmark" href="/" aria-label="Agent 71 home"><BrandLockup /></a><a className="start-contact-link" href="mailto:contact@hikaritech.ma">Contact us</a></header>
}

export function DevelopmentCTA() {
  return <section className="start-final"><BanknoteArt variant="sea" className="currency-art--start-final" /><p>Agent 71 is in development.</p><h2>Tell us what your<br />business needs.</h2><a href="mailto:contact@hikaritech.ma">contact@hikaritech.ma <ArrowRight /></a></section>
}

export function InfoFooter() {
  return <footer className="start-footer info-footer"><a href="/" aria-label="Agent 71 home"><BrandLockup /></a><nav><a href="/einvoicing.html">E-invoicing</a></nav><span>Built by <a className="start-hikari-link" href="https://hikaritech.ma" target="_blank" rel="noreferrer">HikariTech</a> · Casablanca · 2026</span></footer>
}
