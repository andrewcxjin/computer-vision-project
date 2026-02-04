'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Database, Image, Tag, Thermometer, Snowflake, CloudFog, BarChart3 } from 'lucide-react'
import { AnimatedText, CountUp } from '../AnimatedText'

const datasetFeatures = [
  {
    icon: Thermometer,
    title: 'Thermal Imaging',
    description: 'Infrared captures heat signatures invisible to standard cameras',
  },
  {
    icon: Image,
    title: '2,866 Images',
    description: 'Diverse aerial perspectives from high-altitude UAV platforms',
  },
  {
    icon: Tag,
    title: 'YOLO Format',
    description: 'Standardized bounding box annotations for seamless training',
  },
  {
    icon: Database,
    title: 'HIT-UAV Dataset',
    description: 'High-altitude infrared thermal dataset from Kaggle',
  },
]

const augmentations = [
  {
    name: 'Snow Effect',
    icon: Snowflake,
    description: 'Multi-scale Perlin noise for ground coverage, sparse falling snowflakes, atmospheric blur',
    intensity: '40-70%',
  },
  {
    name: 'Smoke/Fog Effect',
    icon: CloudFog,
    description: 'Dense white-gray fog overlay, Gaussian noise variation, heavy atmospheric blur',
    intensity: '50-75%',
  },
]

const trainingConfig = [
  { label: 'Image Size', value: '512×512' },
  { label: 'Batch Size', value: '4' },
  { label: 'Epochs', value: '6' },
  { label: 'Learning Rate', value: '0.005' },
  { label: 'Optimizer', value: 'SGD' },
  { label: 'IoU Threshold', value: '0.5' },
]

export function DatasetSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="dataset"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy/30 to-deep-black" />
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
          <span className="chapter-number block mb-4">CHAPTER 04</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="Training Vision" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl">
            Building accuracy through diverse aerial perspectives
          </p>
        </motion.div>

        {/* Dataset Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {datasetFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                className="tech-card p-6 rounded-lg text-center"
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

        {/* Training Process */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* SAR Augmentations */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-6">
              SAR Augmentations
            </h3>
            <p className="text-slate-text mb-6">
              Search and Rescue specific augmentations simulate real-world environmental
              challenges, improving model robustness in adverse conditions.
            </p>

            <div className="space-y-4">
              {augmentations.map((aug, index) => {
                const Icon = aug.icon
                return (
                  <motion.div
                    key={aug.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
                    className="tech-card p-6 rounded-lg"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-cyan-accent/10 border border-cyan-accent/30 flex items-center justify-center">
                        <Icon className="text-cyan-accent" size={24} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-semibold text-white">{aug.name}</h4>
                          <span className="text-xs font-mono text-electric-blue bg-electric-blue/10 px-2 py-1 rounded">
                            {aug.intensity}
                          </span>
                        </div>
                        <p className="text-sm text-slate-text">{aug.description}</p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Augmentation Application */}
            <div className="mt-6 p-4 rounded-lg border border-electric-blue/20 bg-navy-dark/30">
              <div className="flex items-center gap-3 mb-2">
                <BarChart3 className="text-electric-blue" size={18} />
                <span className="text-sm font-mono text-cyan-accent">
                  Training Distribution
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-3">
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-text">Clean Images</span>
                    <span className="text-white">50%</span>
                  </div>
                  <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-electric-blue"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '50%' } : {}}
                      transition={{ duration: 1, delay: 1 }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-text">Augmented</span>
                    <span className="text-white">50%</span>
                  </div>
                  <div className="h-2 bg-navy-dark rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-cyan-accent"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: '50%' } : {}}
                      transition={{ duration: 1, delay: 1.2 }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Training Configuration */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-6">
              Training Configuration
            </h3>

            <div className="tech-card p-6 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4">
                {trainingConfig.map((config, index) => (
                  <motion.div
                    key={config.label}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                    className="flex justify-between items-center py-2 border-b border-electric-blue/10 last:border-0"
                  >
                    <span className="text-sm text-slate-text">{config.label}</span>
                    <span className="font-mono text-electric-blue">{config.value}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Performance Metrics Visualization */}
            <div className="tech-card p-6 rounded-lg">
              <h4 className="font-semibold text-white mb-4">Training Progress</h4>

              {/* Simulated Training Curve */}
              <div className="relative h-40 mb-4">
                {/* Y-axis labels */}
                <div className="absolute left-0 top-0 bottom-0 w-12 flex flex-col justify-between text-xs text-slate-text font-mono">
                  <span>1.0</span>
                  <span>0.5</span>
                  <span>0.0</span>
                </div>

                {/* Chart Area */}
                <div className="absolute left-14 right-0 top-0 bottom-0 border-l border-b border-electric-blue/20">
                  {/* Grid lines */}
                  {[...Array(4)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute left-0 right-0 border-t border-electric-blue/10"
                      style={{ top: `${i * 33}%` }}
                    />
                  ))}

                  {/* Loss Curve */}
                  <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                    <motion.path
                      d="M 0 20 Q 50 40, 100 60 T 200 75 T 300 82 T 400 85"
                      fill="none"
                      stroke="url(#lossGradient)"
                      strokeWidth="2"
                      initial={{ pathLength: 0 }}
                      animate={isInView ? { pathLength: 1 } : {}}
                      transition={{ duration: 2, delay: 1 }}
                    />
                    <defs>
                      <linearGradient id="lossGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#00b4d8" />
                        <stop offset="100%" stopColor="#90e0ef" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>

                {/* X-axis labels */}
                <div className="absolute left-14 right-0 -bottom-6 flex justify-between text-xs text-slate-text font-mono">
                  <span>0</span>
                  <span>2</span>
                  <span>4</span>
                  <span>6</span>
                </div>
              </div>

              <div className="text-center text-xs text-slate-text mt-8">
                <span className="text-cyan-accent">Loss</span> over{' '}
                <span className="text-white">Epochs</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Final Metrics Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { label: 'mAP@0.50', value: 77.99, suffix: '%' },
            { label: 'mAP@0.50:0.95', value: 42.97, suffix: '%' },
            { label: 'Best F1', value: 78.08, suffix: '%' },
            { label: 'Mean IoU', value: 68.5, suffix: '%' },
          ].map((metric) => (
            <div
              key={metric.label}
              className="text-center p-6 rounded-lg border border-electric-blue/20 bg-navy-dark/30"
            >
              <span className="block text-3xl md:text-4xl font-bold text-electric-blue font-mono mb-2">
                <CountUp end={metric.value} suffix={metric.suffix} decimals={1} duration={2} />
              </span>
              <span className="text-sm text-slate-text font-mono uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
