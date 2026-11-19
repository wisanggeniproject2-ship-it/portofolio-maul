import Marquee from './Marquee'
import { contact } from '../data/profile'

// One huge, slow line of text that is also the email link.
export default function LetsWork() {
  return (
    <section aria-label="Ajak saya bekerja sama" className="relative overflow-hidden border-y border-line py-12 sm:py-16">
      <a
        href={`mailto:${contact.email}`}
        aria-label={`Kirim email ke ${contact.email}`}
        className="group block"
      >
        <Marquee
          items={['Mari bekerja sama']}
          separator="✦"
          className="font-display text-[clamp(3rem,10vw,8rem)] font-extrabold uppercase leading-none tracking-tight text-outline transition-colors duration-300 group-hover:[color:var(--color-primary)]"
        />
      </a>
    </section>
  )
}
