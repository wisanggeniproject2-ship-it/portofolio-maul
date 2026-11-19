import { Mail } from 'lucide-react'
import { contact } from '../data/profile'
import { GitHubIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from './Icons'

// Builds the list from data, so an empty LinkedIn simply never shows up.
function getLinks() {
  const links = [
    { label: 'GitHub', href: contact.github, Icon: GitHubIcon },
    { label: 'Instagram', href: contact.instagram, Icon: InstagramIcon },
    { label: 'WhatsApp', href: contact.whatsappLink, Icon: WhatsAppIcon },
    { label: 'Email', href: `mailto:${contact.email}`, Icon: Mail },
  ]
  if (contact.linkedin) {
    links.splice(2, 0, { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedInIcon })
  }
  return links
}

export default function SocialLinks({ className = '' }) {
  return (
    <ul className={`flex items-center gap-3 ${className}`}>
      {getLinks().map(({ label, href, Icon }) => {
        const external = href.startsWith('http')
        return (
          <li key={label}>
            <a
              href={href}
              aria-label={label}
              title={label}
              {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="grid h-11 w-11 place-items-center rounded-full border border-line text-muted transition-colors duration-200 hover:border-soft hover:text-ice"
            >
              <Icon width={20} height={20} aria-hidden="true" />
            </a>
          </li>
        )
      })}
    </ul>
  )
}
