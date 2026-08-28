import { useState } from 'react'
import {
  ArrowRight, BarChart3, Bell, Box, Building2, Check, ChevronDown,
  CircleHelp, Clock3, FileCheck2, FileText, Gauge, Layers3, Link2,
  Menu, PackageCheck, Play, Plus, Search, Send, Settings2,
  ShoppingCart, WalletCards, X,
} from 'lucide-react'

const moduleData = [
  { name: 'Finance', icon: WalletCards, note: 'One action updates the whole business.' },
  { name: 'Sales', icon: BarChart3, note: 'Turn an approved quote into revenue without re-entering a thing.' },
  { name: 'Inventory', icon: Box, note: 'Stock moves when the business moves, with every reservation accounted for.' },
  { name: 'Purchasing', icon: ShoppingCart, note: 'Approvals, suppliers and landed costs stay in one clear trail.' },
  { name: 'Operations', icon: Settings2, note: 'Give every team the same context, without exposing unnecessary noise.' },
]

const workflow = [
  { name: 'Quote', ref: 'Q-2026-0150', icon: FileText },
  { name: 'Order', ref: 'SO-2026-0412', icon: FileCheck2 },
  { name: 'Fulfil', ref: 'SH-2026-0287', icon: PackageCheck },
  { name: 'Invoice', ref: 'INV-2026-0071', icon: FileText },
  { name: 'Ledger', ref: 'Pending', icon: Layers3 },
]

const activity = [
  ['Sales invoice INV-10045', 'Paid by Atlas Retail Ltd.', '2h ago'],
  ['Purchase order PO-20321', 'Approved by Jane Smith', '5h ago'],
  ['Goods receipt GR-34012', 'Received from Prime Supplies', '1d ago'],
]

const freeFeatures = ['Core finance', 'Sales & purchasing', 'Inventory', 'Up to 3 users']
const scaleFeatures = ['Advanced workflows', 'Multi-entity controls', 'Priority support', 'Unlimited users']

function Brand({ light = false }) {
  return (
    <a className={`brand ${light ? 'brand--light' : ''}`} href="#top" aria-label="Agent 71 home">
      <span className="brand-mark">71</span><strong>Agent 71</strong>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <button className="mobile-menu" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          <a href="#platform" onClick={() => setOpen(false)}>Platform</a><a href="#solutions" onClick={() => setOpen(false)}>Solutions</a><a href="#pricing" onClick={() => setOpen(false)}>Pricing</a><a href="#resources" onClick={() => setOpen(false)}>Resources</a>
        </nav>
        <div className="header-actions"><a href="#early-access">Sign in</a><a className="nav-cta" href="#early-access">Get early access</a></div>
      </div>
    </header>
  )
}

function Sparkline() {
  return <svg className="sparkline" viewBox="0 0 130 34" aria-hidden="true"><path d="M2 29C13 28 18 18 28 22s16 7 24-3 15-10 24-2 17 12 26 0 14-9 26-14" /></svg>
}

function CashChart() {
  const bars = [38,56,48,72,61,81,52,67,91,58,77,46,64,84,69,94]
  return (
    <div className="cash-chart" aria-label="Cash flow chart">
      <div className="chart-bars" aria-hidden="true">{bars.map((height, index) => <i key={`${height}-${index}`} style={{ height: `${height}%` }} />)}</div>
      <svg viewBox="0 0 460 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 90C25 76 38 41 65 64s40 30 66-2 38-17 63 7 43 30 67-7 40-28 64 3 40 15 61-8 42-32 74-16" /></svg>
      <div className="chart-axis"><span>May 1</span><span>May 8</span><span>May 15</span><span>May 22</span><span>May 29</span></div>
    </div>
  )
}

function AppSidebar({ compact = false }) {
  const items = [[Gauge,'Dashboard'],[WalletCards,'Finance'],[BarChart3,'Sales'],[Box,'Inventory'],[ShoppingCart,'Purchasing'],[Settings2,'Operations']]
  return (
    <aside className={`app-sidebar ${compact ? 'app-sidebar--compact' : ''}`}>
      <Brand light />
      <nav aria-label="Application navigation">{items.map(([Icon,label],index) => <button className={index === 0 || (compact && label === 'Finance') ? 'is-active' : ''} type="button" key={label}><Icon /><span>{label}</span><ChevronDown /></button>)}</nav>
      <div className="workspace-name"><Building2 /><span>Acme Industries</span></div>
      <div className="app-person"><i>JS</i><span><strong>Jane Smith</strong><small>Administrator</small></span></div>
    </aside>
  )
}

function ApprovalPanel() {
  const [status, setStatus] = useState('pending')
  if (status !== 'pending') {
    return <div className={`approval-panel approval-panel--${status}`} role="status"><span className="approval-state"><Check /></span><div><strong>{status === 'approved' ? 'Purchase approved' : 'Request declined'}</strong><small>PO-20321 has been updated.</small></div><button type="button" onClick={() => setStatus('pending')}>Undo</button></div>
  }
  return (
    <aside className="approval-panel">
      <div className="approval-title"><strong>Approval required</strong><Clock3 /></div>
      <div className="approval-order"><span><ShoppingCart /></span><div><small>Purchase order</small><strong>PO-20321</strong></div></div>
      <dl><div><dt>Vendor</dt><dd>Prime Supplies Co.</dd></div><div><dt>Amount</dt><dd>18,750 MAD</dd></div><div><dt>Requested by</dt><dd>Michael Chen</dd></div></dl>
      <button type="button" onClick={() => setStatus('approved')}>Approve</button><button className="button-muted" type="button" onClick={() => setStatus('declined')}>Reject</button>
    </aside>
  )
}

function DashboardPreview() {
  const metrics = [['Cash position','2,450,000','+12.4%'],['Net profit','320,000','+8.7%'],['Open invoices','650,000','23 invoices'],['Overdue invoices','120,000','8 invoices']]
  return (
    <div className="hero-app" aria-label="Agent 71 finance dashboard preview">
      <AppSidebar />
      <div className="app-content">
        <div className="app-topbar"><strong>Dashboard</strong><div className="app-search"><Search /><span>Search transactions, customers, items…</span><kbd>⌘ K</kbd></div><button type="button" aria-label="Create new"><Plus /></button><Bell /><CircleHelp /></div>
        <div className="dashboard-content">
          <div className="dashboard-heading"><div><h2>Finance overview</h2><button type="button">This month <ChevronDown /></button></div><a href="#platform">View report <ArrowRight /></a></div>
          <div className="dashboard-metrics">{metrics.map(([label,value,trend],index) => <article key={label}><div><small>{label}</small><i /></div><strong>{value}<em>MAD</em></strong><span className={index === 3 ? 'is-overdue' : ''}>{trend}</span><Sparkline /></article>)}</div>
          <div className="dashboard-lower">
            <section className="cash-panel"><div className="panel-title"><strong>Cash flow</strong><a href="#platform">View report</a></div><CashChart /></section>
            <section className="invoice-status"><div className="panel-title"><strong>Invoice status</strong><a href="#platform">View all</a></div><div className="status-content"><div className="status-ring"><span><strong>1.42M</strong><small>Total</small></span></div><ul><li><i />Paid <b>57%</b></li><li><i />Open <b>34%</b></li><li><i />Overdue <b>9%</b></li></ul></div></section>
            <section className="recent-panel"><div className="panel-title"><strong>Recent activity</strong><a href="#platform">View all</a></div>{activity.map(([title,copy,time]) => <div className="recent-row" key={title}><span><FileText /></span><div><strong>{title}</strong><small>{copy}</small></div><time>{time}</time></div>)}</section>
          </div>
        </div>
      </div>
      <ApprovalPanel />
    </div>
  )
}

function Hero() {
  return (
    <main id="top"><Header /><section className="hero"><div className="blueprint blueprint--left" aria-hidden="true" /><div className="blueprint blueprint--right" aria-hidden="true" /><div className="hero-copy page-shell"><h1>One place to run<br />your entire business.</h1><p>Agent 71 brings finance, sales, inventory, purchasing and operations together—without legacy ERP cost or spreadsheet chaos.</p><div className="hero-actions"><a className="button button--primary" href="#early-access">Start free</a><a className="button button--secondary" href="#platform"><Play />Watch product tour</a></div><small>Free plan <i /> No credit card <i /> Built to scale</small></div><div className="page-shell hero-stage"><DashboardPreview /></div></section></main>
  )
}

function ProductFrame({ activeModule }) {
  const [activeStep, setActiveStep] = useState(3)
  return (
    <div className="product-frame" aria-label="Agent 71 connected transaction workflow"><AppSidebar compact /><div className="product-workspace">
      <div className="workspace-topbar"><strong><Building2 />Acme Industries</strong><div><span><Search />Search…</span><Bell /><CircleHelp /><Settings2 /></div></div>
      <ol className="workflow-line">{workflow.map(({name,ref,icon:Icon},index) => <li className={index < activeStep ? 'is-complete' : index === activeStep ? 'is-active' : ''} key={name}><button type="button" onClick={() => setActiveStep(index)} aria-label={`Show ${name} stage`}><Icon /></button><strong>{name}</strong><small>{ref}</small></li>)}</ol>
      <div className="invoice-workspace"><section className="invoice-detail"><div className="invoice-detail-heading"><h3>INV-2026-0071</h3><button type="button">Record payment</button></div><dl className="invoice-summary"><div><dt>Customer</dt><dd>Acme Manufacturing Ltd.</dd></div><div><dt>Invoice date</dt><dd>Apr 24, 2026</dd></div><div><dt>Status</dt><dd><span>Unpaid</span></dd></div><div><dt>Total amount</dt><dd>12,450 MAD</dd></div></dl><nav className="invoice-tabs" aria-label="Invoice details"><button className="is-active" type="button">Summary</button><button type="button">Lines</button><button type="button">Payments</button><button type="button">Ledger impact</button></nav><div className="line-items"><div className="line-row line-row--head"><span>Item</span><span>Description</span><span>Qty</span><span>Amount</span></div><div className="line-row"><span>A71-1000</span><span>Operations platform</span><span>1</span><span>6,400</span></div><div className="line-row"><span>A71-2000</span><span>Team workspace</span><span>12</span><span>4,300</span></div><div className="line-row"><span>A71-3000</span><span>Implementation</span><span>1</span><span>1,750</span></div></div></section><aside className="activity-rail"><div className="panel-title"><strong>Activity</strong><button type="button">All events <ChevronDown /></button></div>{['Invoice created','Delivery completed','Order confirmed','Quote approved'].map((label,index) => <div className={index === 0 ? 'is-current' : ''} key={label}><i /><span><strong>{label}</strong><small>{index === 0 ? activeModule : 'Agent 71'}</small></span></div>)}</aside></div>
    </div></div>
  )
}

function PlatformSection() {
  const [activeModule, setActiveModule] = useState('Finance')
  const active = moduleData.find(({name}) => name === activeModule)
  return (
    <section className="platform-section" id="platform"><div className="page-shell"><header className="platform-heading"><h2>Every team. One source of truth.</h2><p>Sales creates the order. Inventory reserves the stock. Finance records the result. Agent 71 keeps the handoffs invisible.</p></header><nav className="module-tabs" aria-label="Agent 71 modules">{moduleData.map(({name,icon:Icon}) => <button className={name === activeModule ? 'is-active' : ''} type="button" key={name} onClick={() => setActiveModule(name)}><Icon />{name}</button>)}</nav><ProductFrame activeModule={activeModule} /><div className="source-note"><span><Check /></span><strong>{active.note}</strong></div></div></section>
  )
}

function ReadinessSection() {
  return (
    <section className="readiness" id="solutions"><div className="page-shell readiness-grid"><div className="readiness-copy"><h2>Ready for Morocco’s next invoicing standard.</h2><p>Agent 71 is being designed to support Morocco’s 2026 e-invoicing rollout—from structured invoices to connected records and cleaner reporting.</p><ul><li><Check />Create structured invoices</li><li><Check />Keep every record connected</li><li><Check />Adapt as requirements evolve</li></ul></div><div className="readiness-visual"><article className="structured-invoice"><div className="structured-head"><Brand /><div><strong>INVOICE</strong><small>INV-2026-000125<br />Aug 28, 2026</small></div></div><div className="structured-address"><span><small>From</small><strong>Your Company SARL</strong><em>Casablanca, Morocco</em></span><span><small>Bill to</small><strong>Client Company</strong><em>Casablanca, Morocco</em></span></div><div className="structured-lines"><div><span>Operations platform</span><b>5,000.00</b></div><div><span>Software subscription</span><b>2,150.00</b></div><div><span>Implementation</span><b>1,250.00</b></div></div><div className="structured-total"><span>Total (MAD)</span><strong>8,400.00</strong></div></article><ol className="transmission-flow"><li><i><FileText /></i><strong>Created</strong></li><li><i><Link2 /></i><strong>Connected</strong></li><li><i><Send /></i><strong>Ready</strong></li></ol></div></div></section>
  )
}

function Plan({ title, subtitle, features, primary = false }) {
  return <article className={`plan ${primary ? 'plan--primary' : ''}`}><div className="plan-heading"><span>{primary ? <Box /> : <Building2 />}</span><div><h3>{title}</h3><p>{subtitle}</p></div></div><ul>{features.map((feature) => <li key={feature}><Check />{feature}</li>)}</ul><a className={primary ? 'button button--primary' : 'button button--secondary'} href="#early-access">{primary ? 'Start free' : 'Talk to us'}</a></article>
}

function PricingSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const submit = (event) => { event.preventDefault(); if (!event.currentTarget.checkValidity()) return; setSubmitted(true) }
  return (
    <section className="pricing-section" id="pricing"><div className="page-shell pricing-grid"><div className="pricing-copy" id="early-access"><h2>Start with the essentials. <span>Upgrade when you’re ready.</span></h2>{submitted ? <div className="form-success" role="status"><span><Check /></span><div><strong>You’re on the list.</strong><small>We’ll contact you at {email}.</small></div></div> : <form onSubmit={submit}><label className="sr-only" htmlFor="work-email">Work email</label><div><FileText /><input id="work-email" type="email" required placeholder="Work email" value={email} onChange={(event) => setEmail(event.target.value)} /></div><button type="submit">Join early access <ArrowRight /></button></form>}<p>Be the first to try Agent 71 and get updates on e-invoicing readiness.</p></div><div className="plans"><Plan title="Free" subtitle="For getting started" features={freeFeatures} primary /><Plan title="Scale" subtitle="For growing teams" features={scaleFeatures} /></div></div></section>
  )
}

function Footer() {
  return <footer className="site-footer" id="resources"><div className="page-shell footer-inner"><div><Brand /><span>Built by Hikari Tech</span></div><nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#solutions">Solutions</a><a href="#pricing">Pricing</a><a href="#solutions">E-invoicing</a><a href="#resources">Privacy</a></nav></div></footer>
}

export default function App() { return <><Hero /><PlatformSection /><ReadinessSection /><PricingSection /><Footer /></> }
