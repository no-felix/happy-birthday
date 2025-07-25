'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ParticleBackground } from '@/components/ui/ParticleBackground'
import { WelcomeStage } from '@/components/stages/WelcomeStage'
import { AgeVerificationStage } from '@/components/stages/AgeVerificationStage'
import { DreamsStage } from '@/components/stages/DreamsStage'
import { LifeStatsStage } from '@/components/stages/LifeStatsStage'
import { BigRevealStage } from '@/components/stages/BigRevealStage'
import { STAGES, type Stage } from '@/lib/utils'

export default function Home() {
  const [currentStage, setCurrentStage] = useState<Stage>(STAGES.WELCOME)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Load saved progress from localStorage
  useEffect(() => {
    const savedStage = localStorage.getItem('birthdayStage')
    if (savedStage && Object.values(STAGES).includes(savedStage as Stage)) {
      setCurrentStage(savedStage as Stage)
    }
  }, [])

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('birthdayStage', currentStage)
  }, [currentStage])

  const handleStageTransition = useCallback((nextStage: Stage) => {
    setIsTransitioning(true)
    
    // Change stage earlier so the new stage can start animating while overlay fades out
    setTimeout(() => {
      setCurrentStage(nextStage)
    }, 250) // Start new stage animation halfway through transition
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Overlay continues for full duration
  }, [])

  const handleNext = useCallback(() => {
    switch (currentStage) {
      case STAGES.WELCOME:
        handleStageTransition(STAGES.AGE_VERIFICATION)
        break
      case STAGES.AGE_VERIFICATION:
        handleStageTransition(STAGES.MEMORY_LANE)
        break
      case STAGES.MEMORY_LANE:
        handleStageTransition(STAGES.WISHES)
        break
      case STAGES.WISHES:
        handleStageTransition(STAGES.BIG_REVEAL)
        break
      default:
        break
    }
  }, [currentStage, handleStageTransition])

  const handleRestart = useCallback(() => {
    localStorage.removeItem('birthdayStage')
    handleStageTransition(STAGES.WELCOME)
  }, [handleStageTransition])

  const renderCurrentStage = () => {
    switch (currentStage) {
      case STAGES.WELCOME:
        return <WelcomeStage onNext={handleNext} />
      case STAGES.AGE_VERIFICATION:
        return <AgeVerificationStage onNext={handleNext} />
      case STAGES.MEMORY_LANE:
        return <DreamsStage onNext={handleNext} />
      case STAGES.WISHES:
        return <LifeStatsStage onNext={handleNext} />
      case STAGES.BIG_REVEAL:
        return <BigRevealStage onRestart={handleRestart} />
      default:
        return <WelcomeStage onNext={handleNext} />
    }
  }

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Transition Overlay */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 0.25,
            }}
          >
            <motion.div
              className="text-4xl text-yellow-400"
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 360]
              }}
              transition={{ 
                duration: 0.8, // Slightly faster spin
                repeat: Infinity
              }}
            >
              ✨
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Stage Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStage}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ 
            duration: 0.4, // Faster animation
            ease: "easeOut" // Smoother easing
          }}
          className="relative z-10"
        >
          {renderCurrentStage()}
        </motion.div>
      </AnimatePresence>

      {/* Stage Progress Indicator (hidden on welcome and big reveal) */}
      {currentStage !== STAGES.WELCOME && currentStage !== STAGES.BIG_REVEAL && (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <div className="flex gap-2 bg-gray-800/50 backdrop-blur-sm rounded-full px-4 py-2">
            {Object.values(STAGES).slice(1, -1).map((stage, index) => {
              const stageIndex = Object.values(STAGES).indexOf(currentStage)
              const targetIndex = index + 1
              
              return (
                <div
                  key={stage}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    stageIndex >= targetIndex
                      ? 'bg-yellow-400'
                      : 'bg-gray-600'
                  }`}
                />
              )
            })}
          </div>
        </div>
      )}

      {/* Background gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/20 pointer-events-none" />
    </main>
  )
}
