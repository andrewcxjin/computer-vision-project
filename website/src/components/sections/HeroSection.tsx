'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { ChevronDown, Radar, Eye, Cpu } from 'lucide-react'
import { TypewriterText } from '../AnimatedText'

export function HeroSection() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.8])
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100])

  return (
    <section
      id="hero"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy-dark via-deep-black to-deep-black" />
      <div className="absolute inset-0 grid-bg opacity-50" />

      {/* Animated Grid Lines */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute left-0 right-0 h-[1px] bg-electric-blue/10"
            style={{ top: `${20 + i * 15}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleX: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              delay: i * 0.5,
              repeat: Infinity,
            }}
          />
        ))}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`v-${i}`}
            className="absolute top-0 bottom-0 w-[1px] bg-electric-blue/10"
            style={{ left: `${20 + i * 15}%` }}
            animate={{
              opacity: [0.1, 0.3, 0.1],
              scaleY: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 4,
              delay: i * 0.3,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* Floating Tech Icons */}
      <motion.div
        className="absolute top-1/4 left-[15%] text-electric-blue/30"
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity }}
      >
        <Radar size={48} />
      </motion.div>
      <motion.div
        className="absolute top-1/3 right-[20%] text-cyan-accent/20"
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity, delay: 1 }}
      >
        <Eye size={56} />
      </motion.div>
      <motion.div
        className="absolute bottom-1/3 left-[25%] text-electric-blue/20"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      >
        <Cpu size={40} />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative z-10 text-center px-6 max-w-5xl mx-auto"
      >
        {/* Year Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-electric-blue/30 bg-navy-dark/50 backdrop-blur-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
          <span className="font-mono text-sm text-cyan-accent tracking-wider">
            2025 SHOWCASE
          </span>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hero-title font-bold mb-6 leading-tight"
        >
          <span className="block text-white">UAV Human Detection</span>
          <span className="block gradient-text">A Year of Innovation</span>
        </motion.h1>

        {/* Subtitle with Typewriter Effect */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl md:text-2xl text-slate-text mb-12 font-light"
        >
          <TypewriterText
            text="Advancing aerial surveillance through AI-powered vision"
            speed={40}
            delay={800}
          />
        </motion.p>

        {/* Stats Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-wrap justify-center gap-8 mb-12"
        >
          {[
            { value: '78%', label: 'F1 Score' },
            { value: '85%', label: 'Recall' },
            { value: '2.8K', label: 'Training Images' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <span className="block text-3xl font-bold text-electric-blue font-mono">
                {stat.value}
              </span>
              <span className="text-sm text-slate-text font-mono uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <a
            href="#mission"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('mission')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="group inline-flex items-center gap-3 btn-primary text-lg"
          >
            Enter Experience
            <motion.span
              animate={{ y: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown size={20} />
            </motion.span>
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black to-transparent" />

      {/* Corner Decorations */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-electric-blue/30" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-electric-blue/30" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-electric-blue/30" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-electric-blue/30" />
    </section>
  )
}
