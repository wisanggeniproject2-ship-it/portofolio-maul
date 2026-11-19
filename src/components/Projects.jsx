import { useCallback, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowUpRight, Plus } from 'lucide-react'
import Badge from './Badge'
import GithubRepos from './GithubRepos'
import { GitHubIcon } from './Icons'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Tilt from './Tilt'
import { projects } from '../data/projects'
import { asset } from '../utils/asset'

const ease = [0.22, 1, 0.36, 1]
const pad = (n) => String(n + 1).padStart(2, '0')

// A fake address for the browser frame, built from the project id.
const addressOf = (project) => `wisanggeni.project/${project.id}`

// Project index + live preview.
// Left: a numbered list, the open row shows the story. Right: a tilting browser window with the screenshot.
export default function Projects() {
  const [selected, setSelected] = useState(null)
  const [index, setIndex] = useState(0)
  const closeModal = useCallback(() => setSelected(null), [])
  const current = projects[index]

  return (
    <section id="projects" aria-labelledby="projects-title" className="section relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-40 top-1/3 -z-10 h-[30rem] w-[30rem] rounded-full bg-primary/15 blur-[130px]"
      />

      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            id="projects-title"
            title="Yang sudah saya bangun dan rancang"
            description="Pilih proyek dari daftar, pratinjaunya ikut berganti."
          />
          <p className="font-display text-7xl font-extrabold leading-none text-outline md:text-8xl" aria-hidden="true">
            {pad(projects.length - 1)}
          </p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* Preview: first on small screens, sticky on large ones */}
          <div className="lg:order-2 lg:col-span-7">
            <div className="lg:sticky lg:top-10">
              <div className="relative">
                {/* Giant number sitting behind the window */}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={current.id}
                    aria-hidden="true"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -30 }}
                    transition={{ duration: 0.35, ease }}
                    className="text-outline pointer-events-none absolute -left-2 -top-14 select-none font-display text-[9rem] font-extrabold leading-none opacity-60 sm:-top-20 sm:text-[13rem]"
                  >
                    {pad(index)}
                  </motion.span>
                </AnimatePresence>

                <Tilt max={5} className="relative">
                  <button
                    type="button"
                    onClick={() => setSelected(current)}
                    aria-label={`Buka detail ${current.title}`}
                    className="group relative block w-full overflow-hidden rounded-2xl border border-line bg-card text-left shadow-2xl shadow-primary/20"
                  >
                    {/* Browser top bar */}
                    <span className="flex items-center gap-3 border-b border-line bg-deep px-4 py-3" aria-hidden="true">
                      <span className="flex gap-1.5">
                        <span className="h-2.5 w-2.5 rounded-full bg-primary" />
                        <span className="h-2.5 w-2.5 rounded-full bg-soft/60" />
                        <span className="h-2.5 w-2.5 rounded-full bg-ice/30" />
                      </span>
                      <span className="min-w-0 flex-1 truncate rounded-full bg-night px-4 py-1 text-xs text-muted">
                        {addressOf(current)}
                      </span>
                    </span>

                    <span className="relative block aspect-[16/10] overflow-hidden bg-night">
                      <AnimatePresence mode="popLayout" initial={false}>
                        <motion.img
                          key={current.id}
                          src={asset(current.thumbnail)}
                          alt={`Pratinjau ${current.title}`}
                          width="800"
                          height="500"
                          initial={{ opacity: 0, scale: 1.08, x: 40 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.97, x: -40 }}
                          transition={{ duration: 0.5, ease }}
                          className="absolute inset-0 h-full w-full object-cover"
                        />
                      </AnimatePresence>
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 grid place-items-center bg-night/55 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                      >
                        <span className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white">
                          <Plus size={16} />
                          Buka detail
                        </span>
                      </span>
                    </span>
                  </button>

                  {/* Stickers floating above the window */}
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={current.category}
                      aria-hidden="true"
                      initial={{ opacity: 0, rotate: -14, scale: 0.8 }}
                      animate={{ opacity: 1, rotate: -6, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.3, ease }}
                      style={{ transform: 'translateZ(60px)' }}
                      className="pointer-events-none absolute -right-2 -top-4 rounded-full bg-primary px-4 py-2 text-xs font-extrabold uppercase tracking-wide text-night shadow-xl shadow-black/50 sm:-right-5"
                    >
                      {current.category}
                    </motion.span>
                  </AnimatePresence>
                </Tilt>
              </div>

              {/* Progress dots */}
              <div className="mt-6 flex items-center justify-center gap-2 lg:justify-start" role="group" aria-label="Pilih proyek">
                {projects.map((project, i) => (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => setIndex(i)}
                    aria-label={`Tampilkan ${project.title}`}
                    aria-pressed={i === index}
                    className={`h-2 rounded-full transition-all duration-300 ${i === index ? 'w-10 bg-primary' : 'w-2 bg-line hover:bg-soft'}`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Index */}
          <ul className="lg:order-1 lg:col-span-5">
            {projects.map((project, i) => {
              const open = i === index
              return (
                <li key={project.id} className="border-t border-line last:border-b">
                  <button
                    type="button"
                    onClick={() => setIndex(i)}
                    onPointerEnter={(event) => {
                      if (event.pointerType === 'mouse') setIndex(i)
                    }}
                    aria-expanded={open}
                    aria-controls={`project-panel-${project.id}`}
                    className="group flex w-full items-start gap-4 py-6 text-left"
                  >
                    <span
                      className={`font-display text-2xl font-extrabold transition-colors duration-300 ${open ? 'text-primary' : 'text-muted/60 group-hover:text-soft'}`}
                    >
                      {pad(i)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span
                        className={`block font-display text-2xl font-extrabold leading-tight tracking-tight transition-colors duration-300 sm:text-3xl ${open ? 'text-ink' : 'text-muted group-hover:text-ink'}`}
                      >
                        {project.title}
                      </span>
                      <span className="mt-1 block text-sm text-soft">{project.category}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-full border transition-all duration-300 ${open ? 'rotate-45 border-primary bg-primary text-white' : 'border-line text-muted'}`}
                    >
                      <Plus size={18} />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`project-panel-${project.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease }}
                        className="overflow-hidden"
                      >
                        <div className="pb-7 pl-11 sm:pl-12">
                          <p className="text-base leading-relaxed text-muted">{project.summary}</p>

                          <ul className="mt-4 flex flex-wrap gap-1.5" aria-label="Teknologi yang dipakai">
                            {project.tech.slice(0, 5).map((tech) => (
                              <Badge key={tech}>{tech}</Badge>
                            ))}
                          </ul>

                          <div className="mt-6 flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setSelected(project)}
                              aria-label={`Lihat detail ${project.title}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b91c28]"
                            >
                              Lihat Detail
                              <ArrowUpRight size={15} aria-hidden="true" />
                            </button>
                            {project.github && (
                              <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`${project.title} di GitHub`}
                                className="grid h-10 w-10 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-soft hover:text-ice"
                              >
                                <GitHubIcon width={18} height={18} />
                              </a>
                            )}
                            {project.demo && (
                              <a
                                href={project.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-soft hover:text-ice"
                              >
                                Demo Langsung
                                <ArrowUpRight size={15} aria-hidden="true" />
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              )
            })}
          </ul>
        </div>

        <Reveal className="mt-24">
          <GithubRepos />
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
