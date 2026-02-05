'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Upload, Sliders, Eye, Zap, Maximize2, Minimize2 } from 'lucide-react'
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

// HuggingFace Space URL for the embedded demo
const HUGGINGFACE_SPACE_URL = 'https://shreyamendi-uav-human-detection.hf.space'

export function DemoSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [isFullscreen, setIsFullscreen] = useState(false)

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
          className="mb-12 md:mb-16 text-center"
        >
          <span className="chapter-number block mb-4">CHAPTER 05</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="See It In Action" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl mx-auto">
            Try the detection models yourself
          </p>
        </motion.div>

        {/* Embedded Gradio Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className={`mx-auto mb-12 transition-all duration-300 ${
            isFullscreen
              ? 'fixed inset-4 z-50 max-w-none'
              : 'max-w-5xl'
          }`}
        >
          <div className={`relative rounded-xl overflow-hidden border border-electric-blue/30 bg-navy-dark/50 ${
            isFullscreen ? 'h-full' : ''
          }`}>
            {/* Header Bar */}
            <div className="absolute top-0 left-0 right-0 h-10 bg-navy-dark/90 border-b border-electric-blue/20 flex items-center justify-between px-4 z-10">
              <div className="flex items-center gap-4">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <span className="text-xs font-mono text-slate-text">
                  UAV Human Detection - Live Demo
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-1 hover:bg-electric-blue/20 rounded transition-colors"
                title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? (
                  <Minimize2 className="text-slate-text" size={16} />
                ) : (
                  <Maximize2 className="text-slate-text" size={16} />
                )}
              </button>
            </div>

            {/* Gradio Iframe */}
            <div className={`pt-10 ${isFullscreen ? 'h-full' : ''}`}>
              <iframe
                src={HUGGINGFACE_SPACE_URL}
                className={`w-full border-0 ${
                  isFullscreen ? 'h-[calc(100%-40px)]' : 'h-[600px] md:h-[700px]'
                }`}
                title="UAV Human Detection Demo"
                allow="accelerometer; camera; microphone; clipboard-write"
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups allow-downloads"
              />
            </div>

            {/* Corner Decorations */}
            <div className="absolute top-12 left-2 w-6 h-6 border-l-2 border-t-2 border-electric-blue/30 pointer-events-none" />
            <div className="absolute top-12 right-2 w-6 h-6 border-r-2 border-t-2 border-electric-blue/30 pointer-events-none" />
            <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-electric-blue/30 pointer-events-none" />
            <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-electric-blue/30 pointer-events-none" />
          </div>
        </motion.div>

        {/* Fullscreen Backdrop */}
        {isFullscreen && (
          <div
            className="fixed inset-0 bg-deep-black/90 z-40"
            onClick={() => setIsFullscreen(false)}
          />
        )}

        {/* Demo Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
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

        {/* Technical Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center"
        >
          <p className="text-sm text-slate-text max-w-xl mx-auto">
            The demo runs on HuggingFace Spaces. First inference may take a moment to warm up.
            Upload your own thermal images or use the provided examples.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
