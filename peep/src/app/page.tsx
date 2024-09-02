'use client';

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, PlayCircle, PauseCircle, Sparkles, Volume2, Zap, X } from 'lucide-react'
import { Button } from '../../components/ui/button';
import { Card, CardContent } from '../../components/ui/card';
import { DropdownMenu} from '../../components/ui/dropdown-menu';
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"

import Image from 'next/image'

export default function Home() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [demoStep, setDemoStep] = useState(0)
  const [showPricing, setShowPricing] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setDemoStep((prev) => (prev + 1) % 4)
      }, 3000)
    } else {
      setDemoStep(0)
    }
    return () => clearInterval(interval)
  }, [isPlaying])

  const demoSteps = [
    { text: "Capturing your brilliance...", icon: <Mic className="w-12 h-12 text-purple-300" /> },
    { text: "Decoding your genius...", icon: <Volume2 className="w-12 h-12 text-purple-300" /> },
    { text: "Crafting knowledge bombs...", icon: <Sparkles className="w-12 h-12 text-purple-300" /> },
    { text: "Ready to blow your mind!", icon: <Zap className="w-12 h-12 text-purple-300" /> },
  ]

  const studentBubbles = [
    { src: "/flashcards.png", alt: "Student 1" },
    { src: "/flashcards.png", alt: "Student 2" },
    { src: "/flashcards.png", alt: "Student 3" },
    { src: "/flashcards.png", alt: "Student 4" },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          AudioFlash
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
        </div>
        <Button
          className="md:hidden"
          variant="ghost"
          size="icon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <DropdownMenu  />
        </Button>
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-gray-800 py-4 px-6 absolute top-16 left-0 right-0 z-50"
          >
            <div className="flex flex-col space-y-4">
              <a href="#" className="hover:text-purple-400 transition-colors">Features</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-purple-400 transition-colors">About</a>
              <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16">
        <motion.h1 
          className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          AudioFlash
        </motion.h1>
        <motion.p 
          className="text-xl text-center mb-12 text-gray-300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Turn your ramblings into brain-boosting flashcards. You're welcome.
        </motion.p>

        <div className="flex justify-center mb-16 relative">
          <motion.div 
            className="relative"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className={`w-40 h-40 rounded-full ${isRecording ? 'bg-red-500 hover:bg-red-600' : 'bg-purple-500 hover:bg-purple-600'}`}
              onClick={() => setIsRecording(!isRecording)}
            >
              <Mic className="w-16 h-16 text-white" />
            </Button>
            {isRecording && (
              <motion.div 
                className="absolute -inset-2 rounded-full border-2 border-red-500"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
            )}
          </motion.div>
          {studentBubbles.map((student, index) => (
            <motion.div
              key={index}
              className="absolute"
              initial={{ x: 0, y: 0 }}
              animate={{
                x: Math.cos(index * Math.PI / 2) * 100,
                y: Math.sin(index * Math.PI / 2) * 100,
              }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 5 + index,
                ease: "easeInOut",
              }}
            >
              <Image
                src={student.src}
                alt={student.alt}
                width={60}
                height={60}
                className="rounded-full border-2 border-purple-400"
              />
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Speak Your Mind</h2>
              <p className="text-gray-300">Unleash your inner genius. We'll capture every witty remark and profound thought.</p>
            </CardContent>
          </Card>
          <Card className="bg-gray-800 border-gray-700">
            <CardContent className="p-6">
              <h2 className="text-2xl font-semibold mb-4 text-purple-400">Flashcards, But Make It Cool</h2>
              <p className="text-gray-300">Our AI turns your words into flashcards so slick, you'll actually want to study. Imagine that.</p>
            </CardContent>
          </Card>
        </div>

        <motion.div 
          className="flex flex-col items-center space-y-8 mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Button 
            className="bg-purple-500 text-white hover:bg-purple-600"
            onClick={() => setIsPlaying(!isPlaying)}
          >
            {isPlaying ? <PauseCircle className="mr-2" /> : <PlayCircle className="mr-2" />}
            {isPlaying ? 'Pause the Magic' : 'See the Magic'}
          </Button>
          
          <AnimatePresence mode="wait">
            {isPlaying && (
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
                    <h3 className="text-purple-400 font-bold">Your Flashcard Masterpiece</h3>
                    <p className="text-gray-300">Q: What's AudioFlash's superpower?</p>
                    <p className="text-gray-300">A: Turning your vocal brilliance into study gold.</p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <div className="flex justify-center">
          <Button 
            className="bg-purple-500 text-white hover:bg-purple-600"
            onClick={() => setShowPricing(true)}
          >
            <Sparkles className="mr-2" />
            Start Your Genius Journey
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {showPricing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowPricing(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-800 rounded-lg p-6 max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-purple-400">Choose Your Genius Plan</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setShowPricing(false)}
                >
                  <X className="h-6 w-6 text-gray-300" />
                </Button>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="bg-gray-700 border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-purple-400">Premium</h3>
                    <p className="text-3xl font-bold mb-4 text-white">$10<span className="text-base font-normal text-gray-300">/month</span></p>
                    <ul className="space-y-2 mb-6 text-gray-300">
                      <li className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                        <span>Unlimited audio recordings</span>
                      </li>
                      <li className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                        <span>AI-powered flashcard generation</span>
                      </li>
                      <li className="flex items-center">
                        <Sparkles className="h-5 w-5 mr-2 text-purple-400" />
                        <span>Basic analytics</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-purple-500 text-white hover:bg-purple-600">
                      Choose Premium
                    </Button>
                  </CardContent>
                </Card>
                <Card className="bg-gray-700 border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-semibold mb-2 text-pink-400">Premium Pro</h3>
                    <p className="text-3xl font-bold mb-4 text-white">$100<span className="text-base font-normal text-gray-300">/year</span></p>
                    <ul className="space-y-2 mb-6 text-gray-300">
                      <li className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-pink-400" />
                        <span>All Premium features</span>
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-pink-400" />
                        <span>Advanced AI customization</span>
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-pink-400" />
                        <span>Priority support</span>
                      </li>
                      <li className="flex items-center">
                        <Zap className="h-5 w-5 mr-2 text-pink-400" />
                        <span>Detailed learning analytics</span>
                      </li>
                    </ul>
                    <Button className="w-full bg-pink-500 text-white hover:bg-pink-600">
                      Choose Premium Pro
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}