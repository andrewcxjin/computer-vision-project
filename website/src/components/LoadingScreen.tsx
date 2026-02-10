'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 100)

    return () => clearInterval(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
          className="fixed inset-0 z-50 bg-deep-black flex flex-col items-center justify-center"
        >
          {/* Orbiting Dots */}
          <div className="relative w-24 h-24 mb-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-4 h-4 rounded-full bg-electric-blue opacity-30" />
            </div>
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full bg-cyan-accent"
                style={{
                  top: '50%',
                  left: '50%',
                  marginTop: '-4px',
                  marginLeft: '-4px',
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: 'linear',
                  delay: i * 0.5,
                }}
              >
                <motion.div
                  className="w-2 h-2 rounded-full bg-cyan-accent"
                  style={{
                    transform: `translateX(${30}px)`,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Loading Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center"
          >
            <p className="font-mono text-sm text-slate-text tracking-widest uppercase mb-4">
              Initializing Detection System
            </p>
            <div className="w-48 h-1 bg-navy-dark rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-electric-blue"
                initial={{ width: 0 }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
            <p className="font-mono text-xs text-electric-blue mt-2">
              {Math.round(Math.min(progress, 100))}%
            </p>
          </motion.div>

          {/* Grid Background */}
          <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />

          {/* Scan Line */}
          <motion.div
            className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-electric-blue to-transparent opacity-50"
            animate={{ top: ['0%', '100%'] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
