'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Play, ExternalLink, Upload, Sliders, Eye, Zap } from 'lucide-react'
import { AnimatedText } from '../AnimatedText'

const demoFeatures = [
  {
    icon: Upload,
    title: 'Upload Image',
    description: 'Drop any thermal or aerial image for instant detection',
  },
  {
    icon: Sliders,
    title: 'Adjust Threshold',
    description: 'Fine-tune confidence threshold for precision vs recall trade-off',
  },
  {
    icon: Eye,
    title: 'Compare Models',
    description: 'Side-by-side comparison of baseline vs augmented model',
  },
  {
    icon: Zap,
    title: 'Robustness Test',
    description: 'Test both models under snow and fog conditions',
  },
]

export function DemoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section
      id="demo"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy-dark/40 to-deep-black" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24 text-center"
        >
          <span className="chapter-number block mb-4">CHAPTER 05</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="See It In Action" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl mx-auto">
            Real-time human detection from aerial views
          </p>
        </motion.div>

        {/* Demo Embed Area */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div
            className="relative aspect-video rounded-xl overflow-hidden border border-electric-blue/30 bg-navy-dark/50 group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* Demo Preview */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              {/* Animated Detection Preview */}
              <div className="relative w-full h-full p-8">
                {/* Grid Background */}
                <div className="absolute inset-0 grid-bg opacity-30" />

                {/* Simulated Interface */}
                <div className="absolute inset-4 border border-electric-blue/20 rounded-lg">
                  {/* Header Bar */}
                  <div className="absolute top-0 left-0 right-0 h-10 bg-navy-dark/80 border-b border-electric-blue/20 flex items-center px-4">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500/50" />
                      <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                      <div className="w-3 h-3 rounded-full bg-green-500/50" />
                    </div>
                    <span className="ml-4 text-xs font-mono text-slate-text">
                      UAV Detection Demo
                    </span>
                  </div>

                  {/* Content Area */}
                  <div className="absolute top-10 left-0 right-0 bottom-0 p-4">
                    {/* Detection Boxes Animation */}
                    <motion.div
                      className="absolute top-1/4 left-1/4 w-20 h-28 border-2 border-electric-blue"
                      animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.8, 1, 1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                      }}
                    >
                      <span className="absolute -top-5 left-0 text-xs font-mono text-electric-blue bg-navy-dark px-1">
                        Person 0.92
                      </span>
                    </motion.div>

                    <motion.div
                      className="absolute top-1/3 right-1/3 w-16 h-24 border-2 border-cyan-accent"
                      animate={{
                        opacity: [0, 0, 1, 1, 0],
                        scale: [0.8, 0.8, 1, 1, 0.8],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatDelay: 1,
                        delay: 0.5,
                      }}
                    >
                      <span className="absolute -top-5 left-0 text-xs font-mono text-cyan-accent bg-navy-dark px-1">
                        Person 0.85
                      </span>
                    </motion.div>
                  </div>
                </div>

                {/* Scan Line */}
                <motion.div
                  className="absolute left-4 right-4 h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-transparent"
                  animate={{ top: ['10%', '90%', '10%'] }}
                  transition={{ duration: 4, repeat: Infinity }}
                />
              </div>

              {/* Play Button Overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center bg-deep-black/60"
                initial={{ opacity: 1 }}
                animate={{ opacity: isHovered ? 0.8 : 1 }}
              >
                <motion.a
                  href="https://huggingface.co/spaces"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center gap-4 group"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-20 h-20 rounded-full bg-electric-blue/20 border-2 border-electric-blue flex items-center justify-center group-hover:bg-electric-blue/30 transition-colors">
                    <Play className="text-electric-blue ml-1" size={32} />
                  </div>
                  <span className="text-white font-semibold">Launch Interactive Demo</span>
                  <span className="text-sm text-slate-text flex items-center gap-2">
                    Opens on HuggingFace Spaces
                    <ExternalLink size={14} />
                  </span>
                </motion.a>
              </motion.div>
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-electric-blue/50" />
            <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-electric-blue/50" />
            <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-electric-blue/50" />
            <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-electric-blue/50" />
          </div>
        </motion.div>

        {/* Demo Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {demoFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className="text-center p-6"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center">
                  <Icon className="text-electric-blue" size={24} />
                </div>
                <h4 className="font-semibold text-white mb-2">{feature.title}</h4>
                <p className="text-xs text-slate-text">{feature.description}</p>
              </motion.div>
            )
          })}
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="https://huggingface.co/spaces"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center gap-2"
          >
            <Play size={18} />
            Try the Model
          </a>
          <a
            href="https://github.com/shreyamendi/computer-vision-project"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center gap-2"
          >
            View Source Code
            <ExternalLink size={18} />
          </a>
        </motion.div>

        {/* Technical Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-slate-text max-w-xl mx-auto">
            The demo runs on CPU by default. For faster inference, deploy on GPU-enabled
            environments. Model weights are approximately 158MB each.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
