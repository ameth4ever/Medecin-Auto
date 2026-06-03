'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, type ReactNode } from 'react'

type Direction = 'up' | 'down' | 'left' | 'right' | 'none'
type AnimationVariant = 'fade' | 'slide' | 'scale' | 'stagger'

interface MotionWrapperProps {
  children: ReactNode
  className?: string
  variant?: AnimationVariant
  direction?: Direction
  delay?: number
  duration?: number
  once?: boolean
  distance?: number
  staggerDelay?: number
}

const directionOffset: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 60 },
  down: { x: 0, y: -60 },
  left: { x: 60, y: 0 },
  right: { x: -60, y: 0 },
  none: { x: 0, y: 0 },
}

export function MotionWrapper({
  children,
  className,
  variant = 'fade',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  distance = 60,
  staggerDelay = 0.1,
}: MotionWrapperProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-80px' })

  if (variant === 'stagger') {
    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: staggerDelay,
            },
          },
        }}
      >
        {children}
      </motion.div>
    )
  }

  const offset = directionOffset[direction]
  const initial =
    variant === 'fade'
      ? { opacity: 0, x: offset.x, y: offset.y }
      : variant === 'slide'
        ? { opacity: 0, x: offset.x || 0, y: offset.y || distance }
        : variant === 'scale'
          ? { opacity: 0, scale: 0.85 }
          : { opacity: 0, y: distance }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={
        isInView
          ? { opacity: 1, x: 0, y: 0, scale: 1 }
          : initial
      }
      transition={{
        duration,
        delay,
        ease: 'easeOut',
      }}
    >
      {children}
    </motion.div>
  )
}

export function MotionItem({
  children,
  className,
  direction = 'up',
  delay = 0,
  duration = 0.5,
  distance = 40,
}: {
  children: ReactNode
  className?: string
  direction?: Direction
  delay?: number
  duration?: number
  distance?: number
}) {
  const offset = directionOffset[direction]

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: offset.y || distance, x: offset.x },
        visible: {
          opacity: 1,
          y: 0,
          x: 0,
          transition: { duration, delay, ease: 'easeOut' },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

export const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
}

export const staggerContainer = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

export const staggerItem = {
  initial: { opacity: 0, y: 30 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}
