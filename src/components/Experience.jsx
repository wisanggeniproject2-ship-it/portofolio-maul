import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Award, Check, ChevronLeft, ChevronRight, Plus } from 'lucide-react'
import Badge from './Badge'
import CertificateCard, { CERTIFICATE_BUTTON_LABEL } from './CertificateCard'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { certificates, experience, profile } from '../data/profile'
import { projects } from '../data/projects'
import { asset } from '../utils/asset'

const ease = [0.22, 1, 0.36, 1]

function Row({ item, open, onToggle }) {
  const cert = certificates.find((c) => c.id === item.certificateId)
  const itemProjects = (item.projectIds ?? []).map((id) => projects.find((p) => p.id === id)).filter(Boolean)
  const panelId = `panel-${item.id}`

  return (
    <li className="border-t border-line last:border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-controls={panelId}
        className="group relative flex w-full items-center justify-between gap-6 py-7 text-left md:py-9"
      >
        <span
          aria-hidden="true"
          className="absolute inset-y-0 -inset-x-4 origin-left scale-x-0 rounded-2xl bg-primary/10 transition-transform duration-500 ease-out group-hover:scale-x-100"
        />
        <span className="relative">
          <span className="block font-display text-3xl font-extrabold leading-tight tracking-tight text-ink md:text-5xl">
            {item.title}
          </span>
          <span className="mt-2 block text-base font-medium text-soft md:text-lg">
            {item.organization}
            {item.period ? ` · ${item.period}` : ''}
          </span>
        </span>
        <span
          aria-hidden="true"
          className={`relative grid h-12 w-12 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
            open ? 'rotate-45 border-primary bg-primary text-white' : 'border-line text-ink group-hover:border-soft'
          }`}
        >
          <Plus size={22} />
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease }}
            className="overflow-hidden"
          >
            <div className="grid gap-10 pb-10 md:grid-cols-2 md:gap-14">
              <ul className="space-y-3">
                {item.points.map((point, i) => (
                  <motion.li
                    key={point}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08, ease }}
                    className="flex gap-3 text-base leading-relaxed text-muted"
                  >
                    <Check size={18} aria-hidden="true" className="mt-1 shrink-0 text-soft" />
                    {point}
                  </motion.li>
                ))}
              </ul>

              <div className="space-y-7">
                {item.tech.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-ink">Dibuat dengan</h4>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {item.tech.map((tech) => (
                        <Badge key={tech}>{tech}</Badge>
                      ))}
                    </ul>
                  </div>
                )}

                {itemProjects.length > 0 && (
                  <div>
                    <h4 className="text-sm font-semibold text-ink">Proyek dari pengalaman ini</h4>
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {itemProjects.map((project) => (
                        <li key={project.id}>
                          <a
                            href="#projects"
                            className="group/link inline-flex items-center gap-1.5 rounded-full border border-line bg-night/60 px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-soft hover:text-ice"
                          >
                            {project.title}
                            <ArrowUpRight
                              size={14}
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
                    className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b91c28]"
                  >
                    <Award size={16} aria-hidden="true" />
                    {CERTIFICATE_BUTTON_LABEL}
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  )
}

export default function Experience() {
  const [openId, setOpenId] = useState(experience[0]?.id ?? null)
  const trackRef = useRef(null)

  const scrollCerts = (direction) => {
    const el = trackRef.current
    if (!el) return
    el.scrollBy({ left: direction * Math.min(el.clientWidth * 0.8, 340), behavior: 'smooth' })
  }

  return (
    <section id="experience" aria-labelledby="experience-title" className="section relative overflow-hidden bg-deep/50">
      <div className="wrap">
        <SectionHeading
          id="experience-title"
          title="Pengalaman saya sejauh ini"
          description="Magang dan pelatihan yang pernah saya ikuti. Buka satu baris untuk melihat detailnya."
        />

        <ul className="mt-12">
          {experience.map((item) => (
            <Row key={item.id} item={item} open={openId === item.id} onToggle={() => setOpenId(openId === item.id ? null : item.id)} />
          ))}
          {profile.education && (
            <li className="border-t border-line py-7 last:border-b md:py-9">
              <p className="text-sm text-muted">Pendidikan</p>
              <p className="mt-1 font-display text-2xl font-extrabold text-ink md:text-3xl">{profile.education}</p>
            </li>
          )}
        </ul>

        {/* Certificates */}
        <div className="mt-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div className="flex items-start gap-4">
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-primary/50 bg-primary/10 text-soft">
                <Award size={22} aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-display text-2xl font-extrabold text-ink md:text-3xl">Sertifikat</h3>
                <p className="mt-1 max-w-xl text-base text-muted">Buka sertifikat mana pun untuk membaca PDF aslinya di tab baru.</p>
              </div>
            </div>
            <div className="flex gap-2">
              {[
                { dir: -1, Icon: ChevronLeft, label: 'Sertifikat sebelumnya' },
                { dir: 1, Icon: ChevronRight, label: 'Sertifikat berikutnya' },
              ].map(({ dir, Icon, label }) => (
                <button
                  key={dir}
                  type="button"
                  onClick={() => scrollCerts(dir)}
                  aria-label={label}
                  className="grid h-11 w-11 place-items-center rounded-full border border-line text-ink transition-colors duration-200 hover:border-soft hover:bg-primary"
                >
                  <Icon size={20} aria-hidden="true" />
                </button>
              ))}
            </div>
          </Reveal>

          <ul
            ref={trackRef}
            className="no-scrollbar -mx-5 mt-8 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 sm:-mx-8 sm:px-8"
          >
            {certificates.map((cert, index) => (
              <CertificateCard key={cert.id} cert={cert} index={index} className="w-[17.5rem] shrink-0 snap-start sm:w-[19rem]" />
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
