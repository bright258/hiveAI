'use client';

import { PricingModalProps } from '../../types/pricingTypes';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, Zap } from 'lucide-react'
import { Button } from '../../components/ui/button'
import { Card, CardContent } from'../../components/ui/card'

const PricingModal: React.FC<PricingModalProps> = ({ showPricing, setShowPricing }) => {
  return (
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
            className="bg-gray-800 rounded-lg p-4 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-purple-400">Choose Your Genius Plan</h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowPricing(false)}
                className="text-gray-300 hover:text-white"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-gray-700 border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-purple-400">Premium</h3>
                  <p className="text-2xl font-bold mb-2 text-white">$10<span className="text-sm font-normal text-gray-300">/month</span></p>
                  <ul className="space-y-1 mb-4 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                      <span>Unlimited audio recordings</span>
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                      <span>AI-powered flashcard generation</span>
                    </li>
                    <li className="flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-purple-400" />
                      <span>Basic analytics</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-purple-500 text-white hover:bg-purple-600 text-sm py-1">
                    Choose Premium
                  </Button>
                </CardContent>
              </Card>
              <Card className="bg-gray-700 border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                <CardContent className="p-4">
                  <h3 className="text-lg font-semibold mb-2 text-pink-400">Premium Pro</h3>
                  <p className="text-2xl font-bold mb-2 text-white">$100<span className="text-sm font-normal text-gray-300">/year</span></p>
                  <ul className="space-y-1 mb-4 text-sm text-gray-300">
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-pink-400" />
                      <span>All Premium features</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Advanced AI customization</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Priority support</span>
                    </li>
                    <li className="flex items-center">
                      <Zap className="h-4 w-4 mr-2 text-pink-400" />
                      <span>Detailed learning analytics</span>
                    </li>
                  </ul>
                  <Button className="w-full bg-pink-500 text-white hover:bg-pink-600 text-sm py-1">
                    Choose Premium Pro
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
};

export default PricingModal;