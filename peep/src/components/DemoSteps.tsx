'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Volume2, Sparkles, Zap } from 'lucide-react'

export default function DemoSteps() {
  const [demoStep, setDemoStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setDemoStep((prev) => (prev + 1) % 4)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const demoSteps = [
    { text: "Capturing your brilliance...", icon: <Mic className="w-12 h-12 text-purple-300" /> },
    { text: "Decoding your genius...", icon: <Volume2 className="w-12 h-12 text-purple-300" /> },
    { text: "Crafting knowledge bombs...", icon: <Sparkles className="w-12 h-12 text-purple-300" /> },
    { text: "Ready to blow your mind!", icon: <Zap className="w-12 h-12 text-purple-300" /> },
  ]

  return (
    <motion.div 
      className="flex flex-col items-center space-y-8 mb-16"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={demoStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center space-y-4"
        >
          <div className="text-purple-400 text-xl font-semibold">{demoSteps[demoStep].text}</div>
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {demoSteps[demoStep].icon}
          </motion.div>
          {demoStep === 3 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5, type: 'spring' }}
              className="bg-gray-800 rounded-lg p-4 border border-gray-700"
            >
              <h3 className="text-purple-400 font-bold">Masterpiece</h3>
              <p className="text-gray-300">Q: What's Hive's superpower?</p>
              <p className="text-gray-300">A: Turning your vocal brilliance into study gold.</p>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}