'use client';

import { motion } from 'framer-motion'
import { Mic } from 'lucide-react'
import { Button } from '../../components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Hero() {
  const studentBubbles = [
    { src: "/flashcards.png", alt: "Student 1" },
    { src: "/flashcards.png", alt: "Student 2" },
    { src: "/flashcards.png", alt: "Student 3" },
    { src: "/flashcards.png", alt: "Student 4" },
  ]

  return (
    <>
      <motion.h1 
        className="text-5xl md:text-7xl font-bold text-center mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Hive
      </motion.h1>
      <motion.p 
        className="text-xl text-center mb-12 text-gray-300"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Turn your ramblings into brain-boosting flashcards. You're welcome.
      </motion.p>

      <div className="flex flex-col items-center mb-16 relative">
        <motion.div 
          className="relative mb-8"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            className="w-40 h-40 rounded-full bg-red-500 hover:bg-red-600"
          >
            <Mic className="w-16 h-16 text-white" />
          </Button>
          <motion.div 
            className="absolute -inset-2 rounded-full border-2 border-red-500"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          />
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
        
        <Link href="/record">
          <Button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded">
            Login to Record
          </Button>
        </Link>
      </div>
    </>
  )
}