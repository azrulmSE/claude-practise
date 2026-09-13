"use client"

import { MotionConfig, motion } from "motion/react"

import { fadeUp, stagger } from "@/lib/motion"

// Server-friendly wrappers: pages stay Server Components, pass children in
export function Stagger({
  children,
  className,
  each = 0.08,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  each?: number
  delay?: number
}) {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className={className}
        variants={stagger(each, delay)}
        initial="hidden"
        animate="show"
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}

export function StaggerItem({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    // data-reveal: <noscript> fallback forces these visible w/o JS
    <motion.div data-reveal className={className} variants={fadeUp}>
      {children}
    </motion.div>
  )
}
