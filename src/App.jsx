import { MotionConfig } from 'motion/react'
import useActiveSection from './hooks/useActiveSection'
import { navLinks } from './data/profile'
import Dock from './components/Dock'
import Hero from './components/Hero'
import Band from './components/Band'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import LetsWork from './components/LetsWork'
import Footer from './components/Footer'

const sectionIds = navLinks.map((link) => link.id)

export default function App() {
  const active = useActiveSection(sectionIds)

  return (
    // reducedMotion="user" turns off movement animations for people who ask for less motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
      >
        Lewati ke konten
      </a>
      <Dock active={active} />
      <main id="main">
        <Hero />
        <Band />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
        <LetsWork />
      </main>
      <Footer />
    </MotionConfig>
  )
}
