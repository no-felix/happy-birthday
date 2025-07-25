'use client'

import { motion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { MESSAGES } from '@/lib/utils'

interface WelcomeStageProps {
  onNext: () => void
}

export function WelcomeStage({ onNext }: WelcomeStageProps) {
  return (
    <div className="min-h-screen flex items-center justify-center relative z-10">
      <div className="text-center max-w-4xl mx-auto px-6">
        {/* Sparkle decorations */}
        <motion.div
          className="absolute top-10 left-10 text-4xl"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.2, 1]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.div>
        
        <motion.div
          className="absolute top-20 right-16 text-3xl"
          animate={{ 
            rotate: [360, 0],
            scale: [1, 1.3, 1]
          }}
          transition={{ 
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        >
          🎉
        </motion.div>

        <motion.div
          className="absolute bottom-32 left-20 text-2xl"
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 15, -15, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          🎂
        </motion.div>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.h1 
            className="text-7xl md:text-8xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "'Inter', sans-serif" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ 
              duration: 2,
              delay: 0.5,
              staggerChildren: 0.1
            }}
          >
            {MESSAGES.welcome.title.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5,
                  delay: 0.5 + index * 0.05
                }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 2 }}
          >
            {MESSAGES.welcome.subtitle}
          </motion.p>

          <motion.div
            className="text-6xl md:text-7xl mb-12"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ 
              duration: 0.8,
              delay: 2.5,
              type: "spring",
              bounce: 0.4
            }}
          >
            18
          </motion.div>

          <motion.button
            onClick={onNext}
            className="group relative px-12 py-4 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full text-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="flex items-center gap-3">
              <Sparkles className="w-5 h-5" />
              {MESSAGES.welcome.button}
              <Sparkles className="w-5 h-5" />
            </span>
            
            {/* Shimmer effect */}
            <div className="absolute inset-0 rounded-full shimmer opacity-30" />
          </motion.button>
        </motion.div>

        {/* Floating elements */}
        <motion.div
          className="absolute top-1/4 right-8 text-yellow-400 text-3xl"
          animate={{ 
            y: [0, -15, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{ 
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          🌟
        </motion.div>

        <motion.div
          className="absolute bottom-1/4 right-12 text-pink-400 text-2xl"
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ 
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5
          }}
        >
          🎈
        </motion.div>
      </div>
    </div>
  )
}
