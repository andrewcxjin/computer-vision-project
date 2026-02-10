'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import {
  Crosshair,
  Thermometer,
  Cpu,
  Layers,
  Radio,
  Workflow,
  ArrowRight,
} from 'lucide-react'
import { AnimatedText } from '../AnimatedText'

const futureCapabilities = [
  {
    icon: Crosshair,
    title: 'Multi-Object Tracking',
    description:
      'Extend detection to continuous tracking across video frames, maintaining identity persistence through occlusions.',
    status: 'In Development',
    progress: 60,
  },
  {
    icon: Thermometer,
    title: 'Enhanced Thermal Analysis',
    description:
      'Integrate temperature-based anomaly detection for medical emergencies and fire hazard identification.',
    status: 'Research',
    progress: 30,
  },
  {
    icon: Cpu,
    title: 'Edge Deployment',
    description:
      'Optimize models for NVIDIA Jetson and similar edge devices for real-time onboard UAV processing.',
    status: 'Planned',
    progress: 15,
  },
  {
    icon: Layers,
    title: 'Multi-Spectral Fusion',
    description:
      'Combine thermal, RGB, and depth data for enhanced detection accuracy in challenging conditions.',
    status: 'Research',
    progress: 25,
  },
  {
    icon: Radio,
    title: 'Swarm Coordination',
    description:
      'Enable multiple UAVs to share detection data and coordinate search patterns autonomously.',
    status: 'Concept',
    progress: 5,
  },
  {
    icon: Workflow,
    title: 'Action Recognition',
    description:
      'Move beyond detection to understand human activities and behaviors from aerial perspectives.',
    status: 'Planned',
    progress: 10,
  },
]

const roadmapPhases = [
  {
    phase: 'Q1 2025',
    title: 'Model Optimization',
    items: ['Quantization for edge devices', 'TensorRT integration', 'Model distillation'],
  },
  {
    phase: 'Q2 2025',
    title: 'Feature Expansion',
    items: ['Multi-object tracking', 'Video pipeline', 'Real-time streaming'],
  },
  {
    phase: 'Q3 2025',
    title: 'Platform Integration',
    items: ['DJI SDK integration', 'PX4 autopilot support', 'Ground station software'],
  },
  {
    phase: 'Q4 2025',
    title: 'Advanced Capabilities',
    items: ['Multi-spectral fusion', 'Swarm coordination', 'Action recognition'],
  },
]

export function FutureSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="future"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy/20 to-deep-black" />
      <div className="absolute inset-0 grid-bg opacity-20" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="chapter-number block mb-4">CHAPTER 06</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="Next Horizons" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl">
            Advancing capabilities for tomorrow&apos;s challenges
          </p>
        </motion.div>

        {/* Future Capabilities Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20"
        >
          {futureCapabilities.map((capability, index) => {
            const Icon = capability.icon
            return (
              <motion.div
                key={capability.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="tech-card p-6 rounded-lg group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center group-hover:bg-electric-blue/20 transition-colors">
                    <Icon className="text-electric-blue" size={24} />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-1">{capability.title}</h4>
                    <span
                      className={`text-xs font-mono uppercase tracking-wider px-2 py-0.5 rounded ${
                        capability.status === 'In Development'
                          ? 'bg-green-500/20 text-green-400'
                          : capability.status === 'Research'
                          ? 'bg-cyan-accent/20 text-cyan-accent'
                          : capability.status === 'Planned'
                          ? 'bg-yellow-500/20 text-yellow-400'
                          : 'bg-slate-500/20 text-slate-400'
                      }`}
                    >
                      {capability.status}
                    </span>
                  </div>
                </div>

                <p className="text-sm text-slate-text mb-4">{capability.description}</p>

                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-text">Progress</span>
                    <span className="text-electric-blue font-mono">
                      {capability.progress}%
                    </span>
                  </div>
                  <div className="h-1 bg-navy-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-electric-blue to-cyan-accent"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${capability.progress}%` } : {}}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* Roadmap Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-8 text-center">
            Development Roadmap
          </h3>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-[2px] bg-gradient-to-r from-electric-blue/50 via-cyan-accent/50 to-electric-blue/50" />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {roadmapPhases.map((phase, index) => (
                <motion.div
                  key={phase.phase}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                  className="relative"
                >
                  {/* Timeline Dot */}
                  <div className="hidden md:flex absolute top-0 left-1/2 -translate-x-1/2 items-center justify-center">
                    <div className="w-4 h-4 rounded-full bg-electric-blue border-4 border-deep-black" />
                  </div>

                  {/* Content Card */}
                  <div className="md:mt-12 tech-card p-6 rounded-lg">
                    <span className="text-xs font-mono text-electric-blue uppercase tracking-wider">
                      {phase.phase}
                    </span>
                    <h4 className="text-lg font-semibold text-white mt-2 mb-4">
                      {phase.title}
                    </h4>
                    <ul className="space-y-2">
                      {phase.items.map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-2 text-sm text-slate-text"
                        >
                          <ArrowRight className="text-cyan-accent flex-shrink-0" size={14} />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Call to Contribute */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 rounded-lg border border-cyan-accent/30 bg-navy-dark/30 max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-4">Join the Mission</h3>
            <p className="text-slate-text mb-6">
              This is an open-source project. We welcome contributions from researchers,
              developers, and organizations working on aerial surveillance and search &
              rescue technologies.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="https://github.com/shreyamendi/computer-vision-project"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Contribute on GitHub
              </a>
              <a
                href="mailto:contact@example.com"
                className="btn-secondary"
              >
                Partner With Us
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
