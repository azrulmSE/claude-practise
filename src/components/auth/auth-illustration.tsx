"use client"

import { motion, useReducedMotion } from "motion/react"

import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

// two chart shapes w/ identical command structure so `d` can morph between them
const LINE_A = "M146 270 C190 250 210 200 250 215 S320 160 360 175 S420 130 444 142"
const LINE_B = "M146 262 C190 240 215 225 250 200 S320 185 360 160 S420 140 444 128"
const area = (line: string) => `${line} L444 284 L146 284 Z`
const END_A = 142
const END_B = 128

const SIDEBAR_ITEMS = [0, 1, 2, 3, 4, 5]
const STAT_TILES = [130, 245, 360]
const GRID_LINES = [172, 212, 252]

// scale/rotate from the shape's own box instead of the <svg> origin
const fillBox = { transformBox: "fill-box" } as const

const LIVE = { duration: 6, delay: 2.6, repeat: Infinity, ease: "easeInOut" } as const

// Decorative product preview; colors come from currentColor so it follows theme tokens
export function AuthIllustration({ className }: { className?: string }) {
  // non-transform loops (d, cy, opacity) aren't covered by MotionConfig reducedMotion
  const reduce = useReducedMotion()
  const live = <T,>(a: T, b: T): T | T[] => (reduce ? a : [a, b, a])

  return (
    <svg
      viewBox="0 0 480 320"
      fill="none"
      aria-hidden
      className={cn("text-primary-foreground", className)}
    >
      <defs>
        <linearGradient id="auth-chart-fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0.35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>

      {/* window */}
      <rect
        x="0.5"
        y="0.5"
        width="479"
        height="319"
        rx="16"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.15"
      />
      {[20, 36, 52].map((cx, i) => (
        <motion.circle
          key={cx}
          cx={cx}
          cy="20"
          r="4"
          fill="currentColor"
          fillOpacity="0.3"
          style={fillBox}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 400, damping: 15 }}
        />
      ))}
      <line x1="0" y1="40" x2="480" y2="40" stroke="currentColor" strokeOpacity="0.1" />

      {/* sidebar: selection indicator glides between items */}
      <line x1="110" y1="40" x2="110" y2="320" stroke="currentColor" strokeOpacity="0.1" />
      <motion.rect
        x="12"
        width="86"
        height="20"
        rx="6"
        fill="currentColor"
        fillOpacity="0.1"
        initial={{ y: 56, opacity: 0 }}
        animate={{ opacity: 1, y: [56, 56, 82, 82, 134, 134, 56] }}
        transition={{
          opacity: { delay: 0.7 },
          y: {
            duration: 9,
            delay: 1.2,
            repeat: Infinity,
            ease: EASE,
            times: [0, 0.25, 0.33, 0.58, 0.66, 0.9, 1],
          },
        }}
      />
      {SIDEBAR_ITEMS.map((i) => (
        <motion.rect
          key={i}
          x="20"
          y={62 + i * 26}
          width={i === 0 ? 70 : 56 + ((i * 7) % 14)}
          height="8"
          rx="4"
          fill="currentColor"
          fillOpacity={i === 0 ? 0.55 : 0.25}
          style={{ ...fillBox, originX: 0 }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.3 + i * 0.06, duration: 0.6, ease: EASE }}
        />
      ))}

      {/* stat tiles */}
      {STAT_TILES.map((x, i) => (
        <motion.g
          key={x}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 + i * 0.1, duration: 0.6, ease: EASE }}
        >
          <rect
            x={x}
            y="60"
            width="100"
            height="56"
            rx="10"
            fill="currentColor"
            fillOpacity="0.05"
            stroke="currentColor"
            strokeOpacity="0.1"
          />
          <rect x={x + 14} y="74" width="40" height="6" rx="3" fill="currentColor" fillOpacity="0.25" />
          {/* outer g breathes forever, inner rect grows in once; scales multiply */}
          <motion.g
            style={{ ...fillBox, originX: 0 }}
            animate={{ scaleX: [1, 0.72, 1] }}
            transition={{ duration: 3 + i, delay: 2 + i * 0.4, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.rect
              x={x + 14}
              y="88"
              width={48 + i * 10}
              height="12"
              rx="4"
              fill="currentColor"
              fillOpacity="0.7"
              style={{ ...fillBox, originX: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.8 + i * 0.1, duration: 0.8, ease: EASE }}
            />
          </motion.g>
        </motion.g>
      ))}

      {/* chart */}
      <rect
        x="130"
        y="132"
        width="330"
        height="168"
        rx="10"
        fill="currentColor"
        fillOpacity="0.05"
        stroke="currentColor"
        strokeOpacity="0.1"
      />
      {GRID_LINES.map((y, i) => (
        <motion.line
          key={y}
          x1="146"
          y1={y}
          x2="444"
          y2={y}
          stroke="currentColor"
          strokeOpacity="0.08"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ delay: 0.7 + i * 0.1, duration: 0.8, ease: EASE }}
        />
      ))}
      <motion.path
        fill="url(#auth-chart-fill)"
        initial={{ opacity: 0, d: area(LINE_A) }}
        animate={{ opacity: 1, d: live(area(LINE_A), area(LINE_B)) }}
        transition={{ opacity: { delay: 1.6, duration: 1 }, d: LIVE }}
      />
      <motion.path
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, d: LINE_A }}
        animate={{ pathLength: 1, d: live(LINE_A, LINE_B) }}
        transition={{ pathLength: { delay: 0.9, duration: 1.4, ease: "easeInOut" }, d: LIVE }}
      />
      {/* pulse ring + end dot ride the line's endpoint */}
      <motion.circle
        cx="444"
        r="10"
        fill="currentColor"
        style={fillBox}
        initial={{ cy: END_A, opacity: 0, scale: 1 }}
        animate={{
          cy: live(END_A, END_B),
          opacity: reduce ? 0.2 : [0.4, 0],
          // reduced motion jumps transforms to the LAST keyframe; don't freeze at 2.4
          scale: reduce ? 1 : [1, 2.4],
        }}
        transition={{
          cy: LIVE,
          opacity: { delay: 2.3, duration: 2, repeat: Infinity, ease: "easeOut" },
          scale: { delay: 2.3, duration: 2, repeat: Infinity, ease: "easeOut" },
        }}
      />
      <motion.circle
        cx="444"
        r="5"
        fill="currentColor"
        style={fillBox}
        initial={{ cy: END_A, scale: 0 }}
        animate={{ cy: live(END_A, END_B), scale: 1 }}
        transition={{ cy: LIVE, scale: { delay: 2.2, type: "spring", stiffness: 300, damping: 12 } }}
      />

      {/* toast: springs in, then floats */}
      <motion.g
        initial={{ opacity: 0, x: -24 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2.3, type: "spring", stiffness: 200, damping: 18 }}
      >
        <motion.g
          animate={{ y: [0, -5, 0] }}
          transition={{ delay: 3, duration: 4, repeat: Infinity, ease: "easeInOut" }}
        >
          <rect
            x="20"
            y="236"
            width="160"
            height="60"
            rx="12"
            className="fill-primary"
            stroke="currentColor"
            strokeOpacity="0.2"
          />
          <circle cx="46" cy="266" r="12" fill="currentColor" fillOpacity="0.15" />
          <motion.path
            d="M41 266 L45 270 L52 262"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.7, duration: 0.4, ease: "easeOut" }}
          />
          <rect x="68" y="255" width="92" height="8" rx="4" fill="currentColor" fillOpacity="0.7" />
          <rect x="68" y="271" width="60" height="6" rx="3" fill="currentColor" fillOpacity="0.3" />
        </motion.g>
      </motion.g>
    </svg>
  )
}
