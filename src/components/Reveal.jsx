import { motion } from 'motion/react'

// Small fade-and-rise on first scroll into view. Used on a few blocks only, not on everything.
// Reduced-motion users skip the movement (see MotionConfig in App.jsx).
export default function Reveal({ as = 'div', delay = 0, y = 14, className, children, ...rest }) {
  const Tag = motion[as]

  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
