import { motion } from 'motion/react'
import { ArrowUpRight, Award, Briefcase, Check } from 'lucide-react'
import Badge from './Badge'
import CertificateCard, { CERTIFICATE_BUTTON_LABEL } from './CertificateCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { certificates, experience, profile } from '../data/profile'
import { projects } from '../data/projects'
import { asset } from '../utils/asset'
import { trackPointer } from '../utils/spotlight'

const ease = [0.22, 1, 0.36, 1]
const STAMP_TEXT = 'PRAKTIK KERJA LAPANGAN • PKL • '

// One experience as a folder: a tab on top, a sheet peeking out behind, a rotating stamp in the corner.
function Dossier({ item }) {
  const cert = certificates.find((c) => c.id === item.certificateId)
  const itemProjects = (item.projectIds ?? []).map((id) => projects.find((p) => p.id === id)).filter(Boolean)

  return (
    <div className="relative">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 top-9 translate-x-2 translate-y-2 rotate-[0.8deg] rounded-3xl border border-line bg-deep"
      />

      <span className="relative inline-flex items-center gap-2 rounded-t-xl border border-b-0 border-line bg-card px-4 py-2 text-sm font-semibold text-soft">
        <Briefcase size={15} aria-hidden="true" />
        Pengalaman
      </span>

      <div
        onPointerMove={trackPointer}
        className="spotlight relative -mt-px overflow-hidden rounded-b-3xl rounded-tr-3xl border border-line bg-card p-5 sm:p-7"
      >
        {/* Stamp */}
        <div
          aria-hidden="true"
          className="absolute right-4 top-4 hidden h-24 w-24 place-items-center text-soft/70 sm:grid"
        >
          <svg viewBox="0 0 120 120" className="spin-around absolute inset-0 h-full w-full">
            <defs>
              <path id="exp-stamp-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
            </defs>
            <text fontSize="10" fontWeight="700" fill="currentColor" textLength="272" lengthAdjust="spacing">
              <textPath href="#exp-stamp-circle">{STAMP_TEXT}</textPath>
            </text>
          </svg>
          <Briefcase size={22} className="relative" />
        </div>

        <h3 className="max-w-md pr-0 font-display text-xl font-extrabold leading-snug text-ink sm:pr-24 sm:text-2xl">
          {item.title}
        </h3>
        <p className="mt-1 text-base font-medium text-soft">{item.organization}</p>
        {item.period && <p className="mt-0.5 text-sm text-muted">{item.period}</p>}

        <ul className="mt-5 space-y-2.5">
          {item.points.map((point, i) => (
            <motion.li
              key={point}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '0px 0px -40px 0px' }}
              transition={{ duration: 0.4, delay: 0.08 + i * 0.08, ease }}
              className="flex gap-3 text-sm leading-relaxed text-muted sm:text-base"
            >
              <span aria-hidden="true" className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-primary/15 text-soft">
                <Check size={12} strokeWidth={3} />
              </span>
              {point}
            </motion.li>
          ))}
        </ul>

        <div className="mt-5">
          <p className="mb-2 text-xs font-semibold text-muted">Dibuat dengan</p>
          <ul className="flex flex-wrap gap-1.5">
            {item.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </ul>
        </div>

        {(itemProjects.length > 0 || cert) && (
          <div className="mt-6 flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-t border-dashed border-line pt-5">
            {itemProjects.length > 0 && (
              <div className="min-w-0">
                <p className="mb-2 text-xs font-semibold text-muted">Proyek dari PKL ini</p>
                <ul className="flex flex-wrap gap-2">
                  {itemProjects.map((project) => (
                    <li key={project.id}>
                      <a
                        href="#projects"
                        className="group/link inline-flex items-center gap-1 rounded-full border border-line bg-night/60 px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-200 hover:border-soft hover:text-ice"
                      >
                        {project.title}
                        <ArrowUpRight
                          size={12}
                          aria-hidden="true"
                          className="text-muted transition-transform duration-200 group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cert && (
              <a
                href={asset(cert.file)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${CERTIFICATE_BUTTON_LABEL}: ${cert.title} (membuka PDF di tab baru)`}
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b91c28]"
              >
                <Award size={15} aria-hidden="true" />
                {CERTIFICATE_BUTTON_LABEL}
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-40 top-1/3 h-80 w-80 rounded-full bg-primary/10 blur-[120px]"
      />

      <div className="wrap relative">
        <SectionHeading
          id="experience-title"
          title="Tempat saya bekerja sejauh ini"
          description="Pengalaman langsung pertama saya di sebuah organisasi, sebagai peserta magang."
        />

        <div className="mt-10 grid items-start gap-12 sm:mt-12 lg:grid-cols-5 lg:gap-8">
          <ul className="lg:col-span-3">
            {experience.map((item) => (
              <Reveal as="li" key={item.id}>
                <Dossier item={item} />
              </Reveal>
            ))}
          </ul>

          <div className="lg:col-span-2">
            <Reveal className="flex items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/50 bg-primary/10 text-soft">
                <Award size={18} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-xl font-extrabold text-ink">Sertifikat</h3>
                <p className="mt-0.5 text-sm text-muted">Buka sertifikat untuk membaca PDF aslinya di tab baru.</p>
              </div>
            </Reveal>

            <ul className="mt-5 space-y-3">
              {certificates.map((cert, index) => (
                <CertificateCard key={cert.id} cert={cert} index={index} />
              ))}
            </ul>
          </div>
        </div>

        {profile.education && (
          <p className="mt-12 text-sm text-muted">
            Pendidikan: <span className="font-semibold text-ink">{profile.education}</span>
          </p>
        )}
      </div>
    </section>
  )
}
