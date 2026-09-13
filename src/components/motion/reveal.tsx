"use client"

import { MotionConfig, motion, useReducedMotion } from "motion/react"

import { SPRING_SNAPPY, revealContainer, revealItem } from "@/lib/motion"
import { cn } from "@/lib/utils"

// DESIGN.md Pattern B, triggered when scrolled into view
export function Reveal({
  children,
  className,
  id,
}: {
  children: React.ReactNode
  className?: string
  id?: string
}) {
  return (
    // makes transform animations instant for reduced-motion users (fade stays);
    // decided at animation time, so SSR markup is identical for everyone
    <MotionConfig reducedMotion="user">
      <motion.div
        data-reveal
        id={id}
        className={className}
        variants={revealContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {children}
      </motion.div>
    </MotionConfig>
  )
}

export function RevealItem({
  children,
  className,
  lift = false,
}: {
  children: React.ReactNode
  className?: string
  // hover lift for cards
  lift?: boolean
}) {
  // safe here: whileHover isn't part of SSR markup
  const reduce = useReducedMotion()

  return (
    <motion.div
      data-reveal
      className={cn(lift && "will-change-transform", className)}
      variants={revealItem}
      whileHover={lift && !reduce ? { y: -4 } : undefined}
      // variant `show` carries its own spring; this one drives whileHover
      transition={SPRING_SNAPPY}
    >
      {children}
    </motion.div>
  )
}
