import { useCallback, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import Badge from './Badge'
import GithubRepos from './GithubRepos'
import { GitHubIcon } from './Icons'
import ProjectModal from './ProjectModal'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Tilt from './Tilt'
import { profile } from '../data/profile'
import { projects } from '../data/projects'
import { asset } from '../utils/asset'
import { trackPointer } from '../utils/spotlight'

// How many project cards show on one page. Change this number to taste.
const PAGE_SIZE = 3
const ease = [0.22, 1, 0.36, 1]

const navButton =
  'inline-flex h-11 items-center gap-1 rounded-full border border-line px-4 text-sm font-semibold text-ink transition-colors duration-200 hover:border-soft hover:bg-primary disabled:pointer-events-none disabled:opacity-40'

// One small tile that drifts past behind the photo. Tiles of the page you are on stay bright.
function Tile({ project, bright }) {
  return (
    <div
      className={`relative h-20 w-32 shrink-0 overflow-hidden rounded-xl border border-line bg-card transition-opacity duration-500 sm:h-28 sm:w-44 ${
        bright ? 'opacity-100' : 'opacity-40'
      }`}
    >
      <img
        src={asset(project.thumbnail)}
        alt=""
        width="400"
        height="250"
        loading="lazy"
        decoding="async"
        className="h-full w-full object-cover"
      />
      <span className="absolute inset-x-0 bottom-0 truncate bg-linear-to-t from-night/95 to-transparent px-2.5 pb-1.5 pt-6 text-[0.7rem] font-semibold text-ink sm:text-xs">
        {project.title}
      </span>
    </div>
  )
}

// A looping strip. Two identical halves, so moving the track by -50% never jumps.
function Strip({ items, visibleIds, reverse = false, seconds = 60 }) {
  const half = [...items, ...items]
  return (
    <div className="marquee overflow-hidden">
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ animationDuration: `${seconds}s` }}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 gap-3 pr-3 sm:gap-4 sm:pr-4">
            {half.map((project, i) => (
              <Tile key={`${project.id}-${i}`} project={project} bright={visibleIds.has(project.id)} />
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

export default function Projects() {
  const reduce = useReducedMotion()
  const cardsTop = useRef(null)
  const [selected, setSelected] = useState(null)
  const [page, setPage] = useState(1)

  const closeModal = useCallback(() => setSelected(null), [])

  const totalPages = Math.max(1, Math.ceil(projects.length / PAGE_SIZE))
  const start = (page - 1) * PAGE_SIZE
  const visible = projects.slice(start, start + PAGE_SIZE)
  const visibleIds = new Set(visible.map((p) => p.id))

  const goTo = (target) => {
    const next = Math.min(Math.max(target, 1), totalPages)
    if (next === page) return
    setPage(next)
    cardsTop.current?.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' })
  }

  return (
    <section id="projects" aria-labelledby="projects-title" className="section relative overflow-hidden">
      <div className="wrap">
        <SectionHeading
          id="projects-title"
          title="Things I've built and designed"
          description="My work drifts past behind me. The cards below tell the story of each one."
        />
      </div>

      {/* Stage: two lanes of projects cross behind the photo, one to the left and one to the right */}
      <div className="relative mx-auto mt-8 h-[19rem] max-w-[90rem] sm:mt-12 sm:h-[25rem]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[110px]"
        />

        <div
          aria-hidden="true"
          className="absolute inset-0 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]"
        >
          <div className="absolute inset-x-0 top-[6%]">
            <Strip items={projects} visibleIds={visibleIds} seconds={70} />
          </div>
          <div className="absolute inset-x-0 bottom-[6%]">
            <Strip items={[...projects].reverse()} visibleIds={visibleIds} reverse seconds={80} />
          </div>
        </div>

        <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center">
          <Tilt max={6} className="pointer-events-auto w-[10.5rem] sm:w-[15rem]">
            <div className="arch relative aspect-[4/5] overflow-hidden border border-primary/60 bg-card shadow-2xl shadow-primary/30">
              <img
                src={asset(profile.aboutPhoto ?? profile.photo)}
                alt={`Photo of ${profile.name}`}
                width="800"
                height="1000"
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover"
              />
              <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-night/70 via-transparent to-primary/10" />
              <p className="absolute inset-x-0 bottom-3 text-center text-xs font-semibold text-ink sm:text-sm">
                {projects.length} projects
              </p>
            </div>
          </Tilt>
        </div>
      </div>

      {/* Cards hang from the photo */}
      <div className="wrap">
        <div aria-hidden="true" className="mx-auto h-8 w-px bg-linear-to-b from-primary to-transparent sm:h-10" />

        <div ref={cardsTop} className="scroll-mt-28">
          <AnimatePresence mode="wait" initial={false}>
            <motion.ul
              key={page}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, y: -8, transition: { duration: 0.2 } }}
              variants={{ show: { transition: { staggerChildren: 0.08 } } }}
              className="mx-auto grid max-w-4xl gap-3 sm:grid-cols-3 sm:gap-4"
            >
              {visible.map((project) => (
                <motion.li
                  key={project.id}
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    show: { opacity: 1, y: 0, transition: { duration: 0.45, ease } },
                  }}
                >
                  <article
                    onPointerMove={trackPointer}
                    className="spotlight group flex h-full overflow-hidden rounded-2xl border border-line bg-card sm:flex-col"
                  >
                    <button
                      type="button"
                      onClick={() => setSelected(project)}
                      aria-label={`Open ${project.title}`}
                      tabIndex={-1}
                      className="relative w-28 shrink-0 overflow-hidden bg-deep sm:aspect-[16/9] sm:w-full"
                    >
                      <img
                        src={asset(project.thumbnail)}
                        alt={`Preview of ${project.title}`}
                        width="800"
                        height="500"
                        loading="lazy"
                        decoding="async"
                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 bg-primary/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"
                      />
                    </button>

                    <div className="flex min-w-0 flex-1 flex-col p-3 sm:p-4">
                      <span className="w-fit rounded-full border border-primary/50 bg-primary/10 px-2 py-0.5 text-[0.7rem] font-semibold text-soft">
                        {project.category}
                      </span>
                      <h3 className="mt-2 line-clamp-2 font-display text-base font-extrabold leading-snug text-ink">
                        {project.title}
                      </h3>
                      <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted">{project.summary}</p>

                      <ul className="mt-3 hidden flex-wrap gap-1.5 sm:flex" aria-label="Technologies used">
                        {project.tech.slice(0, 3).map((tech) => (
                          <Badge key={tech}>{tech}</Badge>
                        ))}
                      </ul>

                      <div className="mt-auto flex items-center gap-2 pt-3">
                        <button
                          type="button"
                          onClick={() => setSelected(project)}
                          aria-label={`View details of ${project.title}`}
                          className="inline-flex items-center rounded-full bg-primary px-3.5 py-1.5 text-xs font-semibold text-white transition-colors duration-200 hover:bg-[#b91c28] sm:text-sm"
                        >
                          Details
                        </button>
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} on GitHub`}
                            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-soft hover:text-ice"
                          >
                            <GitHubIcon width={15} height={15} />
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title} live demo`}
                            className="grid h-8 w-8 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-soft hover:text-ice"
                          >
                            <ArrowUpRight size={15} aria-hidden="true" />
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                </motion.li>
              ))}
            </motion.ul>
          </AnimatePresence>
        </div>

        {/* Pagination (hidden when everything fits on one page) */}
        {totalPages > 1 && (
          <nav aria-label="Project pages" className="mt-8 flex flex-col items-center gap-3 sm:mt-10">
            <div className="flex items-center gap-2">
              <button type="button" onClick={() => goTo(page - 1)} disabled={page === 1} className={navButton}>
                <ChevronLeft size={18} aria-hidden="true" />
                Prev
              </button>

              <ul className="hidden items-center gap-1.5 sm:flex">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                  <li key={n}>
                    <button
                      type="button"
                      onClick={() => goTo(n)}
                      aria-label={`Page ${n}`}
                      aria-current={n === page ? 'page' : undefined}
                      className={`grid h-11 w-11 place-items-center rounded-full border text-sm font-semibold transition-colors duration-200 ${
                        n === page
                          ? 'border-primary bg-primary text-white'
                          : 'border-line text-ink hover:border-soft hover:text-ice'
                      }`}
                    >
                      {n}
                    </button>
                  </li>
                ))}
              </ul>
              <p className="px-2 text-sm font-semibold text-ink sm:hidden" aria-hidden="true">
                {page} / {totalPages}
              </p>

              <button type="button" onClick={() => goTo(page + 1)} disabled={page === totalPages} className={navButton}>
                Next
                <ChevronRight size={18} aria-hidden="true" />
              </button>
            </div>
            <p role="status" className="text-sm text-muted">
              Showing {start + 1} to {start + visible.length} of {projects.length} projects
            </p>
          </nav>
        )}

        <Reveal className="mt-20 sm:mt-24">
          <GithubRepos />
        </Reveal>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  )
}
