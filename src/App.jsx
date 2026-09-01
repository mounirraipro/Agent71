import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, Boxes, Building2, Check,
  ChevronDown, ChevronRight, FileCheck2, FileText,
  Gauge, Mail, Menu, PackageCheck, Play, Send, ShoppingBag,
  SlidersHorizontal, X,
} from 'lucide-react'
import BenefitTriptych from './BenefitTriptych'
import ProductFooter from './ProductFooter'
import BanknoteArt from './BanknoteArt'
import { BrandLockup, LogoMark } from './BrandLogo'
import { LanguageSwitcher } from './i18n'
import { usePageMotion } from './usePageMotion'

const sidebarItems = [
  [Gauge, 'Home'], [BarChart3, 'Dashboard'], [ShoppingBag, 'Sales'],
  [PackageCheck, 'Purchases'], [Boxes, 'Inventory'], [FileText, 'Accounting'],
]

const barValues = [34, 52, 67, 58, 83, 61, 91]

function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...props }) {
  const ref = useRef(null)

  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-visible')
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return <Tag ref={ref} className={`reveal ${className}`} style={{ '--delay': `${delay}ms` }} {...props}>{children}</Tag>
}

function Brand() {
  return <a className="brand" href="#top" aria-label="Agent 71 home"><BrandLockup /></a>
}

function Header() {
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={`main-nav ${open ? 'is-open' : ''}`} aria-label="Main navigation">
          <a href="#platform" onClick={close}>Platform</a>
          <a href="#benefits" onClick={close}>Benefits</a>
          <a href="/einvoicing.html" onClick={close}>E-invoicing</a>
          <a href="/start.html#modules" onClick={close}>Modules</a>
          <a className="mobile-start" href="/start.html" onClick={close}>Start free</a>
        </nav>
        <div className="nav-actions"><LanguageSwitcher /><a className="button button--compact desktop-start" href="/start.html">Start free</a></div>
      </div>
    </header>
  )
}

function LineChart() {
  return (
    <svg className="line-chart" viewBox="0 0 420 112" preserveAspectRatio="none" aria-label="Cashflow trend">
      <path className="line-grid" d="M0 92H420M0 56H420M0 20H420" />
      <path className="line-path" d="M2 92C32 86 42 54 71 68S111 85 137 51s48-25 72-8 53 10 75-9 39-24 65-9 45-6 69-22" />
      <circle className="line-dot" cx="418" cy="3" r="5" />
    </svg>
  )
}

function DashboardSidebar() {
  return (
    <aside className="dash-sidebar">
      <div className="dash-logo"><LogoMark /><strong>Agent 71</strong></div>
      <nav aria-label="Dashboard navigation">
        {sidebarItems.map(([Icon, label], index) => (
          <button className={index === 0 ? 'is-active' : ''} type="button" key={label}><Icon /><span>{label}</span></button>
        ))}
      </nav>
      <a className="company-switcher" href="https://hikaritech.ma" target="_blank" rel="noreferrer" aria-label="Visit HikariTech">
        <Building2 /><span><strong>HikariTech</strong><small>Casablanca</small></span><ChevronDown />
      </a>
    </aside>
  )
}

function HeroDashboard() {
  const [range, setRange] = useState('This month')

  return (
    <div className="dashboard-frame" aria-label="Interactive Agent 71 dashboard preview">
      <DashboardSidebar />
      <div className="dash-main">
        <div className="dash-topline">
          <div><h2>Good morning, Sara</h2><p>Here’s what’s happening in your business today.</p></div>
          <button type="button" onClick={() => setRange((value) => value === 'This month' ? 'This quarter' : 'This month')}>{range}<ChevronDown /></button>
        </div>
        <p className="overview-label">Today’s overview</p>
        <div className="dashboard-grid dashboard-grid--top">
          <article className="dash-panel cash-panel">
            <div className="panel-heading"><span>Cashflow</span><small>MAD</small></div>
            <strong className="metric">1,250,540.00 <small>MAD</small></strong>
            <span className="metric-change">+12.5% vs yesterday</span>
            <LineChart />
            <div className="axis"><span>14 May</span><span>16 May</span><span>18 May</span><span>20 May</span></div>
          </article>
          <article className="dash-panel invoice-panel">
            <div className="panel-heading"><span>Open invoices</span><small>MAD</small></div>
            <strong className="metric">320,450.00 <small>MAD</small></strong>
            <span className="muted-line">18 invoices</span>
            <ul>
              <li><i className="status-dot status-dot--red" />Overdue <b>120,450</b></li>
              <li><i className="status-dot status-dot--orange" />Due this week <b>80,000</b></li>
              <li><i className="status-dot status-dot--indigo" />Due later <b>120,000</b></li>
            </ul>
            <a href="#e-invoicing">View all invoices <ArrowRight /></a>
          </article>
          <article className="dash-panel sales-panel">
            <div className="panel-heading"><span>Sales orders</span><small>MAD</small></div>
            <strong className="metric">850,200.00 <small>MAD</small></strong>
            <span className="metric-change">+8.3% vs yesterday</span>
            <div className="sales-bars" aria-label="Sales order bar chart">{barValues.map((value, index) => <i key={index} style={{ height: `${value}%` }} />)}</div>
            <div className="axis"><span>M</span><span>T</span><span>W</span><span>T</span><span>F</span><span>S</span><span>S</span></div>
          </article>
        </div>
        <div className="dashboard-grid dashboard-grid--bottom">
          <article className="dash-panel inventory-panel">
            <div className="panel-heading"><span>Inventory status</span><small>72%</small></div>
            <strong className="metric">2,450,300.00 <small>MAD</small></strong>
            <span className="muted-line">128 items across 6 categories</span>
            <div className="stock-track"><i /></div>
            <div className="stock-legend"><span><i />In stock</span><a href="#benefits">View inventory <ArrowRight /></a></div>
          </article>
          <article className="dash-panel products-panel">
            <div className="panel-heading"><span>Top selling items</span><small>MAD</small></div>
            <div className="product-row"><Boxes /><span>Wireless Headphones</span><small>320 units</small><b>96,000</b></div>
            <div className="product-row"><Boxes /><span>Smart Watch</span><small>210 units</small><b>63,000</b></div>
            <div className="product-row"><Boxes /><span>Backpack</span><small>180 units</small><b>36,000</b></div>
          </article>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <BanknoteArt variant="city" className="currency-art--hero" />
      <div className="hero-copy">
        <h1>Run your <em>business.</em><br />Not your spreadsheets.</h1>
        <p>Finance, sales, inventory and accounting—together in one modern ERP.</p>
        <div className="hero-actions">
          <a className="button" href="/start.html">Start free</a>
          <a className="button button--outline" href="#platform"><Play />See the product</a>
        </div>
      </div>
      <div className="hero-dashboard-wrap" id="platform"><HeroDashboard /></div>
    </section>
  )
}

function Benefits() {
  return <BenefitTriptych />
}

function InvoiceDocument() {
  const [sent, setSent] = useState(false)
  return (
    <div className="invoice-app" aria-label="Interactive electronic invoice preview">
      <aside>
        <div className="invoice-brand">Agent 71</div>
        {['Dashboard', 'Sales', 'Invoices', 'Customers', 'Reports', 'Settings'].map((item) => <button className={item === 'Invoices' ? 'is-active' : ''} type="button" key={item}>{item}</button>)}
      </aside>
      <main>
        <div className="breadcrumbs">Invoices <ChevronRight /> INV-2026-000237</div>
        <div className="invoice-sheet">
          <div className="invoice-sheet-head"><h3>Invoice</h3><span>INV-2026-000237</span></div>
          <div className="invoice-parties"><p><b>Bill to</b>Atlas Trading SARL<br />Casablanca, Morocco<br />ICE: 001234567000012</p><p><b>Issue date</b>May 12, 2026<br /><b>Due date</b>May 26, 2026</p></div>
          <table><thead><tr><th>Item</th><th>Qty.</th><th>Unit price</th><th>Amount</th></tr></thead><tbody><tr><td>Office chair</td><td>10</td><td>950.00</td><td>9,500.00</td></tr><tr><td>Work desk</td><td>5</td><td>1,850.00</td><td>9,250.00</td></tr><tr><td>Filing cabinet</td><td>3</td><td>1,200.00</td><td>3,600.00</td></tr></tbody></table>
          <div className="invoice-total"><span>Subtotal <b>22,350.00</b></span><span>VAT (20%) <b>4,470.00</b></span><span>Total (MAD) <b>26,820.00</b></span></div>
          <span className="structured-status"><i />Structured for e-invoicing</span>
        </div>
      </main>
      <section className="einvoice-panel">
        <h3>E-invoicing</h3>
        <div className="ready-box"><span>Status</span><b>{sent ? 'Sent' : 'Ready'}</b><p>{sent ? 'Invoice sent and recorded.' : 'Prepared for Morocco’s electronic invoicing requirements.'}</p></div>
        <dl><div><dt>Format</dt><dd>UBL 2.1</dd></div><div><dt>Language</dt><dd>ar-MA</dd></div><div><dt>Currency</dt><dd>MAD</dd></div></dl>
        <button type="button" onClick={() => setSent(true)}>{sent ? <Check /> : <Send />}{sent ? 'Invoice sent' : 'Send invoice'}</button>
      </section>
    </div>
  )
}

function EInvoicing() {
  return (
    <section className="einvoicing section-pad" id="e-invoicing" data-motion="section">
      <BanknoteArt variant="sahara" className="currency-art--einvoicing" />
      <div className="einvoice-shell">
        <Reveal className="einvoice-copy" data-motion="heading">
          <h2>Ready for Morocco’s<br />e-invoicing shift.</h2>
          <p>Create structured invoices, keep the right records, and connect compliance to the rest of your operation.</p>
          <div className="einvoice-points"><span><FileCheck2 />Structured</span><span><Mail />Connected</span><span><SlidersHorizontal />Adaptable</span></div>
        </Reveal>
        <Reveal className="invoice-preview" delay={120} data-motion-card><InvoiceDocument /></Reveal>
      </div>
    </section>
  )
}

export default function App() {
  const pageRef = useRef(null)
  usePageMotion(pageRef, 'home')
  return <div ref={pageRef} className="app-shell"><Header /><main><Hero /><Benefits /><EInvoicing /></main><ProductFooter /></div>
}
