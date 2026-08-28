import { useState } from 'react'
import {
  ArrowDown,
  ArrowRight,
  BarChart3,
  Box,
  Check,
  FileCheck2,
  FileText,
  Link2,
  Menu,
  Package,
  Send,
  ShoppingCart,
  TrendingUp,
  Users,
  WalletCards,
  X,
} from 'lucide-react'

const modules = [
  { name: 'Finance', icon: WalletCards, description: 'Close the books with every source record already attached.' },
  { name: 'Sales', icon: TrendingUp, description: 'Move from quote to cash without copying a single row.' },
  { name: 'Inventory', icon: Box, description: 'Know what is available, committed and moving in real time.' },
  { name: 'Purchasing', icon: ShoppingCart, description: 'Bring suppliers, approvals and costs into one clear flow.' },
  { name: 'People', icon: Users, description: 'Give every team the context they need without exposing the noise.' },
]

const transactions = [
  ['INV-71-0048', 'Atlas Atelier', '12,800 MAD', 'Paid'],
  ['BILL-71-0183', 'Northstar Supply', '8,450 MAD', 'Paid'],
  ['PAY-71-0126', 'Studio Naya', '4,200 MAD', 'Pending'],
  ['INV-71-0049', 'Orion Foods', '21,350 MAD', 'Due'],
]

const workflow = ['Quote', 'Order', 'Invoice', 'Payment', 'Ledger']

function Brand({ inverse = false }) {
  return (
    <a className={`brand ${inverse ? 'brand--inverse' : ''}`} href="#top" aria-label="Agent 71 home">
      <span>Agent</span><strong>71</strong>
    </a>
  )
}

function Header() {
  const [open, setOpen] = useState(false)

  const close = () => setOpen(false)
  return (
    <header className="header">
      <Brand />
      <button
        className="menu-button"
        type="button"
        aria-label={open ? 'Close navigation' : 'Open navigation'}
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>
      <nav className={`nav ${open ? 'nav--open' : ''}`} aria-label="Main navigation">
        <a href="#product" onClick={close}>Product</a>
        <a href="#pricing" onClick={close}>Pricing</a>
        <a href="#e-invoicing" onClick={close}>E-invoicing</a>
        <a href="#company" onClick={close}>Company</a>
      </nav>
      <a className="launch-note" href="#pricing">
        <span aria-hidden="true" />Launching soon
      </a>
    </header>
  )
}

function MiniChart({ bars = false }) {
  if (bars) {
    return (
      <div className="mini-bars" aria-hidden="true">
        {[42, 68, 54, 86, 61, 92, 75, 100].map((height, index) => (
          <i key={height + index} style={{ height: `${height}%` }} />
        ))}
      </div>
    )
  }

  return (
    <svg className="spark" viewBox="0 0 120 28" aria-hidden="true">
      <path d="M1 23C12 22 13 11 24 16S38 21 45 12s16 8 21 2 12-7 18 0 12 10 18 1 12 3 17-3" />
    </svg>
  )
}

function DashboardPreview() {
  return (
    <div className="dashboard-wrap" aria-label="Interactive Agent 71 financial overview preview">
      <div className="hero-seventy-one" aria-hidden="true">71</div>
      <div className="dashboard">
        <aside className="dash-sidebar">
          <Brand />
          <div className="dash-nav">
            <button className="is-active" type="button"><BarChart3 />Overview</button>
            <button type="button"><FileText />Transactions</button>
            <button type="button"><FileCheck2 />Invoicing</button>
            <button type="button"><Package />Inventory</button>
          </div>
          <div className="dash-user"><span>A7</span><small>Hikari Labs</small></div>
        </aside>
        <div className="dash-main">
          <div className="dash-topline">
            <div><small>Workspace</small><strong>Financial overview</strong></div>
            <button type="button">+ New</button>
          </div>
          <div className="metric-row">
            <article><small>Revenue</small><strong>284,200</strong><em>+14.6%</em><MiniChart /></article>
            <article><small>Net profit</small><strong>38,420</strong><em>+9.8%</em><MiniChart /></article>
            <article><small>Cash balance</small><strong>112,400</strong><em>+7.2%</em><MiniChart /></article>
          </div>
          <div className="dash-grid">
            <section className="transaction-panel">
              <div className="panel-heading"><strong>Recent transactions</strong><button type="button">View all</button></div>
              {transactions.map(([id, company, amount, status]) => (
                <div className="transaction" key={id}>
                  <span className="file-dot"><FileText /></span>
                  <span><strong>{company}</strong><small>{id}</small></span>
                  <b>{amount}</b>
                  <em className={`status status--${status.toLowerCase()}`}>{status}</em>
                </div>
              ))}
            </section>
            <section className="flow-panel">
              <div className="panel-heading"><strong>Cash flow</strong><small>This month</small></div>
              <div className="flow-number">+28,450 <small>MAD</small></div>
              <MiniChart bars />
              <div className="flow-legend"><span>Inflow</span><span>Outflow</span></div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}

function Hero() {
  return (
    <main id="top">
      <Header />
      <section className="hero page-shell">
        <div className="hero-copy">
          <h1>Run the whole business. <span>Not the spreadsheet.</span></h1>
          <p>A modern ERP for every invoice, transaction and decision—free to start, ready to scale.</p>
          <div className="hero-actions">
            <a className="button button--primary" href="#pricing">Join early access <ArrowRight /></a>
            <a className="text-link" href="#product">See what’s inside <ArrowDown /></a>
          </div>
        </div>
        <DashboardPreview />
        <div className="hero-foot"><span>by <strong>Hikari Tech</strong></span><i /></div>
      </section>
    </main>
  )
}

function InvoicePanel({ activeModule }) {
  return (
    <div className="invoice-panel">
      <div className="invoice-rail">
        <span>71</span>
        <button className="is-active" type="button"><FileText />Flow</button>
        <button type="button"><BarChart3 />Report</button>
        <button type="button"><Users />People</button>
      </div>
      <div className="invoice-body">
        <div className="invoice-title">
          <div><small>{activeModule.toUpperCase()}</small><strong>INV-2026-0071</strong></div>
          <button type="button">Record payment</button>
        </div>
        <dl className="invoice-meta">
          <div><dt>Customer</dt><dd>Summit Industries</dd></div>
          <div><dt>Invoice date</dt><dd>28 Aug, 2026</dd></div>
          <div><dt>Status</dt><dd><span>Posted</span></dd></div>
        </dl>
        <div className="invoice-table">
          <div className="invoice-row invoice-row--head"><span>Description</span><span>Qty</span><span>Amount</span></div>
          <div className="invoice-row"><span>Operations platform</span><span>1</span><span>2,900.00</span></div>
          <div className="invoice-row"><span>Team workspace</span><span>12</span><span>1,200.00</span></div>
          <div className="invoice-row invoice-row--total"><span>Total</span><span /><span>4,100.00 MAD</span></div>
        </div>
      </div>
      <aside className="invoice-progress">
        <small>Workflow</small>
        {['Quote created', 'Order confirmed', 'Invoice posted', 'Payment received'].map((item, index) => (
          <div className={index < 3 ? 'is-done' : ''} key={item}>
            <i>{index < 3 ? <Check /> : null}</i><span>{item}<small>{index < 3 ? 'Complete' : 'Next'}</small></span>
          </div>
        ))}
      </aside>
    </div>
  )
}

function SystemSection() {
  const [activeModule, setActiveModule] = useState('Finance')

  return (
    <section className="system-section" id="product">
      <div className="page-shell">
        <div className="section-rule"><i /><span>The operating system</span></div>
        <div className="section-heading">
          <h2>One system.<br />Every transaction.</h2>
          <p>Finance, sales, purchasing, inventory and people—connected from day one.</p>
          <div className="section-seventy-one" aria-hidden="true">71</div>
        </div>
        <ol className="workflow">
          {workflow.map((item, index) => (
            <li className={index === 2 ? 'is-current' : ''} key={item}>
              <strong>0{index + 1}</strong><span>{item}</span><i />
            </li>
          ))}
        </ol>
        <div className="product-stage">
          <nav className="module-nav" aria-label="ERP modules">
            {modules.map(({ name, icon: Icon }) => (
              <button
                className={activeModule === name ? 'is-active' : ''}
                type="button"
                key={name}
                onClick={() => setActiveModule(name)}
              >
                <Icon />{name}
              </button>
            ))}
          </nav>
          <InvoicePanel activeModule={activeModule} />
        </div>
        <div className="motion-line">
          <ArrowRight /><p>{modules.find(({ name }) => name === activeModule)?.description}</p>
        </div>
      </div>
    </section>
  )
}

function EInvoiceSection() {
  return (
    <section className="einvoice-section" id="e-invoicing">
      <div className="page-shell einvoice-grid">
        <div className="einvoice-copy">
          <h2>Morocco is going electronic. <span>You’ll be ready.</span></h2>
          <p>Agent 71 is being designed to support Morocco’s 2026 e-invoicing rollout—from structured invoices to connected records and cleaner reporting.</p>
          <ul>
            <li><FileText /><strong>Create structured invoices</strong></li>
            <li><Link2 /><strong>Keep every record connected</strong></li>
            <li><TrendingUp /><strong>Adapt as requirements evolve</strong></li>
          </ul>
        </div>
        <div className="document-flow" aria-label="Electronic invoice preparation flow">
          <article className="invoice-document">
            <div className="doc-head"><Brand /><small>INV-2026-0071<br />Aug 28, 2026</small></div>
            <h3>INVOICE</h3>
            <div className="doc-recipient"><small>Bill to</small><strong>Client Company</strong><span>Casablanca, Morocco</span></div>
            <div className="doc-lines">
              <div><span>Operations platform</span><b>5,000.00</b></div>
              <div><span>Team workspace</span><b>3,000.00</b></div>
              <div><span>Implementation</span><b>2,000.00</b></div>
            </div>
            <div className="doc-total"><span>Total</span><strong>12,000.00 MAD</strong></div>
            <div className="doc-note"><FileCheck2 /><span>Designed to support Morocco’s 2026 e-invoicing transition.</span></div>
          </article>
          <ol className="transmission">
            <li><i><FileText /></i><span><strong>Created</strong><small>Structured invoice generated</small></span></li>
            <li><i><Link2 /></i><span><strong>Connected</strong><small>Records linked across the business</small></span></li>
            <li><i><Send /></i><span><strong>Ready</strong><small>Prepared to adapt as requirements evolve</small></span></li>
          </ol>
        </div>
      </div>
    </section>
  )
}

function EarlyAccess() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const submit = (event) => {
    event.preventDefault()
    if (!event.currentTarget.checkValidity()) return
    setSubmitted(true)
  }

  return (
    <section className="early-access page-shell" id="pricing">
      <div className="early-inner">
        <div className="early-copy">
          <h2>Start free. Scale when it pays<span>.</span></h2>
          <p>A modern ERP should earn its place in your business.</p>
        </div>
        {submitted ? (
          <div className="success-message" role="status"><Check /><span><strong>You’re on the list.</strong> We’ll contact you at {email}.</span></div>
        ) : (
          <form onSubmit={submit}>
            <label className="sr-only" htmlFor="email">Work email</label>
            <input
              id="email"
              type="email"
              required
              placeholder="Work email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit">Join early access <ArrowRight /></button>
            <small>No credit card. No legacy setup.</small>
          </form>
        )}
        <div className="early-seventy-one" aria-hidden="true">71</div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="footer page-shell" id="company">
      <div><Brand /><small>Built by Hikari Tech</small></div>
      <nav aria-label="Footer navigation">
        <a href="#product">Product</a>
        <a href="#pricing">Pricing</a>
        <a href="#e-invoicing">E-invoicing</a>
        <a href="#company">Privacy</a>
        <a href="#company">LinkedIn</a>
      </nav>
      <small>© 2026 Hikari Tech</small>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Hero />
      <SystemSection />
      <EInvoiceSection />
      <EarlyAccess />
      <Footer />
    </>
  )
}
