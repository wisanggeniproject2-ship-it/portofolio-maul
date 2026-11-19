import { useEffect, useState } from 'react'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Types a word, holds it, deletes it, then moves to the next word.
// With reduced motion enabled it simply returns the first word.
export default function useTypewriter(words, { typeSpeed = 70, deleteSpeed = 38, hold = 1700 } = {}) {
  const [reduced] = useState(prefersReducedMotion)
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (reduced) return undefined

    const word = words[index]
    let timer

    if (!deleting && text.length < word.length) {
      timer = setTimeout(() => setText(word.slice(0, text.length + 1)), typeSpeed)
    } else if (!deleting) {
      timer = setTimeout(() => setDeleting(true), hold)
    } else if (text.length > 0) {
      timer = setTimeout(() => setText(word.slice(0, text.length - 1)), deleteSpeed)
    } else {
      timer = setTimeout(() => {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      }, 250)
    }

    return () => clearTimeout(timer)
  }, [text, deleting, index, words, reduced, typeSpeed, deleteSpeed, hold])

  return reduced ? words[0] : text
}
