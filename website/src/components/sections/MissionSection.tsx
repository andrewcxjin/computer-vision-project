'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { Search, ShieldAlert, Users, Mountain, Target } from 'lucide-react'
import { AnimatedText, CountUp } from '../AnimatedText'

const applications = [
  {
    icon: Search,
    title: 'Search & Rescue',
    description:
      'Locate missing persons in remote terrain, disaster zones, and challenging environments where traditional search methods fail.',
  },
  {
    icon: ShieldAlert,
    title: 'Disaster Response',
    description:
      'Rapidly assess affected areas after natural disasters to identify survivors and prioritize rescue operations.',
  },
  {
    icon: Users,
    title: 'Security & Surveillance',
    description:
      'Monitor large-scale events, borders, and critical infrastructure with automated threat detection capabilities.',
  },
  {
    icon: Mountain,
    title: 'Remote Monitoring',
    description:
      'Survey inaccessible areas for human activity in conservation zones, mining operations, and construction sites.',
  },
]

export function MissionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section
      id="mission"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy-dark/30 to-deep-black"
        style={{ y: backgroundY }}
      />
      <div className="absolute inset-0 grid-bg opacity-30" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Chapter Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <span className="chapter-number block mb-4">CHAPTER 01</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="Seeing from Above" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl">
            AI-powered human detection transforming aerial surveillance
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Description */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-slate-text leading-relaxed mb-6">
                Unmanned Aerial Vehicles (UAVs) equipped with computer vision represent
                a paradigm shift in how we approach human detection challenges. By
                combining thermal imaging with deep learning, we can see what the human
                eye cannot.
              </p>
              <p className="text-lg text-slate-text leading-relaxed mb-8">
                Our Faster R-CNN models, trained on the HIT-UAV thermal dataset, achieve
                reliable detection across diverse conditions—from clear weather to
                snow-covered terrain and smoke-filled disaster zones.
              </p>
            </div>

            {/* Detection Visualization */}
            <div className="relative aspect-video rounded-lg overflow-hidden border border-electric-blue/30 bg-navy-dark/50">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Simulated Detection View */}
                <div className="relative w-full h-full p-4">
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 grid-bg opacity-50" />

                  {/* Scan Line */}
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-transparent"
                    animate={{ top: ['0%', '100%', '0%'] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
                  />

                  {/* Detection Boxes */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1 }}
                    className="absolute top-[20%] left-[15%] w-16 h-24 border-2 border-electric-blue detection-box"
                  >
                    <span className="absolute -top-6 left-0 text-xs font-mono text-electric-blue bg-navy-dark px-1">
                      Person 0.94
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.3 }}
                    className="absolute top-[30%] right-[25%] w-14 h-20 border-2 border-cyan-accent detection-box"
                  >
                    <span className="absolute -top-6 left-0 text-xs font-mono text-cyan-accent bg-navy-dark px-1">
                      Person 0.87
                    </span>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    className="absolute bottom-[25%] left-[40%] w-12 h-18 border-2 border-electric-blue detection-box"
                  >
                    <span className="absolute -top-6 left-0 text-xs font-mono text-electric-blue bg-navy-dark px-1">
                      Person 0.79
                    </span>
                  </motion.div>

                  {/* Crosshair Center */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Target className="text-electric-blue/30" size={48} />
                  </div>

                  {/* Corner Brackets */}
                  <div className="absolute top-2 left-2 w-8 h-8 border-l-2 border-t-2 border-electric-blue/50" />
                  <div className="absolute top-2 right-2 w-8 h-8 border-r-2 border-t-2 border-electric-blue/50" />
                  <div className="absolute bottom-2 left-2 w-8 h-8 border-l-2 border-b-2 border-electric-blue/50" />
                  <div className="absolute bottom-2 right-2 w-8 h-8 border-r-2 border-b-2 border-electric-blue/50" />

                  {/* Status Bar */}
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
                    <span className="font-mono text-xs text-cyan-accent">
                      THERMAL VIEW
                    </span>
                    <span className="font-mono text-xs text-electric-blue">
                      3 DETECTIONS
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column - Applications */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-6"
          >
            <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-8">
              Applications
            </h3>

            {applications.map((app, index) => {
              const Icon = app.icon
              return (
                <motion.div
                  key={app.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                  className="tech-card p-6 rounded-lg group"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-electric-blue/10 border border-electric-blue/30 flex items-center justify-center group-hover:bg-electric-blue/20 transition-colors">
                      <Icon className="text-electric-blue" size={24} />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-2">
                        {app.title}
                      </h4>
                      <p className="text-slate-text text-sm leading-relaxed">
                        {app.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: 2866, suffix: '', label: 'Thermal Images' },
            { value: 512, suffix: 'px', label: 'Input Resolution' },
            { value: 5, suffix: '', label: 'Object Classes' },
            { value: 2, suffix: '', label: 'Model Variants' },
          ].map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-lg border border-electric-blue/20 bg-navy-dark/30"
            >
              <span className="block text-3xl md:text-4xl font-bold text-electric-blue font-mono mb-2">
                <CountUp
                  end={stat.value}
                  suffix={stat.suffix}
                  decimals={0}
                  duration={2}
                />
              </span>
              <span className="text-sm text-slate-text font-mono uppercase tracking-wider">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
