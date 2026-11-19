// A ticker that loops without a jump: two identical halves, the track moves by -50%.
// Pass `items` (strings). Hovering pauses it. Hidden from screen readers (it only repeats words).
export default function Marquee({ items, separator = '✦', reverse = false, fast = false, className = '' }) {
  const half = [...items, ...items]
  return (
    <div aria-hidden="true" className={`marquee overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''} ${fast ? 'fast' : ''}`}>
        {[0, 1].map((copy) => (
          <div key={copy} className="flex shrink-0 items-center">
            {half.map((item, i) => (
              <span key={`${item}-${i}`} className="flex shrink-0 items-center">
                <span className="px-5 sm:px-7">{item}</span>
                <span className="opacity-70">{separator}</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
