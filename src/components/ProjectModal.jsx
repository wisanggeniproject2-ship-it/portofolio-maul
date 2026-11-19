import { useEffect, useId, useRef } from 'react'
import { motion } from 'motion/react'
import { ArrowUpRight, Check, X } from 'lucide-react'
import Badge from './Badge'
import { GitHubIcon } from './Icons'
import { asset } from '../utils/asset'

const FOCUSABLE = 'a[href], button:not([disabled])'

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null)
  const titleId = useId()
  const closeRef = useRef(onClose)

  useEffect(() => {
    closeRef.current = onClose
  })

  useEffect(() => {
    const previouslyFocused = document.activeElement
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    dialogRef.current?.focus()

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        closeRef.current()
        return
      }
      if (event.key !== 'Tab' || !dialogRef.current) return

      // Keep keyboard focus inside the dialog while it is open
      const items = dialogRef.current.querySelectorAll(FOCUSABLE)
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = previousOverflow
      previouslyFocused?.focus?.()
    }
  }, [])

  const hasLinks = project.github || project.demo

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] flex items-end justify-center bg-night/80 backdrop-blur-sm sm:items-center sm:p-6"
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onClick={(event) => event.stopPropagation()}
        initial={{ opacity: 0, y: 32, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 24, scale: 0.98 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-deep outline-none sm:rounded-3xl"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Tutup detail proyek"
          className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-night/85 text-ink backdrop-blur transition-colors hover:bg-night"
        >
          <X size={18} aria-hidden="true" />
        </button>

        <div className="aspect-[16/9] overflow-hidden bg-card sm:aspect-[16/7]">
          <img
            src={asset(project.thumbnail)}
            alt={`Pratinjau ${project.title}`}
            width="800"
            height="500"
            className="h-full w-full object-cover"
          />
        </div>

        <div className="p-6 sm:p-8">
          <span className="inline-block rounded-full border border-line bg-night/60 px-3 py-1 text-xs font-medium text-ice">
            {project.category}
          </span>
          <h3 id={titleId} className="mt-4 text-2xl font-bold leading-tight tracking-tight text-ink sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{project.description}</p>

          <h4 className="mt-8 text-sm font-semibold text-ink">Cakupan proyek</h4>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {project.highlights.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-sm text-muted">
                <Check size={16} aria-hidden="true" className="mt-0.5 shrink-0 text-soft" />
                {item}
              </li>
            ))}
          </ul>

          <h4 className="mt-8 text-sm font-semibold text-ink">Dibuat dengan</h4>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap items-center gap-3 border-t border-line pt-6">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-soft hover:text-ice"
              >
                <GitHubIcon width={16} height={16} />
                Lihat di GitHub
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#b91c28]"
              >
                Demo Langsung
                <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            )}
            {!hasLinks && (
              <p className="text-sm text-muted">Kode sumber dan demo langsung belum dipublikasikan.</p>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
