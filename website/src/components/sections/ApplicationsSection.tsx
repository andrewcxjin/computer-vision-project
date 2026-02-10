'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import {
  MapPin,
  Search,
  Shield,
  Building2,
  Trees,
  HardHat,
  Flame,
  Users,
  ChevronRight,
} from 'lucide-react'
import { AnimatedText } from '../AnimatedText'

const useCases = [
  {
    id: 'sar',
    icon: Search,
    title: 'Search & Rescue',
    location: 'Mountain Terrain',
    description:
      'Thermal imaging cuts through darkness, fog, and dense vegetation to locate missing hikers, lost children, and disaster victims in remote wilderness areas.',
    stats: [
      { label: 'Search Area', value: '10x faster' },
      { label: 'Night Ops', value: 'Full capability' },
      { label: 'Terrain', value: 'All types' },
    ],
    coordinates: { lat: 46.8523, lng: -121.7603 },
  },
  {
    id: 'disaster',
    icon: Flame,
    title: 'Disaster Response',
    location: 'Urban & Rural',
    description:
      'Rapidly assess earthquake damage, flood zones, and wildfire boundaries. Identify survivors trapped in collapsed structures through thermal signatures.',
    stats: [
      { label: 'Response Time', value: '-60%' },
      { label: 'Coverage', value: '500+ acres/hr' },
      { label: 'Accuracy', value: '85%+ recall' },
    ],
    coordinates: { lat: 34.0522, lng: -118.2437 },
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Event Security',
    location: 'Large Venues',
    description:
      'Monitor crowd density, detect unauthorized access, and track suspicious behavior patterns at concerts, sporting events, and public gatherings.',
    stats: [
      { label: 'Crowd Size', value: '100K+' },
      { label: 'Real-time', value: '<1s latency' },
      { label: 'Coverage', value: '360° view' },
    ],
    coordinates: { lat: 51.5074, lng: -0.1278 },
  },
  {
    id: 'infrastructure',
    icon: Building2,
    title: 'Infrastructure',
    location: 'Critical Facilities',
    description:
      'Protect power plants, data centers, and government buildings with continuous perimeter monitoring and automated intruder detection.',
    stats: [
      { label: 'Perimeter', value: '24/7' },
      { label: 'False Alarms', value: '-80%' },
      { label: 'Detection', value: '<5s' },
    ],
    coordinates: { lat: 38.8977, lng: -77.0365 },
  },
  {
    id: 'conservation',
    icon: Trees,
    title: 'Wildlife Conservation',
    location: 'Protected Areas',
    description:
      'Track poacher activity, monitor ranger patrols, and ensure human safety in wildlife reserves without disturbing animal populations.',
    stats: [
      { label: 'Poaching', value: '-75%' },
      { label: 'Area', value: '1000+ km²' },
      { label: 'Integration', value: 'Real-time' },
    ],
    coordinates: { lat: -2.3333, lng: 34.8333 },
  },
  {
    id: 'construction',
    icon: HardHat,
    title: 'Construction Safety',
    location: 'Work Sites',
    description:
      'Monitor worker locations in hazardous zones, ensure PPE compliance from aerial view, and coordinate evacuation during emergencies.',
    stats: [
      { label: 'Incidents', value: '-40%' },
      { label: 'Compliance', value: '95%+' },
      { label: 'Site Coverage', value: 'Full' },
    ],
    coordinates: { lat: 25.2048, lng: 55.2708 },
  },
]

export function ApplicationsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeCase, setActiveCase] = useState(useCases[0])

  return (
    <section
      id="applications"
      ref={ref}
      className="relative min-h-screen py-24 md:py-32 overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-deep-black via-navy-dark/20 to-deep-black" />
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
          <span className="chapter-number block mb-4">CHAPTER 03</span>
          <h2 className="section-title font-bold mb-4">
            <AnimatedText text="Impact Across Industries" />
          </h2>
          <p className="text-xl md:text-2xl text-cyan-accent font-light max-w-2xl">
            From rescue missions to smart cities
          </p>
        </motion.div>

        {/* Interactive Grid */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Use Case Selector */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-1 space-y-3"
          >
            {useCases.map((useCase) => {
              const Icon = useCase.icon
              const isActive = activeCase.id === useCase.id
              return (
                <button
                  key={useCase.id}
                  onClick={() => setActiveCase(useCase)}
                  className={`w-full text-left p-4 rounded-lg transition-all duration-300 flex items-center gap-4 group ${
                    isActive
                      ? 'bg-electric-blue/10 border border-electric-blue'
                      : 'bg-navy-dark/30 border border-transparent hover:border-electric-blue/30'
                  }`}
                >
                  <div
                    className={`w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                      isActive
                        ? 'bg-electric-blue text-deep-black'
                        : 'bg-navy-dark text-electric-blue group-hover:bg-electric-blue/20'
                    }`}
                  >
                    <Icon size={20} />
                  </div>
                  <div className="flex-1">
                    <span
                      className={`block font-semibold ${
                        isActive ? 'text-white' : 'text-slate-text'
                      }`}
                    >
                      {useCase.title}
                    </span>
                    <span className="text-xs text-slate-text">{useCase.location}</span>
                  </div>
                  <ChevronRight
                    className={`transition-transform ${
                      isActive ? 'text-electric-blue rotate-90' : 'text-slate-text'
                    }`}
                    size={16}
                  />
                </button>
              )
            })}
          </motion.div>

          {/* Detail Panel */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="lg:col-span-2"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="tech-card rounded-lg overflow-hidden"
              >
                {/* Map/Visual Area */}
                <div className="relative h-64 bg-navy-dark/50 overflow-hidden">
                  {/* Grid Overlay */}
                  <div className="absolute inset-0 grid-bg opacity-50" />

                  {/* Coordinate Display */}
                  <div className="absolute top-4 left-4 font-mono text-xs">
                    <span className="text-slate-text">LAT: </span>
                    <span className="text-electric-blue">
                      {activeCase.coordinates.lat.toFixed(4)}°
                    </span>
                    <span className="text-slate-text ml-4">LNG: </span>
                    <span className="text-electric-blue">
                      {activeCase.coordinates.lng.toFixed(4)}°
                    </span>
                  </div>

                  {/* Location Pin Animation */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                  >
                    <div className="relative">
                      <motion.div
                        className="absolute inset-0 rounded-full bg-electric-blue/20"
                        animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="relative z-10 w-16 h-16 rounded-full bg-electric-blue/20 border border-electric-blue flex items-center justify-center">
                        <MapPin className="text-electric-blue" size={24} />
                      </div>
                    </div>
                  </motion.div>

                  {/* Scan Lines */}
                  <motion.div
                    className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-accent/50 to-transparent"
                    animate={{ top: ['0%', '100%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />

                  {/* Corner Brackets */}
                  <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-electric-blue/50" />
                  <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-electric-blue/50" />
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-4">
                    {(() => {
                      const Icon = activeCase.icon
                      return <Icon className="text-electric-blue" size={28} />
                    })()}
                    <div>
                      <h3 className="text-2xl font-bold text-white">
                        {activeCase.title}
                      </h3>
                      <span className="text-sm text-cyan-accent">
                        {activeCase.location}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-text mb-6 leading-relaxed">
                    {activeCase.description}
                  </p>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    {activeCase.stats.map((stat) => (
                      <div
                        key={stat.label}
                        className="text-center p-4 rounded bg-navy-dark/50"
                      >
                        <span className="block text-xl font-bold text-electric-blue font-mono">
                          {stat.value}
                        </span>
                        <span className="text-xs text-slate-text uppercase">
                          {stat.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Global Deployment Map Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full border border-electric-blue/30 bg-navy-dark/30">
            <Users className="text-electric-blue" size={20} />
            <span className="text-slate-text">
              Potential deployment across{' '}
              <span className="text-cyan-accent font-semibold">6 industries</span> and{' '}
              <span className="text-cyan-accent font-semibold">50+ use cases</span>
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
