import { ArrowRight, FileText, LockKeyhole } from 'lucide-react'
import { InfoFooter, InfoHeader } from './InfoPageChrome'

const termsSections = [
  ['Using this website', 'You may use this website to learn about Agent 71 and contact HikariTech. You must not misuse the website, attempt unauthorized access, interfere with its operation, introduce malicious code, or use its content unlawfully.'],
  ['Product status', 'Agent 71 is in development. Descriptions, screens, modules, availability, timing, pricing, and integrations are illustrative product direction and may change. Nothing on this website guarantees that a feature will be released on a particular date or in a particular form.'],
  ['No professional advice', 'Website content is general information. It is not accounting, tax, legal, regulatory, or other professional advice. You should obtain advice appropriate to your business before relying on information about compliance, including electronic invoicing.'],
  ['Intellectual property', 'The Agent 71 name, logo, interface, illustrations, copy, and other website materials belong to HikariTech or its licensors and are protected by applicable law. You may view them for ordinary business evaluation but may not reproduce or exploit them without permission.'],
  ['Third-party services and links', 'Links to government portals, social platforms, and other websites are provided for convenience. HikariTech does not control those services and is not responsible for their content, availability, security, or privacy practices.'],
  ['Availability and liability', 'We aim to keep the website accurate and available, but it is provided on an “as available” basis. To the extent permitted by applicable law, HikariTech is not liable for indirect or consequential loss arising from use of, or reliance on, this website. Nothing here excludes liability that cannot lawfully be excluded.'],
  ['Changes and governing law', 'We may update these terms as the website and Agent 71 evolve. The version shown here applies from its effective date. These terms are governed by the laws of Morocco, subject to any mandatory rights that apply to you.'],
  ['Contact', 'Questions about these terms can be sent to contact@hikaritech.ma. Commercial terms for the Agent 71 service will be provided separately before a customer subscribes or enters into a service agreement.'],
]

const privacySections = [
  ['Who is responsible', 'HikariTech is responsible for personal data described in this website notice. You can contact us at contact@hikaritech.ma. This notice covers the public Agent 71 website; a separate service privacy notice or data-processing agreement may apply when the product becomes available.'],
  ['Data we may receive', 'We may receive your name, work email, company, role, message, and any information you choose to provide when you contact us or register interest. Website infrastructure may also create technical records such as IP address, device, browser, requested pages, dates, and security events.'],
  ['Why we use it', 'We use data to answer enquiries, understand product interest, improve the website and Agent 71, protect the website, maintain business records, and send updates where you have asked to receive them. We use only data that is relevant to these purposes.'],
  ['How data is shared', 'Data may be handled by service providers that support hosting, communications, security, analytics, or business operations, under appropriate instructions and safeguards. We may also disclose information when required by law or necessary to protect rights, users, or systems. We do not sell personal data.'],
  ['International processing', 'Some service providers may process data outside Morocco. Where this occurs, HikariTech will assess and use the safeguards and formalities required by applicable Moroccan data-protection law, including CNDP requirements where relevant.'],
  ['Retention and security', 'We keep personal data only for as long as needed for the purpose collected, legal obligations, dispute handling, or legitimate business records. We use reasonable organizational and technical measures to protect data, although no internet service can guarantee absolute security.'],
  ['Your rights', 'Under Morocco’s Law 09-08, you may have rights to information, access, rectification, and opposition in the conditions provided by law. Send a request to contact@hikaritech.ma. You may also contact or submit a complaint to the CNDP.'],
  ['Cookies and updates', 'The website may use essential storage or similar technologies needed for operation and security. If non-essential analytics or marketing technologies are introduced, we will update the notice and provide choices where required. We may update this notice as the website, product, or legal requirements evolve.'],
]

const policies = {
  terms: { icon: FileText, title: 'Terms and conditions.', intro: 'Plain-language rules for using the Agent 71 website while the product is still in development.', sections: termsSections },
  privacy: { icon: LockKeyhole, title: 'Privacy policy.', intro: 'How HikariTech handles personal information connected with the public Agent 71 website.', sections: privacySections },
}

export default function LegalPage({ type }) {
  const policy = policies[type]
  const Icon = policy.icon
  return <div className="info-page legal-page"><InfoHeader /><main>
    <section className="legal-hero"><div><Icon /><h1>{policy.title}</h1><p>{policy.intro}</p><small>Effective 1 September 2026</small></div></section>
    <section className="legal-layout"><aside><strong>On this page</strong>{policy.sections.map(([title],index)=><a href={'#section-'+(index+1)} key={title}>{String(index+1).padStart(2,'0')} {title}</a>)}</aside><article>{policy.sections.map(([title,copy],index)=><section id={'section-'+(index+1)} key={title}><span>{String(index+1).padStart(2,'0')}</span><div><h2>{title}</h2><p>{copy}</p>{type==='privacy' && index===6 ? <a href="https://www.cndp.ma/personnes-concernees/" target="_blank" rel="noreferrer">Learn about your CNDP rights <ArrowRight /></a> : null}</div></section>)}</article></section>
    <section className="legal-contact"><h2>Still have a question?</h2><a href="mailto:contact@hikaritech.ma">contact@hikaritech.ma <ArrowRight /></a></section>
  </main><InfoFooter /></div>
}
