import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowUpRight, Database, Download, Layers, Monitor, Server } from 'lucide-react'
import CountUp from './CountUp'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import Tilt from './Tilt'
import { aboutParagraphs, certificates, experience, profile } from '../data/profile'
import { projects } from '../data/projects'
import { skillGroups } from '../data/skills'
import { asset } from '../utils/asset'
import { trackPointer } from '../utils/spotlight'

const technologyCount = new Set(skillGroups.flatMap((group) => group.items.map((item) => item.name))).size

const stats = [
  { value: projects.length, label: 'Proyek' },
  { value: technologyCount, label: 'Teknologi' },
  { value: experience.length, label: 'Pengalaman' },
  { value: certificates.length, label: 'Sertifikat' },
]

const focus = [
  { Icon: Monitor, name: 'Antarmuka', detail: 'React, Tailwind CSS, Blade' },
  { Icon: Server, name: 'Logika', detail: 'PHP dan Laravel' },
  { Icon: Database, name: 'Data', detail: 'MySQL' },
  { Icon: Layers, name: 'CMS', detail: 'WordPress, Elementor' },
]

function Word({ children, progress, range, reduce }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <>
      <motion.span style={{ opacity: reduce ? 1 : opacity }} className="inline-block">
        {children}
      </motion.span>{' '}
    </>
  )
}

// The intro lights up word by word as you scroll past it.
function ScrollText({ text }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'start 0.4'] })
  const words = text.split(' ')

  return (
    <p ref={ref} className="text-xl font-medium leading-relaxed text-ink md:text-2xl md:leading-relaxed">
      {words.map((word, i) => (
        <Word
          key={`${word}-${i}`}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          reduce={reduce}
        >
          {word}
        </Word>
      ))}
    </p>
  )
}

const tile = 'spotlight rounded-3xl border border-line bg-card p-6 md:p-7'

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section relative">
      <div className="wrap">
        <SectionHeading id="about-title" title="Saya mengubah ide menjadi website yang berfungsi." />

        <div className="mt-12 grid gap-4 md:grid-cols-6">
          {/* Photo slot */}
          <Reveal className="md:col-span-2 md:row-span-2">
            <Tilt max={5} className="h-full">
              <div className="group relative min-h-[26rem] overflow-hidden rounded-3xl border border-primary/40 bg-card md:h-full">
                <img
                  src={asset(profile.aboutPhoto ?? profile.photo)}
                  alt={`Foto ${profile.name}`}
                  width="800"
                  height="1000"
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover grayscale transition-[filter,transform] duration-700 group-hover:scale-105 group-hover:grayscale-0"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-primary/40 mix-blend-multiply transition-opacity duration-700 group-hover:opacity-0"
                />
                <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-night via-night/50 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-lg font-bold text-ink">{profile.name}</p>
                  <p className="text-sm text-soft">{profile.role}</p>
                </div>
              </div>
            </Tilt>
          </Reveal>

          <Reveal delay={0.05} onPointerMove={trackPointer} className={`${tile} md:col-span-4`}>
            <ScrollText text={aboutParagraphs[0]} />
          </Reveal>

          <Reveal delay={0.1} onPointerMove={trackPointer} className={`${tile} md:col-span-2`}>
            {aboutParagraphs.slice(1).map((text, i) => (
              <p key={text} className={`text-sm leading-relaxed text-muted ${i > 0 ? 'mt-4' : ''}`}>
                {text}
              </p>
            ))}
          </Reveal>

          <Reveal delay={0.15} className="md:col-span-2">
            <ul className="grid h-full grid-cols-2 gap-4">
              {stats.map(({ value, label }) => (
                <li
                  key={label}
                  onPointerMove={trackPointer}
                  className="spotlight flex flex-col justify-center rounded-3xl border border-line bg-card px-4 py-5 text-center"
                >
                  <p className="font-display text-4xl font-extrabold text-ink">
                    <CountUp to={value} />
                  </p>
                  <p className="mt-1 text-sm text-muted">{label}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.05} className="md:col-span-2">
            <a
              href={asset(profile.cv)}
              download={profile.cvFileName}
              className="group relative flex h-full min-h-[11rem] flex-col justify-between overflow-hidden rounded-3xl bg-primary p-6 text-night transition-colors duration-300 hover:bg-[#b91c28] md:p-7"
            >
              <span
                aria-hidden="true"
                className="sweep pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-linear-to-r from-transparent via-white/25 to-transparent"
              />
              <span className="relative flex items-center justify-between">
                <Download size={26} aria-hidden="true" />
                <ArrowUpRight
                  size={26}
                  aria-hidden="true"
                  className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </span>
              <span className="relative">
                <span className="block font-display text-3xl font-extrabold leading-none">Unduh CV</span>
                <span className="mt-2 block text-sm font-medium text-night/70">{profile.cvFileName}</span>
              </span>
            </a>
          </Reveal>

          <Reveal delay={0.1} className="md:col-span-4">
            <ul className="grid h-full gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {focus.map(({ Icon, name, detail }) => (
                <li
                  key={name}
                  onPointerMove={trackPointer}
                  className="spotlight rounded-3xl border border-line bg-card p-5 transition-transform duration-300 hover:-translate-y-1"
                >
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/15 text-soft">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <p className="mt-4 text-base font-semibold text-ink">{name}</p>
                  <p className="mt-1 text-sm text-muted">{detail}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
