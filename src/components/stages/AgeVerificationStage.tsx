'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { MESSAGES } from '@/lib/utils'

interface AgeVerificationStageProps {
  onNext: () => void
}

export function AgeVerificationStage({ onNext }: AgeVerificationStageProps) {
  const [age, setAge] = useState('')
  const [showError, setShowError] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    if (age === '18') {
      setShowError(false)
      setShowSuccess(true)
      
      // Create confetti effect
      createConfetti()
      
      setTimeout(() => {
        onNext()
      }, 3000)
    } else {
      setShowError(true)
      setShowSuccess(false)
      
      // Clear error after 3 seconds
      setTimeout(() => {
        setShowError(false)
      }, 3000)
    }
  }

  const createConfetti = () => {
    // Using a more React-friendly approach
    const confettiContainer = document.createElement('div')
    confettiContainer.style.position = 'fixed'
    confettiContainer.style.top = '0'
    confettiContainer.style.left = '0'
    confettiContainer.style.width = '100vw'
    confettiContainer.style.height = '100vh'
    confettiContainer.style.pointerEvents = 'none'
    confettiContainer.style.zIndex = '1000'
    
    document.body.appendChild(confettiContainer)
    
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57']
    
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'absolute'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = '-10px'
      confetti.style.width = '10px'
      confetti.style.height = '10px'
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = '50%'
      
      confettiContainer.appendChild(confetti)
      
      const animation = confetti.animate([
        { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 2000 + 1000,
        easing: 'ease-out'
      })
      
      animation.onfinish = () => confetti.remove()
    }
    
    // Clean up container after animations
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer)
      }
    }, 4000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center max-w-2xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {MESSAGES.ageVerification.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {MESSAGES.ageVerification.subtitle}
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="relative">
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder={MESSAGES.ageVerification.placeholder}
                className="w-full px-6 py-4 text-2xl text-center bg-gray-800/50 border-2 border-gray-600 rounded-xl focus:border-yellow-400 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                min="1"
                max="99"
              />
              
              <AnimatePresence>
                {showError && (
                  <motion.div
                    className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-2 text-red-400"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <X className="w-5 h-5" />
                    {MESSAGES.ageVerification.error}
                  </motion.div>
                )}
                
                {showSuccess && (
                  <motion.div
                    className="absolute -bottom-16 left-0 right-0 flex items-center justify-center gap-2 text-green-400"
                    initial={{ opacity: 0, y: -10, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5 }}
                  >
                    <Check className="w-5 h-5" />
                    {MESSAGES.ageVerification.success}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="h-16"></div> {/* Spacer to prevent collision */}

            <motion.button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={!age}
            >
              Bestätigen
            </motion.button>
          </motion.form>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-20 left-10 text-4xl"
            animate={{ 
              rotate: [0, 15, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            🔓
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 text-3xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 10, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            🎯
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
