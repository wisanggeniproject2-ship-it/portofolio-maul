export default function SectionHeading({ id, title, description, className = '' }) {
  return (
    <div className={className}>
      <h2
        id={id}
        className="max-w-2xl text-balance text-4xl font-bold leading-[1.08] tracking-tight text-ink md:text-5xl"
      >
        {title}
      </h2>
      {description && (
        <p className="mt-4 max-w-xl text-base leading-relaxed text-muted md:text-lg">{description}</p>
      )}
    </div>
  )
}
