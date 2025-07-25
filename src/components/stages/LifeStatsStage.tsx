'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, TrendingUp } from 'lucide-react'
import { MESSAGES, LIFE_STATS } from '@/lib/utils'

interface LifeStatsStageProps {
  onNext: () => void
}

export function LifeStatsStage({ onNext }: LifeStatsStageProps) {
  const [currentStat, setCurrentStat] = useState(0)
  const [viewedStats, setViewedStats] = useState<number[]>([0]) // First stat is auto-viewed

  const handleStatClick = (index: number) => {
    setCurrentStat(index)
    if (!viewedStats.includes(index)) {
      setViewedStats([...viewedStats, index])
    }
  }

  const allStatsViewed = viewedStats.length === LIFE_STATS.length

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
            {MESSAGES.wishes.title}
          </motion.h1>

          <motion.p
            className="text-xl text-gray-300 mb-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {MESSAGES.wishes.subtitle}
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Statistics Cards List */}
            <div className="lg:col-span-1 space-y-4">
              {LIFE_STATS.map((stat, index) => (
                <motion.div
                  key={stat.id}
                  className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                    currentStat === index
                      ? 'bg-yellow-400/20 border-2 border-yellow-400'
                      : 'bg-gray-800/50 border-2 border-gray-600 hover:border-gray-500'
                  }`}
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  onClick={() => handleStatClick(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{stat.emoji}</div>
                    <div className="text-left">
                      <div className="font-bold text-yellow-400 text-lg">
                        {stat.number}
                      </div>
                      <div className="text-sm text-gray-400">
                        {stat.unit}
                      </div>
                    </div>
                    {viewedStats.includes(index) && (
                      <TrendingUp className="w-5 h-5 text-green-400 ml-auto" />
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Main Statistic Display */}
            <div className="lg:col-span-2">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStat}
                  className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 rounded-2xl p-8 h-full backdrop-blur-sm border-2 border-gray-600"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="text-center h-full flex flex-col justify-center">
                    <motion.div
                      className="text-8xl mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", bounce: 0.5, delay: 0.2 }}
                    >
                      {LIFE_STATS[currentStat].emoji}
                    </motion.div>

                    <motion.div
                      className="text-6xl font-bold mb-4 text-yellow-400"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {LIFE_STATS[currentStat].number}
                    </motion.div>

                    <motion.div
                      className="text-2xl font-semibold mb-6 text-gray-300"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                    >
                      {LIFE_STATS[currentStat].unit}
                    </motion.div>

                    <motion.p
                      className="text-lg text-gray-300 leading-relaxed max-w-2xl mx-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.5 }}
                    >
                      {LIFE_STATS[currentStat].description}
                    </motion.p>

                    {!viewedStats.includes(currentStat) && (
                      <motion.div
                        className="mt-6 text-yellow-400 font-semibold"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        📊 Statistik entdeckt! 📊
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Progress indicator */}
          <motion.div
            className="mt-8 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
          >
            <div className="flex justify-center items-center gap-2 mb-4">
              {LIFE_STATS.map((_, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    viewedStats.includes(index) 
                      ? 'bg-green-400' 
                      : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
            <p className="text-gray-400">
              {viewedStats.length} von {LIFE_STATS.length} Statistiken entdeckt
            </p>
          </motion.div>

          {/* Next button */}
          <AnimatePresence>
            {allStatsViewed && (
              <motion.button
                onClick={onNext}
                className="group px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-semibold rounded-full hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl"
                initial={{ opacity: 0, y: 30, scale: 0.5 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  type: "spring", 
                  bounce: 0.5,
                  delay: 0.5 
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="flex items-center gap-2">
                  Bereit für die große Überraschung?
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>

          {/* Decorative elements */}
          <motion.div
            className="absolute top-10 left-10 text-4xl"
            animate={{ 
              scale: [1, 1.3, 1],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            📊
          </motion.div>

          <motion.div
            className="absolute bottom-10 right-10 text-3xl"
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1
            }}
          >
            📈
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
