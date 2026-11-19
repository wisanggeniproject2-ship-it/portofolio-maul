import Logo from './Logo'
import SocialLinks from './SocialLinks'
import { navLinks, profile } from '../data/profile'

export default function Footer() {
  return (
    <footer className="border-t border-line pb-24">
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_auto] md:items-start">
        <div>
          <a href="#home" aria-label="Wisanggeni, kembali ke atas" className="inline-block rounded-lg">
            <Logo />
          </a>
          <p className="mt-4 text-base font-semibold text-ink">{profile.name}</p>
          <p className="mt-1 text-sm text-muted">
            {profile.role}, berkarya sebagai {profile.brand}.
          </p>
        </div>

        <nav aria-label="Navigasi footer">
          <ul className="grid grid-cols-2 gap-x-6 gap-y-3 text-sm">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a href={`#${link.id}`} className="text-muted transition-colors duration-200 hover:text-ice">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks />
      </div>

      <div className="border-t border-line">
        <p className="wrap py-6 text-sm text-muted">
          © {new Date().getFullYear()} {profile.name}. {profile.brand}. Hak cipta dilindungi.
        </p>
      </div>
    </footer>
  )
}
