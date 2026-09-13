"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"

import { SPRING_SNAPPY } from "@/lib/motion"

const LINKS = [
  { href: "/#tour", label: "Product" },
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/#faq", label: "FAQ" },
]

export function NavLinks() {
  const [hovered, setHovered] = useState<string | null>(null)
  const reduce = useReducedMotion()

  return (
    <nav
      aria-label="Main"
      className="hidden items-center md:flex"
      onMouseLeave={() => setHovered(null)}
    >
      {LINKS.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onMouseEnter={() => setHovered(link.href)}
          onFocus={() => setHovered(link.href)}
          onBlur={() => setHovered(null)}
          className="relative rounded-lg px-3 py-2 text-sm text-muted-foreground transition-colors outline-none hover:text-foreground focus-visible:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          {/* shared layoutId: pill glides between links instead of popping */}
          {hovered === link.href && (
            <motion.span
              layoutId="nav-hover-pill"
              aria-hidden
              className="absolute inset-0 rounded-lg bg-muted will-change-transform"
              transition={reduce ? { duration: 0 } : SPRING_SNAPPY}
            />
          )}
          <span className="relative">{link.label}</span>
        </Link>
      ))}
    </nav>
  )
}
