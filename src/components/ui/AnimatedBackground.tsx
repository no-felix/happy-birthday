'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface Point {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animationRef = useRef<number | null>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const pointsRef = useRef<Point[]>([])
  const timeRef = useRef(0)

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)

    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  useEffect(() => {
    if (!dimensions.width || !dimensions.height) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = dimensions.width
    canvas.height = dimensions.height

    // Initialize points for flowing lines
    const numPoints = 8
    pointsRef.current = Array.from({ length: numPoints }, (_, i) => ({
      x: (dimensions.width / numPoints) * i,
      y: dimensions.height / 2,
      targetX: (dimensions.width / numPoints) * i,
      targetY: dimensions.height / 2,
      vx: 0,
      vy: 0
    }))

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      timeRef.current += 0.01

      // Update points with organic movement
      pointsRef.current.forEach((point, i) => {
        // Base wave motion
        const baseY = dimensions.height / 2 + Math.sin(timeRef.current + i * 0.5) * 100
        
        // Pure organic movement without mouse interaction
        point.targetY = baseY + Math.sin(timeRef.current * 0.7 + i * 0.8) * 50
        point.targetX = (dimensions.width / (pointsRef.current.length - 1)) * i + 
                       Math.sin(timeRef.current * 0.5 + i) * 20

        // Smooth movement towards target
        point.vx += (point.targetX - point.x) * 0.02
        point.vy += (point.targetY - point.y) * 0.02
        point.vx *= 0.95
        point.vy *= 0.95
        point.x += point.vx
        point.y += point.vy
      })

      // Draw flowing curves
      const drawFlowingLine = (points: Point[], color: string, lineWidth: number, alpha: number) => {
        ctx.globalAlpha = alpha
        ctx.strokeStyle = color
        ctx.lineWidth = lineWidth
        ctx.lineCap = 'round'
        ctx.lineJoin = 'round'

        ctx.beginPath()
        ctx.moveTo(points[0].x, points[0].y)

        for (let i = 1; i < points.length - 2; i++) {
          const xc = (points[i].x + points[i + 1].x) / 2
          const yc = (points[i].y + points[i + 1].y) / 2
          ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc)
        }

        ctx.quadraticCurveTo(
          points[points.length - 2].x,
          points[points.length - 2].y,
          points[points.length - 1].x,
          points[points.length - 1].y
        )

        ctx.stroke()
      }

      // Draw multiple flowing lines with different colors and offsets
      const colors = [
        '#FFD700', // Gold
        '#FF6B6B', // Coral
        '#4ECDC4', // Teal
        '#45B7D1', // Blue
        '#96CEB4', // Mint
        '#FECA57'  // Yellow
      ]

      colors.forEach((color, index) => {
        const offsetPoints = pointsRef.current.map(point => ({
          ...point,
          y: point.y + Math.sin(timeRef.current + index * 0.3) * 30 + (index - colors.length/2) * 40
        }))

        drawFlowingLine(offsetPoints, color, 3 - index * 0.3, 0.3 - index * 0.03)
      })

      // Draw connecting nodes
      ctx.globalAlpha = 0.6
      pointsRef.current.forEach((point, i) => {
        const size = 2 + Math.sin(timeRef.current + i) * 1
        
        // Gradient for nodes
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, size * 3)
        gradient.addColorStop(0, colors[i % colors.length])
        gradient.addColorStop(1, 'transparent')
        
        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, size * 3, 0, Math.PI * 2)
        ctx.fill()
      })

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [dimensions])

  return (
    <>
      {/* Canvas for flowing lines */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none"
        style={{ zIndex: 1 }}
      />
      
      {/* Additional animated geometric elements */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Floating geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-32 bg-gradient-to-b from-transparent via-yellow-400/20 to-transparent"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              rotate: [0, 360],
              scaleY: [1, 1.5, 1],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.5
            }}
          />
        ))}

        {/* Orbital rings */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={`ring-${i}`}
            className="absolute border border-yellow-400/10 rounded-full"
            style={{
              width: `${300 + i * 150}px`,
              height: `${300 + i * 150}px`,
              left: '50%',
              top: '50%',
              marginLeft: `${-(150 + i * 75)}px`,
              marginTop: `${-(150 + i * 75)}px`,
            }}
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              rotate: {
                duration: 20 + i * 10,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: 8 + i * 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }}
          />
        ))}
      </div>
    </>
  )
}
