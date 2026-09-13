"use client"

import type { PointerEvent } from "react"
import {
  MotionConfig,
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type Variants,
} from "motion/react"
import { ShieldCheck, Users, Zap } from "lucide-react"

import { AuthIllustration } from "@/components/auth/auth-illustration"
import { EASE, rise, stagger } from "@/lib/motion"

const HEADLINE = "Everything your team needs, in one calm workspace."

// TODO: placeholder marketing copy — replace w/ real product claims
const BENEFITS = [
  { icon: Zap, text: "Go from idea to shipped in one flow" },
  { icon: ShieldCheck, text: "Secure by default, with access you control" },
  { icon: Users, text: "Built for teams of every size" },
]

const word: Variants = {
  hidden: { opacity: 0, y: "0.4em", filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: EASE },
  },
}

const slideIn: Variants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
}

export function AuthShowcase() {
  const reduce = useReducedMotion()

  // pointer position normalized to -0.5..0.5, spring-smoothed into a 3D tilt
  const px = useMotionValue(0)
  const py = useMotionValue(0)
  const sx = useSpring(px, { stiffness: 120, damping: 20 })
  const sy = useSpring(py, { stiffness: 120, damping: 20 })
  const rotateY = useTransform(sx, [-0.5, 0.5], [-10, 10])
  const rotateX = useTransform(sy, [-0.5, 0.5], [8, -8])

  function handlePointerMove(e: PointerEvent<HTMLDivElement>) {
    if (reduce) return
    const rect = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - rect.left) / rect.width - 0.5)
    py.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  function handlePointerLeave() {
    px.set(0)
    py.set(0)
  }

  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        className="relative flex w-full max-w-md flex-col items-center gap-8 text-center"
        variants={stagger(0.12, 0.1)}
        initial="hidden"
        animate="show"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div variants={rise} className="w-full max-w-md perspective-[1000px]">
          <motion.div
            style={{ rotateX, rotateY }}
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <AuthIllustration className="h-auto max-h-[38svh] w-full drop-shadow-2xl" />
          </motion.div>
        </motion.div>

        <div className="flex max-w-md flex-col gap-3">
          <motion.h2
            variants={stagger(0.05)}
            className="text-3xl leading-tight font-semibold tracking-tight text-balance"
          >
            {HEADLINE.split(" ").map((w, i) => (
              <span key={i}>
                <motion.span variants={word} className="inline-block">
                  {w}
                </motion.span>{" "}
              </span>
            ))}
          </motion.h2>
          <motion.p variants={rise} className="text-primary-foreground/70">
            Plan projects, track progress, and ship with confidence — without
            the noise.
          </motion.p>
        </div>

        {/* block centered, rows left-aligned so icons line up */}
        <motion.ul
          variants={stagger(0.12)}
          className="flex w-fit flex-col gap-3 text-left"
        >
          {BENEFITS.map(({ icon: Icon, text }) => (
            <motion.li
              key={text}
              variants={slideIn}
              className="group flex items-center gap-3 text-sm"
            >
              <motion.span
                whileHover={{ rotate: -8, scale: 1.12 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10 transition-colors group-hover:bg-primary-foreground/20"
              >
                <Icon className="size-4" aria-hidden />
              </motion.span>
              <span className="text-primary-foreground/80">{text}</span>
            </motion.li>
          ))}
        </motion.ul>
      </motion.div>
    </MotionConfig>
  )
}

// Slow drifting background glows
export function AuthGlows() {
  return (
    <MotionConfig reducedMotion="user">
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -right-32 size-96 rounded-full bg-primary-foreground/10 blur-3xl"
        animate={{ x: [0, -40, 0], y: [0, 30, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-24 size-96 rounded-full bg-primary-foreground/5 blur-3xl"
        animate={{ x: [0, 50, 0], y: [0, -30, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
      />
    </MotionConfig>
  )
}
