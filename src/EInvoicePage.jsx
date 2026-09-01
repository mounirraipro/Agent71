import {
  ArrowRight, Building2, Check, CircleHelp, Database, FileCheck2,
  FileText, Landmark, LockKeyhole, RefreshCw, Send, ShieldCheck,
} from 'lucide-react'
import { useRef } from 'react'
import BanknoteArt from './BanknoteArt'
import { DevelopmentCTA, InfoFooter, InfoHeader } from './InfoPageChrome'
import { usePageMotion } from './usePageMotion'

const changes = [
  [Database, 'Structured at the source', 'Invoice data needs to be consistent and machine-readable, not trapped inside manually prepared documents.'],
  [Send, 'Connected to the process', 'Issuing, receiving, correcting, and tracking invoices should become a controlled workflow instead of an email trail.'],
  [ShieldCheck, 'Traceable by design', 'Identity, integrity, timestamps, statuses, and changes need a reliable history that finance teams can explain.'],
]

const prepare = [
  ['Clean your identifiers', 'Review ICE, IF, RC, legal names, addresses, and customer master data.'],
  ['Standardize invoice data', 'Use continuous numbering, clear product and service descriptions, tax rates, dates, and payment terms.'],
  ['Map the real workflow', 'Document who creates, checks, approves, corrects, sends, receives, and reconciles each invoice.'],
  ['Protect the audit trail', 'Avoid deleting issued documents. Use traceable corrections, credit notes, permissions, and event history.'],
  ['Keep your system adaptable', 'Choose tools that can support structured exports and future integration once final specifications apply to you.'],
]

const sources = [
  ['General Tax Code 2026', 'Official DGI document referenced by the 2026 CGI publication.', 'https://www.tax.gov.ma/wps/wcm/connect/08712531-1e81-4e28-a38b-2bd9edf8e09e/CGI%2B2026%2BFR.pdf'],
  ['2026 CGI publication notice', 'Official Moroccan public-service announcement dated 31 December 2025.', 'https://www.maroc.ma/fr/actualites/la-dgi-publie-ledition-2026-du-code-general-des-impots'],
  ['Law 43-20', 'Official DGSSI text governing trust services for electronic transactions.', 'https://www.dgssi.gov.ma/sites/default/files/legislative/brochure/2023-03/loi%2043-20.pdf'],
  ['DGI portal', 'The tax administration portal for official notices, guidance, and future updates.', 'https://www.tax.gov.ma/'],
]

function ReadinessFlow() {
  return <div className="readiness-flow" aria-label="Illustrative future-ready invoicing workflow">
    <div className="readiness-window-top"><span><i />Agent 71 invoice flow</span><small>Designed to adapt</small></div>
    <div className="readiness-document"><div><FileText /><span><b>Invoice INV-2026-00237</b><small>Atlas Trading SARL · MAD</small></span></div><strong>26,820.00</strong></div>
    <div className="readiness-route"><span><Building2 />Business record</span><ArrowRight /><span><FileCheck2 />Validation layer</span><ArrowRight /><span><Landmark />Required channel</span></div>
    <div className="readiness-status"><span><Check />Complete identifiers</span><span><Check />Traceable status</span><span><RefreshCw />Adaptable mapping</span></div>
    <p>Illustrative product direction. Final regulatory integration will follow the specifications applicable at launch.</p>
  </div>
}

export default function EInvoicePage() {
  const pageRef = useRef(null)
  usePageMotion(pageRef, 'einvoice')
  return <div className="info-page einvoice-page" ref={pageRef}>
    <InfoHeader />
    <main>
      <section className="einvoice-page-hero">
        <BanknoteArt variant="sahara" className="info-hero-art" />
        <div className="einvoice-hero-copy"><h1>Morocco is changing<br />how invoices <em>move.</em></h1><p>Agent 71 is being designed to keep invoice data clean, connected, and ready to adapt as Morocco’s electronic-invoicing framework becomes operational.</p><div><a className="start-primary" href="#prepare">Prepare your business <ArrowRight /></a><a className="start-secondary" href="#framework">Understand the framework</a></div><small>Updated 1 September 2026 · General information, not tax or legal advice.</small></div>
        <ReadinessFlow />
      </section>

      <section className="einvoice-change" id="framework" data-motion="section"><header data-motion="heading"><h2>More than a PDF.</h2><p>The practical shift is from a document people read to data that systems can also process, verify, and track.</p></header><div>{changes.map(([Icon,title,copy],index)=><article key={title} data-motion-card><span>{String(index+1).padStart(2,'0')}</span><Icon /><h3>{title}</h3><p>{copy}</p></article>)}</div></section>

      <section className="einvoice-state" data-motion="section">
        <img className="einvoice-state-art" src="/art/einvoice-clarity-landscape.png" alt="Illustrated transition from established records to an evolving digital invoicing landscape" width="2172" height="724" decoding="async" data-parallax />
        <div className="einvoice-state-content">
          <div className="einvoice-state-heading" data-motion="heading"><h2>What is clear.<br /><em>What is still moving.</em></h2><p>We separate published legal foundations from implementation details that businesses should continue to verify.</p></div>
          <div className="state-columns">
            <article className="state-known" data-motion-card><header><Check />Established foundation</header><ul><li>The 2026 General Tax Code is the current consolidated tax reference.</li><li>Article 145 includes the legal basis for invoicing systems that meet technical criteria set by the administration.</li><li>Existing invoice content and record-keeping duties continue to matter.</li><li>Law 43-20 provides the legal framework for electronic signatures, seals, timestamps, and trust services.</li></ul></article>
            <article className="state-pending" data-motion-card><header><CircleHelp />Confirm before acting</header><ul><li>The precise date your business becomes subject to the operational regime.</li><li>The final technical schema, transmission, validation, and acknowledgement rules.</li><li>Registration, provider, certificate, testing, and onboarding procedures.</li><li>Any rollout-specific sanctions, exceptions, or transition arrangements.</li></ul></article>
          </div>
        </div>
      </section>

      <section className="einvoice-prepare" id="prepare" data-horizontal-section>
        <div className="prepare-pin" data-horizontal-pin>
          <img className="prepare-art" src="/art/einvoice-prepare-modules.png" alt="Five illustrated modules for preparing business invoice operations" width="1728" height="960" decoding="async" />
          <header data-motion="heading"><span>Preparation, in five moves</span><h2>Control what you can.<br /><em>Stay ready for what changes.</em></h2><p>You do not need to guess the final specification to improve the quality of your data and process.</p></header>
          <div className="prepare-viewport" data-horizontal-viewport>
            <ol className="prepare-track" data-horizontal-track>{prepare.map(([title,copy],index)=><li key={title} data-prepare-card><span>{String(index+1).padStart(2,'0')}</span><div><h3>{title}</h3><p>{copy}</p></div><i aria-hidden="true" /></li>)}</ol>
          </div>
          <div className="prepare-progress" aria-hidden="true"><span>01</span><i /><span>05</span><small>Scroll to explore</small></div>
        </div>
      </section>

      <section className="einvoice-agent" data-motion="section"><img className="einvoice-agent-background" src="/art/einvoice-integration-corridor.png" alt="Illustrated record corridor connecting Moroccan businesses to a trusted digital gateway" width="1776" height="895" decoding="async" data-parallax /><div className="einvoice-agent-copy" data-motion="heading"><span><LockKeyhole />Built to adapt</span><h2>How Agent 71 is being built for the shift.</h2><p>Structured source records, configurable invoice fields, controlled corrections, status history, role-based approvals, and an integration layer that can evolve when the final rules are published.</p><a href="mailto:contact@hikaritech.ma">Discuss your invoicing workflow <ArrowRight /></a></div></section>

      <section className="einvoice-sources" data-motion="section"><header data-motion="heading"><h2>Official references.</h2><p>Regulatory guidance changes. Verify your situation with the DGI and a qualified adviser.</p></header><div>{sources.map(([title,copy,href])=><a href={href} target="_blank" rel="noreferrer" key={title} data-motion-card><strong>{title}</strong><span>{copy}</span><ArrowRight /></a>)}</div></section>
      <DevelopmentCTA />
    </main>
    <InfoFooter />
  </div>
}
