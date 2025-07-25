'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Gift, Sparkles, Heart } from 'lucide-react'
import { MESSAGES } from '@/lib/utils'

interface BigRevealStageProps {
  onRestart: () => void
}

export function BigRevealStage({ onRestart }: BigRevealStageProps) {
  const [showGift, setShowGift] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showFinalMessage, setShowFinalMessage] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => setShowGift(true), 1000)
    const timer2 = setTimeout(() => setShowMessage(true), 3000)
    const timer3 = setTimeout(() => setShowFinalMessage(true), 5000)

    // Create continuous confetti with rate limiting
    let confettiCount = 0
    const maxConfetti = 50 // Limit total confetti to prevent performance issues
    
    const confettiInterval = setInterval(() => {
      if (confettiCount < maxConfetti) {
        createConfetti()
        confettiCount++
      }
    }, 300)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
      clearInterval(confettiInterval)
    }
  }, [])

  const createConfetti = () => {
    // Using a more React-friendly approach with container management
    const confettiContainer = document.createElement('div')
    confettiContainer.style.position = 'fixed'
    confettiContainer.style.top = '0'
    confettiContainer.style.left = '0'
    confettiContainer.style.width = '100vw'
    confettiContainer.style.height = '100vh'
    confettiContainer.style.pointerEvents = 'none'
    confettiContainer.style.zIndex = '1000'
    
    document.body.appendChild(confettiContainer)
    
    const colors = ['#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF']
    
    for (let i = 0; i < 15; i++) {
      const confetti = document.createElement('div')
      confetti.style.position = 'absolute'
      confetti.style.left = Math.random() * 100 + '%'
      confetti.style.top = '-10px'
      confetti.style.width = Math.random() * 10 + 5 + 'px'
      confetti.style.height = confetti.style.width
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0%'
      
      confettiContainer.appendChild(confetti)
      
      const animation = confetti.animate([
        { transform: 'translateY(-10px) rotate(0deg)', opacity: 1 },
        { transform: `translateY(100vh) rotate(${Math.random() * 720}deg)`, opacity: 0 }
      ], {
        duration: Math.random() * 3000 + 2000,
        easing: 'ease-out'
      })
      
      animation.onfinish = () => confetti.remove()
    }
    
    // Clean up container after a short delay
    setTimeout(() => {
      if (confettiContainer.parentNode) {
        confettiContainer.parentNode.removeChild(confettiContainer)
      }
    }, 6000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 overflow-hidden">
      <div className="text-center max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1 
            className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            {MESSAGES.bigReveal.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {MESSAGES.bigReveal.subtitle}
          </motion.p>

          {/* Gift Box Animation */}
          <AnimatePresence>
            {showGift && (
              <motion.div
                className="mb-12"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  type: "spring", 
                  bounce: 0.6, 
                  duration: 1.5 
                }}
              >
                <motion.div
                  className="relative inline-block"
                  animate={{ 
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0]
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <Gift className="w-32 h-32 text-yellow-400 mx-auto" />
                  
                  {/* Sparkles around gift */}
                  <motion.div
                    className="absolute -top-4 -right-4 text-3xl"
                    animate={{ 
                      scale: [1, 1.5, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-4 -left-4 text-2xl"
                    animate={{ 
                      scale: [1, 1.3, 1],
                      rotate: [360, 180, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      delay: 0.5
                    }}
                  >
                    🌟
                  </motion.div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reveal Message */}
          <AnimatePresence>
            {showMessage && (
              <motion.div
                className="bg-gradient-to-br from-yellow-400/20 to-yellow-600/20 rounded-3xl p-8 mb-8 backdrop-blur-sm border-2 border-yellow-400/50"
                initial={{ opacity: 0, scale: 0.5, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ 
                  type: "spring", 
                  bounce: 0.4, 
                  duration: 1 
                }}
              >
                <motion.div
                  className="text-6xl mb-6"
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                >
                  🎊
                </motion.div>

                <motion.h2
                  className="text-4xl font-bold mb-6 text-yellow-400"
                  style={{ fontFamily: "'Inter', sans-serif" }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Herzlichen Glückwunsch zum 18. Geburtstag!
                </motion.h2>

                <motion.p
                  className="text-xl text-gray-200 leading-relaxed mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Du hast es geschafft! Du bist jetzt offiziell erwachsen und bereit für alle 
                  Abenteuer, die das Leben für dich bereithält. Möge dieses neue Kapitel 
                  voller Freude, Erfolg und wunderbarer Überraschungen sein!
                </motion.p>

                <motion.div
                  className="flex justify-center gap-4 text-4xl"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <motion.span animate={{ rotate: [0, 360] }} transition={{ duration: 2, repeat: Infinity }}>
                    🎉
                  </motion.span>
                  <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.3 }}>
                    🎂
                  </motion.span>
                  <motion.span animate={{ rotate: [360, 0] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.6 }}>
                    🎈
                  </motion.span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Final Message */}
          <AnimatePresence>
            {showFinalMessage && (
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                <motion.button
                  onClick={onRestart}
                  className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ 
                    type: "spring", 
                    bounce: 0.5,
                    delay: 1 
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Nochmal erleben
                    <Sparkles className="w-5 h-5" />
                  </span>
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating decorative elements */}
          <motion.div
            className="absolute top-10 left-10 text-5xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -20, 0],
              rotate: [0, 360],
              scale: [1, 1.4, 1]
            }}
            transition={{ 
              opacity: { duration: 0.3, delay: 2 },
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
            }}
          >
            🌟
          </motion.div>

          <motion.div
            className="absolute top-20 right-10 text-4xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -15, 0],
              rotate: [0, -360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              opacity: { duration: 0.3, delay: 2.2 },
              y: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
              rotate: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 },
              scale: { duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
          >
            🎊
          </motion.div>

          <motion.div
            className="absolute bottom-20 left-16 text-4xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              scale: [1, 1.3, 1]
            }}
            transition={{ 
              opacity: { duration: 0.3, delay: 2.4 },
              x: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
              rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 },
              scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }
            }}
          >
            🎁
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-20 text-3xl"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: 1,
              y: [0, -25, 0],
              rotate: [0, 720],
              scale: [1, 1.5, 1]
            }}
            transition={{ 
              opacity: { duration: 0.3, delay: 2.6 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
              scale: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            }}
          >
            🎉
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
