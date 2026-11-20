import { motion } from 'motion/react'
import { Download } from 'lucide-react'
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

export default function Hero() {
  const typed = useTypewriter(profile.typedRoles)

  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      onPointerMove={trackPointer}
      className="hero-grid relative isolate flex min-h-[min(100svh,50rem)] flex-col overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[38%] -z-10 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/25 blur-[140px]"
      />

      {/* Top row (the music player floats in the top-right corner) */}
      <div className="flex items-center gap-4 px-5 pt-6 sm:px-8">
        <a href="#home" aria-label={`${profile.brand}, back to the top`} className="rounded-lg">
          <Logo />
        </a>
        {profile.status && (
          <p className="hidden items-center gap-2 rounded-full border border-line bg-night/70 px-3.5 py-1.5 text-sm font-medium text-ink backdrop-blur sm:flex">
            <span className="relative grid h-2.5 w-2.5 place-items-center" aria-hidden="true">
              <span className="pulse-ring absolute inset-0 rounded-full bg-primary" />
              <span className="relative h-2 w-2 rounded-full bg-primary" />
            </span>
            {profile.status}
          </p>
        )}
      </div>

      {/* Stage: the portrait sits between the two lines of the name */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative flex flex-1 flex-col items-center justify-center px-3 pb-4 pt-10 sm:px-6 md:min-h-[26rem] md:pt-14"
      >
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.94, y: 24 }, show: { opacity: 1, scale: 1, y: 0, transition: { duration: 1, ease } } }}
          className="relative z-10 w-[min(46vw,11rem)] md:absolute md:left-1/2 md:top-1/2 md:w-60 md:-translate-x-1/2 md:-translate-y-1/2"
        >
          <div className="arch relative aspect-[4/5] overflow-hidden border border-primary/50 bg-card shadow-2xl shadow-primary/20">
            <img
              src={asset(profile.photo)}
              alt={`Portrait of ${profile.name}`}
              width="800"
              height="1000"
              fetchPriority="high"
              className="h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-night/60 via-transparent to-primary/10" />
          </div>
        </motion.div>

        <h1
          id="hero-title"
          className="relative w-full text-center text-[clamp(2.1rem,9vw,6.5rem)] font-extrabold uppercase leading-[0.86] tracking-[-0.04em] max-md:-mt-[10vw]"
        >
          <span className="relative z-20 block overflow-hidden pb-[0.07em] md:z-0">
            <motion.span variants={slideUp} className="text-outline block">
              {profile.firstLine}
            </motion.span>
          </span>
          <span className="relative z-20 block overflow-hidden pb-[0.07em]">
            <motion.span variants={slideUp} className="block text-ink">
              {profile.lastLine}
            </motion.span>
          </span>
        </h1>
      </motion.div>

      {/* Bottom row */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-30 grid gap-6 px-5 pb-24 sm:px-8 md:grid-cols-[1fr_auto_1fr] md:items-end"
      >
        <motion.div variants={rise} className="text-center md:text-left">
          <p className="flex min-h-[2rem] items-center justify-center text-lg font-semibold text-soft md:justify-start md:text-xl">
            <span className="sr-only">{profile.role}</span>
            <span aria-hidden="true">{typed}</span>
            <span aria-hidden="true" className="ml-1 inline-block h-[1.1em] w-0.5 animate-pulse rounded-full bg-soft" />
          </p>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted md:mx-0 md:text-base">{profile.heroText}</p>
        </motion.div>

        <motion.div variants={rise} className="flex flex-wrap justify-center gap-3">
          <Button href="#projects">Explore My Projects</Button>
          <Button href={asset(profile.cv)} download={profile.cvFileName} variant="secondary">
            <Download size={16} aria-hidden="true" />
            Download CV
          </Button>
        </motion.div>

        <motion.div variants={rise} className="flex justify-center md:justify-end">
          <SocialLinks />
        </motion.div>
      </motion.div>
    </section>
  )
}
