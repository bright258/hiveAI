'use client';

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu } from 'lucide-react'
import { Button } from '../../components/ui/button'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <>
      <nav className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <div className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600">
          Hive
        </div>
        <div className="hidden md:flex space-x-4">
          <a href="#" className="hover:text-purple-400 transition-colors">Features</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Pricing</a>
          <a href="#" className="hover:text-purple-400 transition-colors">About</a>
          <a href="#" className="hover:text-purple-400 transition-colors">Contact</a>
        </div>
        <Button
          className="md:hidden bg-purple-500 text-white p-2 rounded-full"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <Menu className="h-6 w-6" />
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
    </>
  )
}