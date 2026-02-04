'use client'

import { motion } from 'framer-motion'
import { Github, ExternalLink, Heart, Cpu, Box, Layers } from 'lucide-react'

const technologies = [
  { name: 'PyTorch', url: 'https://pytorch.org/' },
  { name: 'Faster R-CNN', url: 'https://arxiv.org/abs/1506.01497' },
  { name: 'HuggingFace', url: 'https://huggingface.co/' },
  { name: 'Gradio', url: 'https://gradio.app/' },
  { name: 'OpenCV', url: 'https://opencv.org/' },
  { name: 'HIT-UAV Dataset', url: 'https://www.kaggle.com/datasets/pandrii000/hituav-a-highaltitude-infrared-thermal-dataset' },
]

const links = [
  {
    title: 'Resources',
    items: [
      { name: 'GitHub Repository', url: 'https://github.com/shreyamendi/computer-vision-project' },
      { name: 'HuggingFace Demo', url: 'https://huggingface.co/spaces' },
      { name: 'Documentation', url: 'https://github.com/shreyamendi/computer-vision-project#readme' },
      { name: 'Training Notebook', url: 'https://github.com/shreyamendi/computer-vision-project/blob/main/notebooks/uav_human_detection.ipynb' },
    ],
  },
  {
    title: 'Project',
    items: [
      { name: 'Model A (Baseline)', url: '#technology' },
      { name: 'Model B (Augmented)', url: '#technology' },
      { name: 'Dataset Info', url: '#dataset' },
      { name: 'Future Roadmap', url: '#future' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="relative py-16 md:py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-dark/50 to-deep-black" />
      <div className="absolute inset-0 grid-bg opacity-10" />

      {/* Top Border */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-electric-blue/50 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Made Possible By */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h3 className="text-lg font-mono uppercase tracking-wider text-cyan-accent mb-8">
            Made Possible By
          </h3>
          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech) => (
              <a
                key={tech.name}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full border border-electric-blue/30 bg-navy-dark/30 text-slate-text hover:text-cyan-accent hover:border-electric-blue transition-colors text-sm"
              >
                {tech.name}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Links Grid */}
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          {/* Brand Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 border border-electric-blue rounded-lg flex items-center justify-center">
                <span className="font-mono text-electric-blue text-sm">UAV</span>
              </div>
              <div>
                <span className="block font-semibold text-white">
                  UAV Human Detection
                </span>
                <span className="text-xs text-slate-text">2025 Showcase</span>
              </div>
            </div>
            <p className="text-sm text-slate-text mb-6">
              AI-powered human detection from aerial perspectives. Built for search &
              rescue, disaster response, and security applications.
            </p>
            <div className="flex gap-4">
              <a
                href="https://github.com/shreyamendi/computer-vision-project"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg border border-electric-blue/30 bg-navy-dark/30 flex items-center justify-center text-slate-text hover:text-electric-blue hover:border-electric-blue transition-colors"
              >
                <Github size={20} />
              </a>
            </div>
          </motion.div>

          {/* Link Columns */}
          {links.map((column, index) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.1 }}
            >
              <h4 className="font-semibold text-white mb-4">{column.title}</h4>
              <ul className="space-y-3">
                {column.items.map((item) => (
                  <li key={item.name}>
                    <a
                      href={item.url}
                      target={item.url.startsWith('http') ? '_blank' : undefined}
                      rel={item.url.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="text-sm text-slate-text hover:text-cyan-accent transition-colors flex items-center gap-2"
                    >
                      {item.name}
                      {item.url.startsWith('http') && (
                        <ExternalLink size={12} className="opacity-50" />
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-8 py-8 border-y border-electric-blue/20 mb-8"
        >
          <div className="flex items-center gap-2 text-sm text-slate-text">
            <Cpu size={16} className="text-electric-blue" />
            <span>Faster R-CNN + ResNet50-FPN</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-text">
            <Layers size={16} className="text-electric-blue" />
            <span>2 Model Variants</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-text">
            <Box size={16} className="text-electric-blue" />
            <span>158MB Model Size</span>
          </div>
        </motion.div>

        {/* Copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-text"
        >
          <p>
            &copy; {new Date().getFullYear()} UAV Human Detection Project. Open source
            under MIT License.
          </p>
          <p className="flex items-center gap-1">
            Built with <Heart size={14} className="text-red-400" /> using Next.js &
            Framer Motion
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
