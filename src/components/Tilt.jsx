import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from 'motion/react'

// 3D tilt that follows the pointer. Children can float above the surface with
// style={{ transform: 'translateZ(60px)' }} because the inner layer keeps preserve-3d.
export default function Tilt({ max = 8, className = '', children }) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const x = useMotionValue(0.5)
  const y = useMotionValue(0.5)
  const sx = useSpring(x, { stiffness: 180, damping: 18 })
  const sy = useSpring(y, { stiffness: 180, damping: 18 })
  const rotateY = useTransform(sx, [0, 1], [-max, max])
  const rotateX = useTransform(sy, [0, 1], [max, -max])

  const onMove = (event) => {
    if (reduce || event.pointerType === 'touch' || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set((event.clientX - rect.left) / rect.width)
    y.set((event.clientY - rect.top) / rect.height)
  }
  const onLeave = () => {
    x.set(0.5)
    y.set(0.5)
  }

  return (
    <div
      ref={ref}
      className={className}
      style={{ perspective: 1100 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      <motion.div className="h-full" style={reduce ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}>
        {children}
      </motion.div>
    </div>
  )
}
