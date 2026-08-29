import {
  ArrowLeft, ArrowRight, BarChart3, Boxes, BriefcaseBusiness, Building2,
  Factory, FileText, Landmark, Layers3, Network, ScanLine, ShoppingCart,
  Users, WalletCards,
} from 'lucide-react'

const modules = [
  {
    icon: FileText,
    title: 'Sales & invoicing',
    summary: 'Take a sale from first quote to final payment without rebuilding the record.',
    features: ['Quotes and estimates', 'Invoices and credit notes', 'Recurring billing', 'Payment tracking', 'Price lists and discounts', 'Targets and commissions', 'Installment schedules', 'Customer statements'],
    phase: 'Initial scope',
  },
  {
    icon: Landmark,
    title: 'Accounting & finance',
    summary: 'Keep every operational event connected to a clean, auditable financial record.',
    features: ['Chart of accounts', 'General ledger and journals', 'Automatic journal entries', 'Expenses and income', 'Cost centers', 'Assets and depreciation', 'Cash and bank accounts', 'Tax and financial reports'],
    phase: 'Initial scope',
  },
  {
    icon: Boxes,
    title: 'Inventory & purchasing',
    summary: 'Know what you have, where it is, what is reserved, and what needs to be ordered.',
    features: ['Products, units and barcodes', 'Multiple warehouses', 'Stock moves and transfers', 'Stocktaking', 'Reorder rules and alerts', 'Suppliers and purchase orders', 'Purchase invoices', 'Inventory valuation'],
    phase: 'Initial scope',
  },
  {
    icon: Users,
    title: 'CRM & customers',
    summary: 'Give sales and service teams one shared history for every relationship.',
    features: ['Leads and opportunities', 'Pipeline management', 'Customer follow-up', 'Appointments and reminders', 'Contracts', 'Memberships', 'Loyalty points', 'Customer portal'],
    phase: 'Planned expansion',
  },
  {
    icon: BriefcaseBusiness,
    title: 'People & payroll',
    summary: 'Bring employee records, time, requests, and payroll into the same operating system.',
    features: ['Employee records', 'Organizational structure', 'Contracts', 'Attendance and shifts', 'Leave management', 'Payroll and payslips', 'Loans and advances', 'Employee requests'],
    phase: 'Planned expansion',
  },
  {
    icon: Layers3,
    title: 'Operations & projects',
    summary: 'Turn repeatable work into visible workflows with owners, time, and costs attached.',
    features: ['Projects and tasks', 'Work orders', 'Workflow builder', 'Time tracking', 'Bookings', 'Rental and unit management', 'Field operations', 'Project profitability'],
    phase: 'Planned expansion',
  },
  {
    icon: ShoppingCart,
    title: 'Point of sale & commerce',
    summary: 'Connect stores, counters, and online sales directly to stock and accounting.',
    features: ['Cloud point of sale', 'Offline selling', 'Barcode scanning', 'Cash sessions', 'Returns and refunds', 'Multi-store pricing', 'Online payments', 'E-commerce connections'],
    phase: 'Planned expansion',
  },
  {
    icon: Factory,
    title: 'Manufacturing',
    summary: 'Plan materials, production, capacity, and cost without a separate disconnected tool.',
    features: ['Bills of materials', 'Manufacturing orders', 'Work centers', 'Material planning', 'Quality checks', 'Maintenance', 'Production costing', 'Subcontracting'],
    phase: 'Future scope',
  },
  {
    icon: BarChart3,
    title: 'Reporting & intelligence',
    summary: 'See financial and operational performance without exporting everything to Excel.',
    features: ['Live dashboards', 'Financial statements', 'Sales analysis', 'Inventory reports', 'Supplier reports', 'HR metrics', 'Audit trails', 'Custom exports'],
    phase: 'Initial scope',
  },
  {
    icon: Network,
    title: 'Platform & integrations',
    summary: 'A modular foundation that can grow with each company, team, branch, and workflow.',
    features: ['Role-based access', 'Multi-company and branches', 'Arabic, French and English', 'APIs and webhooks', 'Mobile access', 'Document templates', 'Automated notifications', 'Third-party integrations'],
    phase: 'Ongoing',
  },
]

const localCapabilities = [
  [ScanLine, 'Morocco e-invoicing', 'Structured invoice preparation, validation-ready records, and a workflow designed to adapt as the national framework is finalized.'],
  [WalletCards, 'Moroccan finance', 'MAD-first transactions, VAT handling, traceable journals, and documents suited to local business operations.'],
  [Building2, 'Built for every stage', 'Start with the modules you need, then add teams, branches, and deeper operational capabilities as the business grows.'],
]

function ModuleCard({ module }) {
  const Icon = module.icon
  return (
    <article className="scope-card">
      <header><span><Icon /></span><small>{module.phase}</small></header>
      <h3>{module.title}</h3>
      <p>{module.summary}</p>
      <ul>{module.features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
    </article>
  )
}

export default function StartPage() {
  return (
    <div className="start-page">
      <header className="start-header">
        <a className="start-back" href="/"><ArrowLeft />Back to Agent 71</a>
        <a className="start-wordmark" href="/">Agent 71</a>
        <a className="start-contact-link" href="mailto:contact@hikaritech.ma">Contact us</a>
      </header>
      <main>
        <section className="start-hero">
          <div className="start-hero-copy">
            <h1>One system for every<br /><em>moving part.</em></h1>
            <p>Agent 71 is being built as a modular ERP for businesses that have outgrown spreadsheets—and do not want the cost or complexity of legacy software.</p>
            <div><a className="start-primary" href="#modules">Explore the product scope <ArrowRight /></a><a className="start-secondary" href="mailto:contact@hikaritech.ma">contact@hikaritech.ma</a></div>
          </div>
          <div className="start-hero-map" aria-label="Connected Agent 71 modules">
            <div className="map-core">71</div>
            <span className="map-node map-node--sales"><FileText />Sales</span>
            <span className="map-node map-node--finance"><Landmark />Finance</span>
            <span className="map-node map-node--stock"><Boxes />Stock</span>
            <span className="map-node map-node--people"><Users />People</span>
            <i className="map-line map-line--one" /><i className="map-line map-line--two" /><i className="map-line map-line--three" /><i className="map-line map-line--four" />
          </div>
        </section>

        <section className="scope-section" id="modules">
          <div className="scope-heading"><div><h2>The product scope.</h2><p>A connected set of modules, designed to work as one system.</p></div><aside>This is a representative roadmap, not an exhaustive feature list. Module availability and release timing will be announced as Agent 71 develops.</aside></div>
          <div className="scope-grid">{modules.map((module) => <ModuleCard module={module} key={module.title} />)}</div>
        </section>

        <section className="local-section">
          <div className="local-heading"><h2>Global ERP thinking.<br /><em>Built for Morocco.</em></h2><p>Agent 71 pairs broad operational capability with the localization Moroccan businesses actually need.</p></div>
          <div className="local-list">{localCapabilities.map(([Icon, title, description], index) => <article key={title}><span>{String(index + 1).padStart(2, '0')}</span><Icon /><div><h3>{title}</h3><p>{description}</p></div></article>)}</div>
        </section>

        <section className="start-final">
          <p>Agent 71 is in development.</p>
          <h2>Tell us what your<br />business needs.</h2>
          <a href="mailto:contact@hikaritech.ma">contact@hikaritech.ma <ArrowRight /></a>
        </section>
      </main>
      <footer className="start-footer"><a href="/">Agent 71</a><span>Built by Hikari Tech · Casablanca · 2026</span></footer>
    </div>
  )
}
