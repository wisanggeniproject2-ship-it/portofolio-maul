import { motion } from 'motion/react'
import { Briefcase, Flame, FolderOpen, Layers, Mail, User } from 'lucide-react'
import { navLinks } from '../data/profile'

const ICONS = {
  home: Flame,
  about: User,
  skills: Layers,
  projects: FolderOpen,
  experience: Briefcase,
  contact: Mail,
}

// Navigation lives in a floating dock at the bottom of the screen instead of a top bar.
// The active section opens up to show its name; on wide screens every name is visible.
export default function Dock({ active }) {
  return (
    <nav
      aria-label="Navigasi utama"
      className="pointer-events-none fixed inset-x-0 bottom-4 z-50 flex justify-center px-3 pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="pointer-events-auto flex items-center gap-0.5 rounded-full border border-line bg-night/80 p-1.5 shadow-2xl shadow-black/70 backdrop-blur-xl sm:gap-1">
        {navLinks.map((link) => {
          const Icon = ICONS[link.id] ?? Flame
          const isActive = active === link.id
          return (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                aria-label={link.label}
                aria-current={isActive ? 'location' : undefined}
                className={`relative flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-semibold transition-colors duration-200 ${
                  isActive ? 'text-white' : 'text-muted hover:text-ink'
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="dock-pill"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-primary"
                  />
                )}
                <Icon size={18} aria-hidden="true" className="relative shrink-0" />
                <span className={`relative ${isActive ? 'inline' : 'hidden lg:inline'}`}>{link.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
