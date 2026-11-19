import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail } from 'lucide-react'
import Reveal from './Reveal'
import SectionHeading from './SectionHeading'
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons'
import { contact } from '../data/profile'
import { trackPointer } from '../utils/spotlight'

const tiles = [
  { label: 'WhatsApp', hint: 'Balasan tercepat', value: contact.whatsappDisplay, href: contact.whatsappLink, Icon: WhatsAppIcon },
  { label: 'GitHub', hint: 'Lihat kode saya', value: contact.githubLabel, href: contact.github, Icon: GitHubIcon },
  { label: 'Instagram', hint: 'Sapa saya', value: contact.instagramLabel, href: contact.instagram, Icon: InstagramIcon },
  ...(contact.linkedin
    ? [{ label: 'LinkedIn', hint: 'Terhubung', value: contact.linkedinLabel || contact.linkedin, href: contact.linkedin, Icon: LinkedInIcon }]
    : []),
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contact.email)
      setCopied(true)
      clearTimeout(timer.current)
      timer.current = setTimeout(() => setCopied(false), 2200)
    } catch {
      // Clipboard diblokir: tautan email di sebelahnya tetap berfungsi.
    }
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section relative overflow-hidden bg-deep/40">
      <div className="wrap">
        <SectionHeading
          id="contact-title"
          title="Mari ngobrol soal proyekmu."
          description="Punya ide website atau aplikasi, atau ada pertanyaan soal karya saya? Pilih cara yang paling nyaman untukmu."
        />

        <div className="mt-10 grid gap-4 lg:grid-cols-12">
          {/* Email */}
          <Reveal className="lg:col-span-5">
            <div
              onPointerMove={trackPointer}
              className="spotlight flex h-full flex-col rounded-2xl border border-line bg-card p-5 sm:p-6"
            >
              <p className="flex items-center gap-2 text-sm font-medium text-soft">
                <Mail size={16} aria-hidden="true" />
                Email
              </p>
              <a
                href={`mailto:${contact.email}`}
                className="mt-2 block break-all text-base font-semibold text-ink transition-colors duration-200 hover:text-soft sm:text-lg"
              >
                {contact.email}
              </a>

              <div className="mt-5 flex flex-wrap items-center gap-2.5">
                <a
                  href={`mailto:${contact.email}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#b91c28]"
                >
                  Kirim email
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line px-4 py-2.5 text-sm font-semibold text-ink transition-colors duration-200 hover:border-soft hover:text-ice"
                >
                  {copied ? <Check size={15} aria-hidden="true" /> : <Copy size={15} aria-hidden="true" />}
                  {copied ? 'Tersalin!' : 'Salin alamat'}
                </button>
                <span role="status" aria-live="polite" className="sr-only">
                  {copied ? 'Alamat email tersalin' : ''}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Other channels */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:col-span-7">
            {tiles.map(({ label, hint, value, href, Icon }, i) => (
              <Reveal as="li" key={label} delay={i * 0.06}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onPointerMove={trackPointer}
                  className="spotlight group flex h-full items-center gap-4 rounded-2xl border border-line bg-card p-4 transition-colors duration-200 hover:border-soft sm:p-5"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-night text-soft transition-colors duration-200 group-hover:border-primary group-hover:bg-primary group-hover:text-white">
                    <Icon width={20} height={20} aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-semibold text-ink">{label}</span>
                    <span className="block truncate text-sm text-muted">{value}</span>
                  </span>
                  <ArrowUpRight
                    size={18}
                    aria-hidden="true"
                    className="shrink-0 text-muted transition-colors duration-200 group-hover:text-soft"
                  />
                </a>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}
