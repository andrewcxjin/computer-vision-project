'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Box, Layers, Zap, Brain, GitBranch, Database } from 'lucide-react'
import { AnimatedText, CountUp } from '../AnimatedText'

const architectureSteps = [
  {
    icon: Database,
    title: 'Input Layer',
    description: '512×512 thermal image',
    detail: 'HIT-UAV thermal dataset',
  },
  {
    icon: Layers,
    title: 'Backbone',
    description: 'ResNet-50 + FPN',
    detail: 'Feature Pyramid Network',
  },
  {
    icon: Brain,
    title: 'Detection Head',
    description: 'Faster R-CNN',
    detail: 'Region Proposal Network',
  },
  {
    icon: Box,
    title: 'Output',
    description: 'Bounding Boxes',
    detail: 'Class + Confidence',
  },
]

const modelComparison = [
  {
    name: 'Model A',
    subtitle: 'Baseline',
    description: 'Trained on clean thermal images only',
    stats: {
      precision: 72.3,
      recall: 84.9,
      f1: 78.1,
      cleanF1Drop: 0,
      perturbedF1Drop: 20.0,
    },
    color: 'electric-blue',
  },
  {
    name: 'Model B',
    subtitle: 'Augmented',
    description: 'Trained with SAR environmental augmentations',
    stats: {
      precision: 69.0,
      recall: 84.7,
      f1: 76.1,
      cleanF1Drop: 0,
      perturbedF1Drop: 7.6,
    },
    color: 'cyan-accent',
    recommended: true,
  },
]

export function TechnologySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="technology"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy/20 to-deep-black" />
      <div className="absolute inset-0 circuit-overlay" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="chapter-number block mb-4">CHAPTER 02</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="Intelligence in the Sky" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl">
            Faster R-CNN and computer vision working in real-time
          </p>
        </motion.div>

        {/* Architecture Pipeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-8">
            Model Architecture
          </h3>

          <div className="relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-blue/50 via-cyan-accent/50 to-electric-blue/50 -translate-y-1/2" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-4">
              {architectureSteps.map((step, index) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                    className="relative"
                  >
                    <div className="tech-card p-6 rounded-lg text-center relative z-10">
                      <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center">
                        <Icon className="text-electric-blue" size={28} />
                      </div>
                      <h4 className="font-semibold text-white mb-1">{step.title}</h4>
                      <p className="text-sm text-cyan-accent mb-2">{step.description}</p>
                      <p className="text-xs text-slate-text">{step.detail}</p>
                    </div>

                    {/* Arrow */}
                    {index < architectureSteps.length - 1 && (
                      <div className="hidden md:flex absolute top-1/2 -right-2 -translate-y-1/2 z-20">
                        <Zap className="text-electric-blue" size={16} />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </motion.div>

        {/* Model Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-16 md:mb-24"
        >
          <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-8">
            Model Variants
          </h3>

          <div className="grid md:grid-cols-2 gap-8">
            {modelComparison.map((model, index) => (
              <motion.div
                key={model.name}
                initial={{ opacity: 0, x: index === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                className={`tech-card p-8 rounded-lg relative ${
                  model.recommended ? 'ring-2 ring-cyan-accent' : ''
                }`}
              >
                {model.recommended && (
                  <span className="absolute -top-3 right-6 px-3 py-1 bg-cyan-accent text-deep-black text-xs font-mono uppercase tracking-wider rounded-full">
                    Recommended
                  </span>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      model.color === 'electric-blue'
                        ? 'bg-electric-blue/20 border border-electric-blue'
                        : 'bg-cyan-accent/20 border border-cyan-accent'
                    }`}
                  >
                    <GitBranch
                      className={
                        model.color === 'electric-blue'
                          ? 'text-electric-blue'
                          : 'text-cyan-accent'
                      }
                      size={24}
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-semibold text-white">{model.name}</h4>
                    <p className="text-sm text-slate-text">{model.subtitle}</p>
                  </div>
                </div>

                <p className="text-slate-text mb-6">{model.description}</p>

                {/* Stats Grid */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-3 rounded bg-navy-dark/50">
                    <span className="block text-2xl font-mono font-bold text-electric-blue">
                      <CountUp end={model.stats.precision} suffix="%" decimals={1} />
                    </span>
                    <span className="text-xs text-slate-text uppercase">Precision</span>
                  </div>
                  <div className="text-center p-3 rounded bg-navy-dark/50">
                    <span className="block text-2xl font-mono font-bold text-cyan-accent">
                      <CountUp end={model.stats.recall} suffix="%" decimals={1} />
                    </span>
                    <span className="text-xs text-slate-text uppercase">Recall</span>
                  </div>
                  <div className="text-center p-3 rounded bg-navy-dark/50">
                    <span className="block text-2xl font-mono font-bold text-white">
                      <CountUp end={model.stats.f1} suffix="%" decimals={1} />
                    </span>
                    <span className="text-xs text-slate-text uppercase">F1 Score</span>
                  </div>
                </div>

                {/* Robustness Indicator */}
                <div className="border-t border-electric-blue/20 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-text">
                      F1 Drop (Adverse Conditions)
                    </span>
                    <span
                      className={`font-mono font-bold ${
                        model.stats.perturbedF1Drop > 15
                          ? 'text-red-400'
                          : 'text-green-400'
                      }`}
                    >
                      -{model.stats.perturbedF1Drop}%
                    </span>
                  </div>
                  <div className="mt-2 h-2 bg-navy-dark rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        model.stats.perturbedF1Drop > 15
                          ? 'bg-red-400/50'
                          : 'bg-green-400/50'
                      }`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${100 - model.stats.perturbedF1Drop * 2}%` } : {}}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Key Finding */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-block p-8 rounded-lg border border-cyan-accent/30 bg-navy-dark/30">
            <p className="text-lg text-slate-text mb-4">Key Finding</p>
            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Model B shows{' '}
              <span className="gradient-text">3× smaller F1 drop</span> under adverse
              conditions
            </p>
            <p className="text-slate-text">
              SAR augmentation training significantly improves robustness to environmental
              challenges like snow and smoke.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
