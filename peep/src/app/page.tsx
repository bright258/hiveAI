'use client';

import { useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Features from '../components/Features'
import DemoSteps from '../components/DemoSteps'
import PricingModal from '../components/PricingModal'
import { Button } from '../../components/ui/button'
import { Sparkles } from 'lucide-react'


export default function Home() {
  const [showPricing, setShowPricing] = useState(false)

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Header />

      <div className="container mx-auto px-4 py-16">
        <Hero />
        <Features />
        <DemoSteps />

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

      <PricingModal showPricing={showPricing} setShowPricing={setShowPricing} />
    </div>
  )
}

export interface PricingModalProps {
  showPricing: boolean;
  setShowPricing: React.Dispatch<React.SetStateAction<boolean>>;
}
