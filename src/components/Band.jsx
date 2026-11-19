import Marquee from './Marquee'

const words = ['Laravel', 'React', 'Tailwind CSS', 'PHP', 'MySQL', 'WordPress', 'Elementor', 'Figma']

// A red strip set at a slight angle, crossing the page between hero and about.
export default function Band() {
  return (
    <div aria-hidden="true" className="relative z-10 -my-6 overflow-hidden py-10">
      <div className="-rotate-2 scale-105 bg-primary py-4 text-night shadow-[0_0_60px_rgba(220,31,46,0.35)]">
        <Marquee items={words} fast className="font-display text-2xl font-extrabold uppercase tracking-tight sm:text-4xl" />
      </div>
    </div>
  )
}
