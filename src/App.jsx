import { useEffect, useRef, useState } from 'react'
import {
  ArrowRight, BarChart3, Bell, Box, Building2, Check, CheckCircle2,
  ChevronDown, FileText, Gauge, Layers3, Menu, PackageCheck,
  Play, Search, Send, ShoppingCart, WalletCards, X,
} from 'lucide-react'

const flowSteps = [
  { name: 'Sell', label: 'Sales order SO-071', icon: ShoppingCart, detail: 'Atlas Retail', meta: '12,450 MAD' },
  { name: 'Reserve', label: 'Stock reserved', icon: Box, detail: '3 items allocated', meta: 'WH-CAS-01' },
  { name: 'Invoice', label: 'Invoice ready', icon: FileText, detail: 'INV-071', meta: '12,450 MAD' },
  { name: 'Reconcile', label: 'Ledger balanced', icon: Layers3, detail: 'All entries match', meta: '0.00 MAD' },
]

const moduleItems = [
  [Gauge, 'Overview'], [ShoppingCart, 'Sales'], [PackageCheck, 'Stock'],
  [FileText, 'Finance'], [WalletCards, 'Banking'], [BarChart3, 'Reports'],
]

const ledgerRows = [
  ['AR · Atlas Retail', '12,450.00'], ['Sales revenue', '9,000.00'],
  ['Implementation', '2,000.00'], ['VAT output', '1,450.00'],
]

function Reveal({ as: Tag = 'div', className = '', children, ...props }) {
  const ref = useRef(null)
  useEffect(() => {
    const node = ref.current
    if (!node) return undefined
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        node.classList.add('is-revealed')
        observer.disconnect()
      }
    }, { threshold: 0.12 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [])
  return <Tag ref={ref} className={`reveal ${className}`} {...props}>{children}</Tag>
}

function Brand({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="#top" aria-label="Agent 71 home">
      <span className="brand-mark"><i>7</i><i>1</i></span><strong>Agent 71</strong>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand inverse />
        <button className="menu-button" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen((value) => !value)}>{open ? <X /> : <Menu />}</button>
        <nav className={`main-nav ${open ? 'main-nav--open' : ''}`} aria-label="Main navigation">
          <a href="#platform" onClick={() => setOpen(false)}>Platform</a>
          <a href="#why-agent-71" onClick={() => setOpen(false)}>Why Agent 71</a>
          <a href="#pricing" onClick={() => setOpen(false)}>Pricing</a>
        </nav>
        <div className="nav-actions"><a href="#early-access">Sign in</a><a className="nav-cta" href="#early-access">Start free</a></div>
      </div>
    </header>
  )
}

function MiniLineChart() {
  return (
    <svg className="mini-line" viewBox="0 0 300 104" preserveAspectRatio="none" aria-label="Sales trend chart">
      <defs><linearGradient id="lineFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#4f5dff" stopOpacity=".45" /><stop offset="1" stopColor="#4f5dff" stopOpacity="0" /></linearGradient></defs>
      <path className="chart-fill" d="M2 92C29 73 39 82 60 62s36-12 54-2 34 10 52-14 33-24 52-5 35 3 47-11 21-17 33-24V104H2Z" />
      <path className="chart-stroke" d="M2 92C29 73 39 82 60 62s36-12 54-2 34 10 52-14 33-24 52-5 35 3 47-11 21-17 33-24" />
      <circle cx="298" cy="6" r="4" />
    </svg>
  )
}

function AppNav() {
  return (
    <aside className="demo-nav">
      <Brand inverse />
      <nav aria-label="Agent 71 application navigation">
        {moduleItems.map(([Icon, label], index) => <button className={index === 0 ? 'is-active' : ''} type="button" key={label}><Icon /><span>{label}</span></button>)}
      </nav>
      <div className="company-switch"><Building2 /><span><strong>Acme Industries</strong><small>Casablanca</small></span><ChevronDown /></div>
    </aside>
  )
}

function HeroDashboard() {
  const [approved, setApproved] = useState(false)
  return (
    <div className="hero-system" aria-label="Interactive Agent 71 operations dashboard">
      <div className="system-glow" />
      <div className="dashboard-window">
        <AppNav />
        <div className="demo-main">
          <div className="demo-top"><strong>Overview</strong><div><Search />Search anything…</div><Bell /></div>
          <div className="demo-content">
            <div className="demo-title"><div><small>Friday, 28 August</small><h2>Business pulse</h2></div><button type="button">This month <ChevronDown /></button></div>
            <div className="metric-strip">
              <article><small>Sales</small><strong>840K <em>MAD</em></strong><span>+18.2%</span><MiniLineChart /></article>
              <article><small>Operations</small><div className="health-ring"><span>98%</span></div><span>On track</span></article>
              <article><small>Cash position</small><strong>2.45M <em>MAD</em></strong><div className="mini-bars">{[42,62,49,78,71,94].map((height, index) => <i key={height} style={{'--bar': `${height}%`, '--delay': `${index * 90}ms`}} />)}</div></article>
            </div>
            <div className="transaction-panel">
              <div className="panel-head"><strong>Recent transactions</strong><button type="button">View all <ArrowRight /></button></div>
              {[['SO-1048','Atlas Retail','Order','84,500'],['PO-2215','Vertex Supplies','Purchase','118,000'],['INV-3347','Acme Industries','Invoice','245,000'],['PAY-8872','Hikari Bank','Payment','62,400']].map((row, index) => <div className="transaction-row" key={row[0]}><i className={`dot dot--${index}`} /><strong>{row[0]}</strong><span>{row[1]}</span><span>{row[2]}</span><b>{row[3]} MAD</b></div>)}
            </div>
          </div>
        </div>
      </div>
      <div className={`approval-float ${approved ? 'is-approved' : ''}`} role="status">
        <div className="approval-icon">{approved ? <Check /> : <FileText />}</div>
        <div><small>{approved ? 'Approved' : 'Approval'}</small><strong>{approved ? 'Invoice released' : 'Invoice INV-3347'}</strong><span>245,000 MAD</span></div>
        <button type="button" onClick={() => setApproved((value) => !value)}>{approved ? 'Undo' : 'Approve'}</button>
      </div>
      <ol className="hero-flow" aria-label="Order to ledger flow">
        {[['Order',ShoppingCart],['Stock',Box],['Invoice',FileText],['Ledger',Layers3]].map(([label, Icon], index) => <li key={label}><div><Icon /></div><span><strong>{label}</strong><small>{index === 0 ? 'SO-1048' : index === 1 ? 'Reserved' : index === 2 ? 'INV-3347' : 'Recorded'}</small></span>{index < 3 ? <ArrowRight /> : null}</li>)}
      </ol>
      <div className="hero-insights" aria-label="Live business insights">
        <article className="stock-insight"><div className="insight-head"><strong>Stock availability</strong><span>Live</span></div>{[['A-1001','1,250','930'],['B-2002','850','640'],['C-3003','620','530']].map((row) => <div className="stock-row" key={row[0]}><Box /><b>{row[0]}</b><span>{row[1]}</span><em>{row[2]}</em></div>)}</article>
        <article className="trend-insight"><div className="insight-head"><strong>Sales trend</strong><span>+18.2%</span></div><MiniLineChart /></article>
        <article className="cash-insight"><div className="insight-head"><strong>Cash flow</strong><span>Healthy</span></div><div className="cash-bars">{[39,61,49,75,63,88,70].map((height,index) => <i key={`${height}-${index}`} style={{'--cash': `${height}%`, '--delay': `${index * 80}ms`}} />)}</div></article>
      </div>
    </div>
  )
}

function Hero() {
  const moveLight = (event) => {
    const rect = event.currentTarget.getBoundingClientRect()
    event.currentTarget.style.setProperty('--pointer-x', `${event.clientX - rect.left}px`)
    event.currentTarget.style.setProperty('--pointer-y', `${event.clientY - rect.top}px`)
  }
  return (
    <main className="hero" id="top" onPointerMove={moveLight}>
      <Header />
      <div className="hero-ambient" aria-hidden="true" />
      <div className="hero-shell">
        <div className="hero-copy">
          <h1><span>Run the whole</span><span>business.</span><span>In one <em>flow.</em></span></h1>
          <p>Finance, sales, stock and operations—finally moving as one.</p>
          <div className="hero-actions"><a className="button button--solid" href="#early-access">Start free <ArrowRight /></a><a className="button button--outline" href="#platform"><Play /> See it in motion</a></div>
        </div>
        <HeroDashboard />
      </div>
      <div className="scroll-cue" aria-hidden="true"><span>Scroll to follow the flow</span><i /></div>
    </main>
  )
}

function FlowCard({ step, index, active, onSelect }) {
  const Icon = step.icon
  return (
    <article className={`flow-card flow-card--${index} ${active ? 'is-active' : ''}`}>
      <button type="button" className="flow-card-trigger" aria-label={`Show ${step.name} details`} onClick={onSelect}><Icon /><span>{index < 3 ? 'Open' : 'Balanced'}</span></button>
      <div className="flow-card-head"><div><small>0{index + 1}</small><h3>{step.label}</h3></div><span>{index === 0 ? 'Draft' : index === 1 ? 'Reserved' : index === 2 ? 'Ready' : 'Live'}</span></div>
      {index === 0 ? <div className="order-content"><dl><div><dt>Customer</dt><dd>Atlas Retail</dd></div><div><dt>Date</dt><dd>28 Aug</dd></div><div><dt>Total</dt><dd>12,450 MAD</dd></div></dl><div className="tiny-table"><div><b>Agent 71 platform</b><span>9,000</span></div><div><b>Implementation</b><span>2,000</span></div><div><b>Support</b><span>1,450</span></div></div><button type="button" onClick={onSelect}>Confirm order <ArrowRight /></button></div> : null}
      {index === 1 ? <div className="stock-content">{['Agent 71 platform','Implementation','Support'].map((item, itemIndex) => <div key={item}><span><Box /><b>{item}</b></span><small>{itemIndex + 1} / {itemIndex + 1}</small><i /></div>)}</div> : null}
      {index === 2 ? <div className="invoice-content"><div className="invoice-brand"><Brand /><span>INV-071</span></div><div className="invoice-amount"><small>Amount due</small><strong>12,450 <em>MAD</em></strong></div><button type="button" onClick={onSelect}>Send invoice <Send /></button></div> : null}
      {index === 3 ? <div className="ledger-content"><div className="ledger-balance"><CheckCircle2 /><span><small>Reconciliation</small><strong>Balanced</strong></span></div>{ledgerRows.map(([label,value]) => <div className="ledger-row" key={label}><span>{label}</span><b>{value}</b><Check /></div>)}</div> : null}
      <div className="flow-card-foot"><span>{step.detail}</span><strong>{step.meta}</strong></div>
    </article>
  )
}

function FlowSection() {
  const [active, setActive] = useState(0)
  return (
    <section className="flow-section" id="platform">
      <Reveal className="section-shell">
        <div className="flow-heading"><h2>One action.<br />Every record.</h2><p>Sell once. Agent 71 handles the rest.</p></div>
        <nav className="flow-nav" aria-label="Transaction flow">
          {flowSteps.map((step, index) => { const Icon = step.icon; return <button className={index === active ? 'is-active' : index < active ? 'is-complete' : ''} type="button" key={step.name} onClick={() => setActive(index)}><small>0{index + 1}</small><span><Icon /></span><strong>{step.name}</strong></button> })}
        </nav>
        <div className="flow-stage" style={{'--active-step': active}}>
          <div className="flow-beam" aria-hidden="true"><i /></div>
          {flowSteps.map((step, index) => <FlowCard key={step.name} step={step} index={index} active={index === active} onSelect={() => setActive(index)} />)}
        </div>
      </Reveal>
    </section>
  )
}

function InvoiceVisual() {
  const [sent, setSent] = useState(false)
  return (
    <div className={`invoice-visual ${sent ? 'is-sent' : ''}`}>
      <svg className="orbit" viewBox="0 0 720 470" aria-hidden="true"><path d="M36 388C166 463 305 402 388 288S548 62 690 94" /><circle cx="36" cy="388" r="5" /><circle cx="388" cy="288" r="5" /><circle cx="690" cy="94" r="5" /></svg>
      <article className="digital-invoice">
        <div className="invoice-top"><Brand inverse /><span><strong>INVOICE</strong><small>INV-000125</small></span></div>
        <div className="invoice-total"><small>Amount</small><strong>8,400 <em>MAD</em></strong></div>
        <div className="invoice-lines"><i /><i /><i /><i /><i /></div>
        <button type="button" onClick={() => setSent((value) => !value)}>{sent ? <CheckCircle2 /> : <Send />}<span><small>Status</small><strong>{sent ? 'Transmitted successfully' : 'Ready to transmit'}</strong></span></button>
      </article>
      <div className="transmission-node"><Check /></div>
    </div>
  )
}

function ReadinessSection() {
  return (
    <section className="readiness" id="why-agent-71">
      <Reveal className="section-shell readiness-shell">
        <div className="readiness-copy"><h2>Ready for Morocco’s<br />e-invoicing shift.</h2><p>Structured. Connected. Adaptable.</p></div>
        <InvoiceVisual />
      </Reveal>
    </section>
  )
}

function PricingRail({ title, icon: Icon, copy, primary = false }) {
  return <a className={`pricing-rail ${primary ? 'pricing-rail--primary' : ''}`} href="#early-access"><span><Icon /></span><div><strong>{title}</strong><small>{copy}</small></div><ArrowRight /></a>
}

function PricingSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const submit = (event) => { event.preventDefault(); setSubmitted(true) }
  return (
    <section className="pricing" id="pricing">
      <Reveal className="section-shell pricing-shell">
        <div className="pricing-heading"><h2>Start free. <span>Scale without limits.</span></h2></div>
        <div className="pricing-content" id="early-access">
          {submitted ? <div className="signup-success" role="status"><CheckCircle2 /><span><strong>You’re in.</strong><small>Early-access updates will go to {email}.</small></span></div> : <form onSubmit={submit}><label className="sr-only" htmlFor="email">Work email</label><div><FileText /><input id="email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Work email" /></div><button type="submit">Join early access <ArrowRight /></button></form>}
          <div className="pricing-rails"><PricingRail title="Free" copy="The essentials for your first team" icon={Box} primary /><PricingRail title="Scale" copy="Advanced control for growing operations" icon={Layers3} /></div>
        </div>
      </Reveal>
    </section>
  )
}

function Footer() {
  return <footer className="site-footer"><div className="section-shell"><Brand /><span>Built by Hikari Tech</span><nav aria-label="Footer navigation"><a href="#platform">Platform</a><a href="#why-agent-71">E-invoicing</a><a href="#pricing">Pricing</a></nav></div></footer>
}

export default function App() { return <><Hero /><FlowSection /><ReadinessSection /><PricingSection /><Footer /></> }
