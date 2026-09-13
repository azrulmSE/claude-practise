import type { Variants } from "motion/react"

export const EASE = [0.22, 1, 0.36, 1] as const

// parent that staggers variant children; nests (inner stagger starts on its slot)
export const stagger = (each: number, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: each, delayChildren: delay } },
})

// big, slow reveal for hero/marketing content
export const rise: Variants = {
  hidden: { opacity: 0, y: 16, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE },
  },
}

// quick, subtle reveal for form UI (no blur: keep text crisp)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
}

// DESIGN.md §3 spring presets
export const SPRING_SNAPPY = {
  type: "spring",
  mass: 0.1,
  stiffness: 150,
  damping: 15,
} as const // buttons, toggles

export const SPRING_SMOOTH = {
  type: "spring",
  mass: 0.2,
  stiffness: 100,
  damping: 20,
} as const // modals, overlays, tabs

// DESIGN.md Pattern B: staggered entrance for collections (bento, cards)
export const revealContainer: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
}

// Static on purpose: `hidden` is SSR'd, so it must not depend on useReducedMotion
// (null on server, true/false on client -> hydration mismatch). Reduced-motion
// users lose the movement via <MotionConfig reducedMotion="user"> instead.
export const revealItem: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
}
