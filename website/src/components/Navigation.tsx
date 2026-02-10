'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Github, ExternalLink } from 'lucide-react'

const chapters = [
  { id: 'hero', label: 'Home' },
  { id: 'mission', label: '01 Mission' },
  { id: 'technology', label: '02 Technology' },
  { id: 'applications', label: '03 Applications' },
  { id: 'dataset', label: '04 Dataset' },
  { id: 'demo', label: '05 Demo' },
  { id: 'future', label: '06 Future' },
]

export function Navigation() {
  const [activeSection, setActiveSection] = useState('hero')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      const sections = chapters.map((c) => document.getElementById(c.id))
      const scrollPosition = window.scrollY + window.innerHeight / 3

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(chapters[i].id)
          break
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMenuOpen(false)
  }

  return (
    <>
      {/* Desktop Navigation - Side Dots */}
      <nav className="fixed right-8 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-4">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollToSection(chapter.id)}
            className="group flex items-center gap-3"
            aria-label={chapter.label}
          >
            <span
              className={`text-xs font-mono uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cyan-accent ${
                activeSection === chapter.id ? 'opacity-100' : ''
              }`}
            >
              {chapter.label}
            </span>
            <span
              className={`nav-dot ${activeSection === chapter.id ? 'active' : ''}`}
            />
          </button>
        ))}
      </nav>

      {/* Top Header Bar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled ? 'bg-deep-black/90 backdrop-blur-md' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 border border-electric-blue rounded-lg flex items-center justify-center glow-border">
              <span className="font-mono text-electric-blue text-sm">UAV</span>
            </div>
            <span className="hidden sm:block font-mono text-sm text-slate-text">
              Human Detection
            </span>
          </motion.div>

          {/* Desktop Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="hidden md:flex items-center gap-6"
          >
            <a
              href="https://github.com/shreyamendi/computer-vision-project"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-slate-text hover:text-cyan-accent transition-colors"
            >
              <Github size={18} />
              <span className="text-sm">GitHub</span>
            </a>
            <a
              href="#demo"
              onClick={(e) => {
                e.preventDefault()
                scrollToSection('demo')
              }}
              className="btn-primary text-sm py-2 px-4"
            >
              Try Demo
            </a>
          </motion.div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-cyan-accent"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-30 bg-deep-black/95 backdrop-blur-lg lg:hidden pt-20"
          >
            <nav className="flex flex-col items-center gap-6 p-8">
              {chapters.map((chapter, index) => (
                <motion.button
                  key={chapter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => scrollToSection(chapter.id)}
                  className={`text-xl font-mono uppercase tracking-wider ${
                    activeSection === chapter.id
                      ? 'text-electric-blue'
                      : 'text-slate-text'
                  }`}
                >
                  {chapter.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="flex gap-4 mt-8"
              >
                <a
                  href="https://github.com/shreyamendi/computer-vision-project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2 px-4 flex items-center gap-2"
                >
                  <Github size={18} />
                  GitHub
                </a>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
