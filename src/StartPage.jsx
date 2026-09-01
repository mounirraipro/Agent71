import { useState } from 'react'
import {
  ArrowLeft, ArrowRight, BarChart3, Boxes, BriefcaseBusiness, Building2,
  Check, Factory, FileText, Landmark, Layers3, Network, ScanLine,
  ShoppingCart, Sparkles, Users, WalletCards,
} from 'lucide-react'
import BanknoteArt from './BanknoteArt'
import { BrandLockup, LogoMark } from './BrandLogo'

const productAreas = [
  {
    label: 'Sell & serve',
    title: 'From first conversation to money in the bank.',
    summary: 'Keep the customer, quote, order, invoice, payment, and follow-up in one continuous record.',
    accent: 'purple',
    icon: ShoppingCart,
    modules: [
      { icon: FileText, title: 'Sales & invoicing', features: ['Quotes', 'Invoices', 'Credit notes', 'Recurring billing', 'Payments', 'Customer statements'] },
      { icon: Users, title: 'CRM & customers', features: ['Leads', 'Pipeline', 'Follow-ups', 'Contracts', 'Loyalty', 'Customer portal'] },
      { icon: ShoppingCart, title: 'Point of sale & commerce', features: ['Cloud POS', 'Offline sales', 'Returns', 'Multi-store pricing', 'Online payments'] },
    ],
  },
  {
    label: 'Control finance',
    title: 'A financial record built as the business moves.',
    summary: 'Operational activity becomes structured accounting, so finance can close faster and explain every number.',
    accent: 'orange',
    icon: Landmark,
    modules: [
      { icon: Landmark, title: 'Accounting & finance', features: ['Chart of accounts', 'Journals', 'Cost centers', 'Assets', 'Bank accounts', 'Tax reports'] },
      { icon: BarChart3, title: 'Reporting & intelligence', features: ['Live dashboards', 'Financial statements', 'Sales analysis', 'Audit trails', 'Custom exports'] },
    ],
  },
  {
    label: 'Move goods',
    title: 'Know what is available, committed, and coming next.',
    summary: 'Connect purchasing, warehouses, planning, and production without losing the financial impact of each move.',
    accent: 'green',
    icon: Boxes,
    modules: [
      { icon: Boxes, title: 'Inventory & purchasing', features: ['Products & barcodes', 'Warehouses', 'Transfers', 'Reorder rules', 'Purchase orders', 'Valuation'] },
      { icon: Factory, title: 'Manufacturing', features: ['Bills of materials', 'Work centers', 'Material planning', 'Quality', 'Maintenance', 'Production costing'] },
    ],
  },
  {
    label: 'Run the team',
    title: 'Give work an owner, a deadline, and a cost.',
    summary: 'Bring people records and day-to-day delivery together, from attendance to projects and field operations.',
    accent: 'brown',
    icon: BriefcaseBusiness,
    modules: [
      { icon: BriefcaseBusiness, title: 'People & payroll', features: ['Employee records', 'Contracts', 'Attendance', 'Leave', 'Payroll', 'Requests'] },
      { icon: Layers3, title: 'Operations & projects', features: ['Projects', 'Tasks', 'Work orders', 'Time tracking', 'Bookings', 'Profitability'] },
    ],
  },
  {
    label: 'Connect it all',
    title: 'One platform that can grow without starting over.',
    summary: 'A modular foundation for companies, branches, languages, permissions, automations, and external systems.',
    accent: 'blue',
    icon: Network,
    modules: [
      { icon: Network, title: 'Platform & integrations', features: ['Role-based access', 'Multi-company', 'Arabic, French & English', 'APIs', 'Mobile access', 'Automations'] },
      { icon: ScanLine, title: 'Morocco-ready foundation', features: ['MAD transactions', 'VAT handling', 'Local identifiers', 'Traceable journals', 'E-invoicing adaptability'] },
    ],
  },
]

const localCapabilities = [
  [ScanLine, 'Morocco e-invoicing', 'Structured invoice preparation, validation-ready records, and a workflow designed to adapt as the national framework is finalized.'],
  [WalletCards, 'Moroccan finance', 'MAD-first transactions, VAT handling, traceable journals, and documents suited to local business operations.'],
  [Building2, 'Built for every stage', 'Start with the modules you need, then add teams, branches, and deeper operational capabilities as the business grows.'],
]

function HeroFlow() {
  const flows = [
    [ShoppingCart, 'Sell', 'Quote', 'Invoice', 'Collect'],
    [Boxes, 'Stock', 'Reserve', 'Move', 'Reorder'],
    [Landmark, 'Finance', 'Post', 'Reconcile', 'Report'],
  ]
  return (
    <div className="start-hero-console" aria-label="Connected Agent 71 workflows">
      <div className="console-top"><span><Sparkles />Agent 71 workspace</span><small>Connected by design</small></div>
      <div className="console-core"><LogoMark /><div><strong>One source of truth</strong><span>Every action updates the next team.</span></div><i>Live</i></div>
      <div className="console-flows">
        {flows.map(([Icon, name, ...steps], index) => (
          <div className="console-flow" key={name} style={{ '--flow-delay': `${index * 120}ms` }}>
            <span className="console-flow-name"><Icon />{name}</span>
            {steps.map((step) => <span className="console-step" key={step}>{step}<Check /></span>)}
          </div>
        ))}
      </div>
      <div className="console-foot"><span><i />Records stay connected</span><span>Sales · Finance · Stock · People</span></div>
    </div>
  )
}

function ProductExplorer() {
  const [activeIndex, setActiveIndex] = useState(0)
  const active = productAreas[activeIndex]
  const ActiveIcon = active.icon
  return (
    <div className={`product-explorer product-explorer--${active.accent}`}>
      <nav className="product-index" aria-label="Product areas">
        {productAreas.map((area, index) => {
          const Icon = area.icon
          const selected = index === activeIndex
          return <button type="button" className={selected ? 'is-active' : ''} aria-pressed={selected} onClick={() => setActiveIndex(index)} key={area.label}><small>{String(index + 1).padStart(2, '0')}</small><Icon /><span>{area.label}</span><ArrowRight /></button>
        })}
      </nav>
      <article className="product-stage" key={active.label}>
        <header className="product-stage-head"><span><ActiveIcon /></span><div><h3>{active.title}</h3><p>{active.summary}</p></div></header>
        <div className="product-module-list">
          {active.modules.map((module) => {
            const Icon = module.icon
            return <section className="product-module" key={module.title}><div><Icon /><h4>{module.title}</h4></div><ul>{module.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></section>
          })}
        </div>
        <footer><span><i />Representative product direction</span><p>Availability and timing will be announced as Agent 71 develops.</p></footer>
      </article>
    </div>
  )
}

export default function StartPage() {
  return (
    <div className="start-page">
      <header className="start-header">
        <a className="start-back" href="/"><ArrowLeft /><span>Back to Agent 71</span></a>
        <a className="start-wordmark" href="/" aria-label="Agent 71 home"><BrandLockup /></a>
        <a className="start-contact-link" href="mailto:contact@hikaritech.ma">Contact us</a>
      </header>
      <main>
        <section className="start-hero">
          <BanknoteArt variant="city" className="currency-art--start-hero" />
          <div className="start-hero-copy">
            <h1>Your whole business.<br /><em>One living system.</em></h1>
            <p>Agent 71 connects the work your teams do with the records your business needs—without the spreadsheet handoffs or legacy ERP weight.</p>
            <div><a className="start-primary" href="#modules">Explore the system <ArrowRight /></a><a className="start-secondary" href="mailto:contact@hikaritech.ma">contact@hikaritech.ma</a></div>
          </div>
          <HeroFlow />
        </section>

        <section className="scope-section" id="modules">
          <BanknoteArt variant="rural" className="currency-art--scope" />
          <div className="scope-heading"><div><h2>Explore the system.</h2><p>Five connected areas. One operational record.</p></div><aside>Choose an area to see how Agent 71 is being shaped around the way modern businesses sell, move, account, and grow.</aside></div>
          <ProductExplorer />
        </section>

        <section className="local-section">
          <BanknoteArt variant="sahara" className="currency-art--local" />
          <div className="local-heading"><h2>Global ERP thinking.<br /><em>Built for Morocco.</em></h2><p>Agent 71 pairs broad operational capability with the localization Moroccan businesses actually need.</p></div>
          <div className="local-list">{localCapabilities.map(([Icon, title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        </section>

        <section className="start-final">
          <BanknoteArt variant="sea" className="currency-art--start-final" />
          <p>Agent 71 is in development.</p>
          <h2>Tell us what your<br />business needs.</h2>
          <a href="mailto:contact@hikaritech.ma">contact@hikaritech.ma <ArrowRight /></a>
        </section>
      </main>
      <footer className="start-footer"><a href="/" aria-label="Agent 71 home"><BrandLockup /></a><span>Built by <a className="start-hikari-link" href="https://hikaritech.ma" target="_blank" rel="noreferrer">HikariTech</a> · Casablanca · 2026</span></footer>
    </div>
  )
}
