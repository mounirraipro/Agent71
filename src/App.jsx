import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, Boxes, Building2, Check, CheckCircle2,
  ChevronDown, ChevronRight, CircleDollarSign, FileCheck2, FileText,
  Gauge, Mail, Menu, PackageCheck, Play, Send, ShoppingBag,
  SlidersHorizontal, Users, WalletCards, X,
} from 'lucide-react'

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
  return <a className="brand" href="#top" aria-label="Agent 71 home">Agent 71</a>
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
          <a href="#e-invoicing" onClick={close}>E-invoicing</a>
          <a href="#pricing" onClick={close}>Pricing</a>
          <a className="mobile-start" href="#start" onClick={close}>Start free</a>
        </nav>
        <a className="button button--compact desktop-start" href="#start">Start free</a>
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
      <div className="dash-logo"><span>A</span><strong>Agent 71</strong></div>
      <nav aria-label="Dashboard navigation">
        {sidebarItems.map(([Icon, label], index) => (
          <button className={index === 0 ? 'is-active' : ''} type="button" key={label}><Icon /><span>{label}</span></button>
        ))}
      </nav>
      <button className="company-switcher" type="button">
        <Building2 /><span><strong>Hikari Tech</strong><small>Casablanca</small></span><ChevronDown />
      </button>
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
      <div className="hero-copy">
        <h1>Run your <em>business.</em><br />Not your spreadsheets.</h1>
        <p>Finance, sales, inventory and accounting—together in one modern ERP.</p>
        <div className="hero-actions">
          <a className="button" href="#start">Start free</a>
          <a className="button button--outline" href="#platform"><Play />See the product</a>
        </div>
      </div>
      <div className="hero-dashboard-wrap" id="platform"><HeroDashboard /></div>
    </section>
  )
}

function VisibilityVisual() {
  const bars = [24, 38, 49, 61, 73, 92]
  return (
    <div className="benefit-visual visibility-visual">
      <div className="visual-title"><strong>Cash position</strong><span><b>MAD</b> 284k</span></div>
      <div className="feature-chart"><div className="chart-rules"><i /><i /><i /></div><div className="feature-bars">{bars.map((bar, index) => <i key={index} style={{ height: `${bar}%` }} />)}</div></div>
      <div className="mini-stats">
        <span><BarChart3 /><small>Sales</small><b>MAD 1.2M</b></span>
        <span><Boxes /><small>Stock value</small><b>MAD 690k</b></span>
        <span><WalletCards /><small>Cash in</small><b>MAD 284k</b></span>
      </div>
    </div>
  )
}

function WorkflowVisual() {
  const [automated, setAutomated] = useState(false)
  const steps = ['Create receipt', 'Create follow-up task', 'Update customer record', 'Update financials']
  return (
    <div className={`benefit-visual workflow-visual ${automated ? 'is-automated' : ''}`}>
      <div className="workflow-head"><strong>Agent 71 Automations</strong><button type="button" onClick={() => setAutomated(true)}>{automated ? <Check /> : null}{automated ? 'Automated' : 'Automate'}</button></div>
      <label><b>When</b><span>an invoice is paid…</span></label>
      <b className="then-label">Then</b>
      <div className="automation-list">{steps.map((step) => <div key={step}><i /><span>{step}</span><small>{automated ? 'Done' : 'Ready'}</small><Check /></div>)}</div>
    </div>
  )
}

function DecisionsVisual() {
  return (
    <div className="benefit-visual decision-visual">
      <div className="saved-time"><strong>8h<small> saved</small></strong><span>Across teams<br />this week</span></div>
      <div className="decision-flow">
        <div className="team-list"><span><Users />Sales</span><span><CircleDollarSign />Finance</span><span><Boxes />Inventory</span></div>
        <div className="flow-lines" aria-hidden="true"><i /><i /><i /></div>
        <div className="ready-state"><CheckCircle2 />Ready</div>
      </div>
    </div>
  )
}

const benefitCards = [
  { number: '01', title: 'Instant visibility', body: 'See cash, sales and stock as they change.', visual: <VisibilityVisual /> },
  { number: '02', title: 'Connected workflows', body: 'Turn a sale into records, tasks and follow-through.', visual: <WorkflowVisual />, anchor: true },
  { number: '03', title: 'Faster decisions', body: 'Give every team the context to act.', visual: <DecisionsVisual /> },
]

function Benefits() {
  return (
    <section className="benefits section-pad" id="benefits">
      <Reveal className="section-heading section-heading--center"><h2>Built to move work forward.</h2><p>Less switching. Fewer gaps. A clearer view of every decision.</p></Reveal>
      <div className="benefit-grid">
        {benefitCards.map((card, index) => (
          <Reveal as="article" className={`benefit-card ${card.anchor ? 'benefit-card--anchor' : ''}`} delay={index === 1 ? 0 : 120} key={card.title}>
            <span className="card-index">{card.number}</span><h3>{card.title}</h3><p>{card.body}</p>{card.visual}
          </Reveal>
        ))}
      </div>
    </section>
  )
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
    <section className="einvoicing section-pad" id="e-invoicing">
      <div className="einvoice-shell">
        <Reveal className="einvoice-copy">
          <h2>Ready for Morocco’s<br />e-invoicing shift.</h2>
          <p>Create structured invoices, keep the right records, and connect compliance to the rest of your operation.</p>
          <div className="einvoice-points"><span><FileCheck2 />Structured</span><span><Mail />Connected</span><span><SlidersHorizontal />Adaptable</span></div>
        </Reveal>
        <Reveal className="invoice-preview" delay={120}><InvoiceDocument /></Reveal>
      </div>
    </section>
  )
}

function PricingCta() {
  return (
    <section className="pricing-cta" id="pricing">
      <Reveal><h2>Start free. Scale when<br />you’re ready.</h2></Reveal>
      <Reveal delay={70}><p>A modern ERP should be easy to adopt—<br />not another expensive commitment.</p></Reveal>
      <Reveal className="pricing-actions" delay={140}><a className="button" href="#start">Start free</a><a className="button button--outline" href="mailto:hello@hikari.ma">Talk to us</a></Reveal>
    </section>
  )
}

function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const submit = (event) => {
    event.preventDefault()
    if (email.trim()) setSubscribed(true)
  }

  return (
    <footer className="site-footer" id="start">
      <div className="footer-note">Feeling ready?<span /></div>
      <div className="footer-die" aria-hidden="true">71</div>
      <div className="footer-panels">
        <section className="footer-brand-panel"><Brand /><p>Your business, in one flow.</p><a href="mailto:hello@hikari.ma">hello@hikari.ma <ArrowRight /></a></section>
        <section className="footer-links-panel">
          <nav aria-label="Footer product navigation"><strong>Product</strong><a href="#platform">Platform</a><a href="#benefits">Benefits</a><a href="#e-invoicing">E-invoicing</a><a href="#pricing">Pricing</a></nav>
          <nav aria-label="Footer company navigation"><strong>Company</strong><a href="https://hikari.ma">About Hikari Tech</a><a href="mailto:hello@hikari.ma">Contact</a><a href="#privacy">Privacy</a></nav>
          <div className="newsletter"><strong>Get product updates</strong><form onSubmit={submit}><label className="sr-only" htmlFor="footer-email">Work email</label><input id="footer-email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@company.com" required /><button type="submit">{subscribed ? 'Subscribed' : 'Subscribe'}</button></form><small>{subscribed ? 'You’re on the list. Welcome.' : '© 2026 Hikari Tech'}</small></div>
        </section>
      </div>
      <div className="footer-watermark" aria-hidden="true">Agent 71</div>
    </footer>
  )
}

export default function App() {
  return <><Header /><main><Hero /><Benefits /><EInvoicing /><PricingCta /></main><Footer /></>
}
