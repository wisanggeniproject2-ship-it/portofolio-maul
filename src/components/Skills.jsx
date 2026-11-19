import { useState } from 'react'
import { motion } from 'motion/react'
import { Flame } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { skillGroups } from '../data/skills'

const ease = [0.22, 1, 0.36, 1]

// Flatten the data once and remember which group each skill belongs to.
const allSkills = skillGroups.flatMap((group) => group.items.map((item) => ({ ...item, group: group.title })))
const split = Math.ceil(allSkills.length * 0.55)
const outer = allSkills.slice(0, split)
const inner = allSkills.slice(split)

function levelLabel(level) {
  if (level >= 80) return 'Mahir'
  if (level >= 65) return 'Cukup mahir'
  return 'Sedang belajar'
}

// One ring of chips. The ring spins one way and each chip spins back, so text stays upright.
function Ring({ items, radius, duration, reverse, current, onHover, onPick }) {
  const n = items.length
  return (
    <div className={`orbit-spin absolute inset-0 ${reverse ? 'rev' : ''}`} style={{ '--d': duration }}>
      {items.map((item, i) => {
        const angle = (360 / n) * i
        const isCurrent = current?.name === item.name
        return (
          <div
            key={item.name}
            className="absolute left-1/2 top-1/2"
            style={{ transform: `rotate(${angle}deg) translateY(calc(var(--s) * -${radius}))` }}
          >
            <div style={{ transform: `rotate(${-angle}deg)` }}>
              <div className={`orbit-spin relative ${reverse ? '' : 'rev'}`} style={{ '--d': duration }}>
                <button
                  type="button"
                  onMouseEnter={() => onHover(item)}
                  onFocus={() => onHover(item)}
                  onBlur={() => onHover(null)}
                  onClick={() => onPick(item)}
                  aria-pressed={isCurrent}
                  className={`absolute left-0 top-0 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors duration-200 sm:px-4 sm:py-2 sm:text-sm ${
                    isCurrent
                      ? 'border-primary bg-primary text-white shadow-lg shadow-primary/40'
                      : 'border-line bg-card text-ink hover:border-soft'
                  }`}
                >
                  {item.name}
                </button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function Skills() {
  const [hovered, setHovered] = useState(null)
  const [picked, setPicked] = useState(null)
  const current = hovered ?? picked
  const paused = Boolean(current)

  return (
    <section id="skills" aria-labelledby="skills-title" className="section relative overflow-hidden bg-deep/50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[58%] h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/15 blur-[130px]"
      />

      <div className="wrap relative">
        <SectionHeading
          id="skills-title"
          title="Yang biasa saya pakai"
          description="Arahkan kursor ke satu keahlian untuk menghentikan roda dan melihat seberapa nyaman saya memakainya. Di layar sentuh, cukup ketuk."
        />

        <div
          data-paused={paused}
          onMouseLeave={() => setHovered(null)}
          className="orbit-wrap relative mx-auto mt-12 aspect-square w-[var(--s)]"
          style={{ '--s': 'min(86vw, 38rem)' }}
        >
          {/* Guide circles */}
          {[0.86, 0.52].map((size) => (
            <span
              key={size}
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-line"
              style={{ width: `calc(var(--s) * ${size})`, height: `calc(var(--s) * ${size})` }}
            />
          ))}

          <Ring
            items={outer}
            radius={0.43}
            duration="90s"
            current={current}
            onHover={setHovered}
            onPick={(item) => setPicked((p) => (p?.name === item.name ? null : item))}
          />
          <Ring
            items={inner}
            radius={0.26}
            duration="70s"
            reverse
            current={current}
            onHover={setHovered}
            onPick={(item) => setPicked((p) => (p?.name === item.name ? null : item))}
          />

          {/* Core */}
          <span
            aria-hidden="true"
            className="absolute left-1/2 top-1/2 grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-primary text-white shadow-[0_0_60px_rgba(220,31,46,0.55)]"
            style={{ width: 'calc(var(--s) * 0.14)', height: 'calc(var(--s) * 0.14)' }}
          >
            <span className="pulse-ring absolute inset-0 rounded-full bg-primary/50" />
            <Flame className="relative h-1/2 w-1/2" />
          </span>
        </div>

        {/* Readout */}
        <div className="mx-auto mt-10 max-w-md rounded-3xl border border-line bg-card p-6 text-center" role="status" aria-live="polite">
          {current ? (
            <motion.div key={current.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25, ease }}>
              <p className="text-sm text-muted">{current.group}</p>
              <p className="mt-1 font-display text-3xl font-extrabold text-ink">{current.name}</p>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-night">
                <motion.div
                  className="h-full rounded-full bg-linear-to-r from-primary to-soft"
                  initial={{ width: 0 }}
                  animate={{ width: `${current.level}%` }}
                  transition={{ duration: 0.8, ease }}
                />
              </div>
              <p className="mt-3 text-sm font-medium text-soft">
                {levelLabel(current.level)} · {current.level}%
              </p>
            </motion.div>
          ) : (
            <div>
              <p className="font-display text-2xl font-extrabold text-ink">{allSkills.length} keahlian di orbit</p>
              <p className="mt-1 text-sm text-muted">Pilih satu untuk melihat seberapa nyaman saya memakainya.</p>
            </div>
          )}
        </div>
        <p className="mt-4 text-center text-sm text-muted">Bilah ini adalah penilaian diri sendiri, bukan nilai ujian.</p>
      </div>
    </section>
  )
}
