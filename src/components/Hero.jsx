import { useLayoutEffect, useRef } from 'react'
import { motion } from 'motion/react'
import { Download, Flame } from 'lucide-react'
import Button from './Button'
import Logo from './Logo'
import SocialLinks from './SocialLinks'
import useTypewriter from '../hooks/useTypewriter'
import { profile } from '../data/profile'
import { asset } from '../utils/asset'
import { trackPointer } from '../utils/spotlight'

const ease = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}
const rise = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}
const slideUp = {
  hidden: { y: '115%' },
  show: { y: 0, transition: { duration: 0.9, ease } },
}

// Text that runs around the rotating badge. textLength fits it exactly to the circle.
const BADGE_TEXT = 'LARAVEL • REACT • WORDPRESS • FIGMA • '

// Sizes the name so the widest line always fits inside the screen, whatever font is loaded.
// It measures each line at 100px, then picks the largest size (up to maxPx) that fits.
function useFitName(maxPx) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return undefined

    const fit = () => {
      const lines = el.querySelectorAll('[data-fit]')
      const available = el.clientWidth * 0.94
      let widest = 0
      lines.forEach((line) => {
        widest = Math.max(widest, line.offsetWidth)
      })
      if (!widest || !available) return
      const current = parseFloat(getComputedStyle(el).fontSize) || 100
      const natural = (widest / current) * 100 // width of the widest line at 100px
      el.style.fontSize = `${Math.min(maxPx, (available / natural) * 100)}px`
    }

    fit()
    const observer = new ResizeObserver(fit)
    observer.observe(el)
    document.fonts?.ready.then(fit)
    return () => observer.disconnect()
  }, [maxPx])

  return ref
}

export default function Hero() {
  const typed = useTypewriter(profile.typedRoles)
  const nameRef = useFitName(136)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={trackPointer}
      className="hero-grid relative isolate flex min-h-[100svh] flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
      />

      {/* Top row */}
      <div className="flex items-center justify-between px-5 pt-6 sm:px-8">
        <a href="#home" aria-label={`${profile.brand}, kembali ke atas`} className="rounded-lg">
          <Logo />
        </a>
        <div className="flex items-center gap-3">
          {profile.status && (
            <p className="flex items-center gap-2 rounded-full border border-line bg-night/70 px-3.5 py-1.5 text-sm font-medium text-ink backdrop-blur">
              <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden="true">
                <span className="pulse-ring absolute inset-0 rounded-full bg-primary" />
                <span className="relative h-2 w-2 rounded-full bg-primary" />
              </span>
              {profile.status}
            </p>
          )}
          <a
            href={asset(profile.cv)}
            download={profile.cvFileName}
            className="hidden items-center gap-2 rounded-full border border-line px-4 py-2 text-sm font-semibold text-ink transition-colors duration-200 hover:border-soft hover:text-ice sm:inline-flex"
          >
            <Download size={15} aria-hidden="true" />
            CV
          </a>
        </div>
      </div>

      {/* Stage: the portrait sits between the two lines of the name */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-1 flex-col items-center justify-center px-3 pb-6 pt-10 sm:px-6"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.94, y: 24 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease } } }}
          className="relative z-10 w-[min(60vw,21rem)] md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-[52%]"
        >
          <div className="arch relative aspect-[4/5] overflow-hidden border border-primary/50 bg-card shadow-2xl shadow-primary/20">
            <img
              src={asset(profile.photo)}
              alt={`Foto ${profile.name}`}
              width="800"
              height="1000"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-night/60 via-transparent to-primary/10" />
          </div>

          <div
            aria-hidden="true"
            className="absolute -right-8 bottom-4 z-30 grid h-28 w-28 place-items-center rounded-full bg-primary text-night shadow-xl shadow-black/50 sm:-right-12 sm:h-32 sm:w-32"
          >
            <svg viewBox="0 0 120 120" className="spin-around absolute inset-0 h-full w-full">
              <defs>
                <path id="hero-badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
              </defs>
              <text fontSize="10.5" fontWeight="800" fill="currentColor" textLength="272" lengthAdjust="spacing">
                <textPath href="#hero-badge-circle">{BADGE_TEXT}</textPath>
              </text>
            </svg>
            <Flame size={28} className="relative" />
          </div>
        </motion.div>

        <h1
          ref={nameRef}
          id="hero-title"
          style={{ fontSize: 'clamp(1.6rem, 8vw, 8.5rem)' }}
          className="relative w-full text-center font-extrabold uppercase leading-[0.9] tracking-[-0.03em] max-md:-mt-[12vw]"
        >
          <span className="relative z-20 block overflow-hidden px-[0.06em] pb-[0.08em] md:z-0">
            <motion.span variants={slideUp} className="text-outline block">
              <span data-fit className="inline-block whitespace-nowrap">
                {profile.firstLine}
              </span>
            </motion.span>
          </span>
          <span className="relative z-20 block overflow-hidden px-[0.06em] pb-[0.08em]">
            <motion.span variants={slideUp} className="block text-ink">
              <span data-fit className="inline-block whitespace-nowrap">
                {profile.lastLine}
              </span>
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-30 grid gap-8 px-5 pb-28 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-end"
      >
        <motion.div variants={rise} className="text-center md:text-left">
          <p className="flex min-h-[2rem] items-center justify-center text-xl font-semibold text-soft md:justify-start md:text-2xl">
            <span className="sr-only">{profile.role}</span>
            <span aria-hidden="true">{typed}</span>
            <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-0.5 animate-pulse rounded-full bg-soft" />
          </p>
          <p className="mx-auto mt-3 max-w-sm text-base leading-relaxed text-muted md:mx-0">{profile.heroText}</p>
        </motion.div>

        <motion.div variants={rise} className="flex flex-wrap justify-center gap-3">
          <Button href="#projects">Lihat Proyek Saya</Button>
          <Button href={asset(profile.cv)} download={profile.cvFileName} variant="secondary">
            <Download size={16} aria-hidden="true" />
            Unduh CV
          </Button>
        </motion.div>

        <motion.div variants={rise} className="flex justify-center md:justify-end">
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  )
}
