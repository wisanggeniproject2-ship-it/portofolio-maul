import { ArrowUpRight, Award } from 'lucide-react'
import Reveal from './Reveal'
import { asset } from '../utils/asset'
import { trackPointer } from '../utils/spotlight'

export const CERTIFICATE_BUTTON_LABEL = 'Lihat Sertifikat'

// A card dressed like a certificate: dashed inner frame, a seal and a light streak on hover.
// The button opens the PDF in a new tab.
export default function CertificateCard({ cert, index = 0, className = '' }) {
  return (
    <Reveal as="li" delay={index * 0.08} className={`h-full ${className}`}>
      <article
        onPointerMove={trackPointer}
        className="spotlight group relative h-full overflow-hidden rounded-2xl border border-line bg-card p-1.5 transition-transform duration-300 hover:-translate-y-1.5"
      >
        <div className="relative flex h-full flex-col overflow-hidden rounded-xl border border-dashed border-ice/20 bg-deep/70 p-6">
          <div aria-hidden="true" className="cert-pattern pointer-events-none absolute inset-0" />
          <span
            aria-hidden="true"
            className="sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/10 to-transparent"
          />

          <div className="relative">
            <span className="relative grid h-14 w-14 place-items-center rounded-full bg-linear-to-br from-electric to-primary text-white shadow-lg shadow-primary/30">
              <span
                aria-hidden="true"
                className="spin-around absolute inset-[-5px] rounded-full border border-dashed border-ice/50"
              />
              <Award size={26} aria-hidden="true" />
            </span>

            <h4 className="mt-5 text-lg font-semibold leading-snug text-ink">{cert.title}</h4>
            <p className="mt-1 text-sm font-medium text-soft">{cert.issuer}</p>
            {cert.date && <p className="mt-0.5 text-sm text-muted">{cert.date}</p>}
          </div>

          <div className="relative mt-auto pt-7">
            <a
              href={asset(cert.file)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${CERTIFICATE_BUTTON_LABEL}: ${cert.title} (membuka PDF di tab baru)`}
              className="inline-flex items-center gap-1.5 rounded-full border border-electric/40 bg-primary/15 px-5 py-2.5 text-sm font-semibold text-ice transition-colors duration-200 hover:bg-primary hover:text-white"
            >
              {CERTIFICATE_BUTTON_LABEL}
              <ArrowUpRight size={15} aria-hidden="true" />
            </a>
          </div>
        </div>
      </article>
    </Reveal>
  )
}
