'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Send } from 'lucide-react'
import { MESSAGES, DREAM_CATEGORIES } from '@/lib/utils'

interface DreamsStageProps {
  onNext: () => void
}

interface Dream {
  categoryId: number
  text: string
}

export function DreamsStage({ onNext }: DreamsStageProps) {
  const [dreams, setDreams] = useState<Dream[]>([])
  const [currentInput, setCurrentInput] = useState('')
  const [currentCategory, setCurrentCategory] = useState(0)
  const [showDreams, setShowDreams] = useState(false)

  const handleSubmitDream = () => {
    if (currentInput.trim()) {
      const newDream: Dream = {
        categoryId: DREAM_CATEGORIES[currentCategory].id,
        text: currentInput.trim()
      }
      
      setDreams([...dreams, newDream])
      setCurrentInput('')
      
      // Move to next category or show dreams
      if (currentCategory < DREAM_CATEGORIES.length - 1) {
        setCurrentCategory(currentCategory + 1)
      } else {
        setShowDreams(true)
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmitDream()
    }
  }

  const getCurrentCategory = () => DREAM_CATEGORIES[currentCategory]

  if (showDreams) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10 py-12">
        <div className="text-center max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-6xl font-bold mb-6 gradient-text"
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              Deine Träume-Konstellation ✨
            </motion.h1>

            <motion.p
              className="text-xl text-gray-300 mb-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Mögen all deine Träume wahr werden!
            </motion.p>

            {/* Dreams Display */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
              {dreams.map((dream, index) => {
                const category = DREAM_CATEGORIES.find(cat => cat.id === dream.categoryId)
                return (
                  <motion.div
                    key={index}
                    className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-2xl p-6 backdrop-blur-sm border-2 border-purple-400/30"
                    initial={{ opacity: 0, scale: 0.5, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      delay: index * 0.3,
                      type: "spring",
                      bounce: 0.4
                    }}
                  >
                    <div className="text-4xl mb-4">{category?.emoji}</div>
                    <h3 className="text-lg font-semibold text-purple-300 mb-3">
                      {category?.title}
                    </h3>
                    <p className="text-gray-200 leading-relaxed">
                      {dream.text}
                    </p>
                    <div className="mt-4 text-yellow-400">
                      {category?.icon}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <motion.button
              onClick={onNext}
              className="group px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: dreams.length * 0.3 + 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center gap-2">
                Weiter zur nächsten Überraschung
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>

            {/* Floating stars */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-yellow-400 text-2xl pointer-events-none"
                style={{
                  left: `${15 + i * 15}%`,
                  top: `${20 + (i % 2) * 30}%`
                }}
                animate={{
                  y: [0, -20, 0],
                  rotate: [0, 360],
                  scale: [1, 1.3, 1]
                }}
                transition={{
                  duration: 3 + i,
                  repeat: Infinity,
                  delay: i * 0.5
                }}
              >
                ⭐
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative z-10 py-12">
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
            {MESSAGES.memoryLane.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {MESSAGES.memoryLane.subtitle}
          </motion.p>

          {/* Progress indicator */}
          <div className="flex justify-center items-center gap-2 mb-8">
            {DREAM_CATEGORIES.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index < currentCategory 
                    ? 'bg-green-400' 
                    : index === currentCategory
                    ? 'bg-yellow-400'
                    : 'bg-gray-600'
                }`}
              />
            ))}
          </div>

          {/* Current Category */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentCategory}
              className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 backdrop-blur-sm border-2 border-gray-600"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="text-6xl mb-6"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
              >
                {getCurrentCategory().emoji}
              </motion.div>

              <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                {getCurrentCategory().title}
              </h2>

              <div className="mb-6">
                <textarea
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={getCurrentCategory().placeholder}
                  className="w-full h-32 px-4 py-3 bg-gray-700/50 border-2 border-gray-600 rounded-xl focus:border-yellow-400 focus:outline-none transition-all duration-300 resize-none text-lg"
                  maxLength={200}
                />
                <div className="text-right text-sm text-gray-400 mt-2">
                  {currentInput.length}/200
                </div>
              </div>

              <motion.button
                onClick={handleSubmitDream}
                disabled={!currentInput.trim()}
                className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: currentInput.trim() ? 1.05 : 1 }}
                whileTap={{ scale: currentInput.trim() ? 0.95 : 1 }}
              >
                <span className="flex items-center gap-2">
                  {currentCategory < DREAM_CATEGORIES.length - 1 ? 'Weiter' : 'Träume zeigen'}
                  <Send className="w-4 h-4" />
                </span>
              </motion.button>
            </motion.div>
          </AnimatePresence>

          {/* Dreams counter */}
          <motion.p
            className="text-gray-400 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            {dreams.length} von {DREAM_CATEGORIES.length} Träumen geteilt
          </motion.p>

          {/* Skip option after first dream */}
          {dreams.length > 0 && (
            <motion.button
              onClick={() => setShowDreams(true)}
              className="mt-4 text-gray-400 hover:text-gray-200 underline"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              Zu meinen Träumen springen
            </motion.button>
          )}

          {/* Decorative elements */}
          <motion.div
            className="absolute top-20 left-10 text-4xl"
            animate={{ 
              rotate: [0, 360],
              scale: [1, 1.2, 1]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            💫
          </motion.div>

          <motion.div
            className="absolute bottom-20 right-10 text-3xl"
            animate={{ 
              y: [0, -15, 0],
              rotate: [0, 10, -10, 0]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2
            }}
          >
            🌟
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
