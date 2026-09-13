# Product Design System Guidelines ([DESIGN.md](http://DESIGN.md))

This document establishes the strict architectural, visual, and behavioral boundaries for all UI generation. Follow these instructions explicitly to ensure consistency across typography, layout, semantic states, and responsive motion.

---

## 1. Core Architecture Stack

*   **Component Foundation:** [shadcn/ui]([https://shadcn.com](https://shadcn.com)) primitives built on top of Radix UI for strict WAI-ARIA accessibility.

*   **Styling Engine:** [Tailwind CSS]([https://tailwindcss.com](https://tailwindcss.com)) utilizing semantic CSS variables `bg-background`, `text-foreground`, etc.).

*   **Animation Engine:** [Motion for React]([https://motion.dev](https://motion.dev)) (formerly Framer Motion) for fluid, micro-interactions and layout transitions.

---

## 2. Visual Tokens &amp; Aesthetic

Our design philosophy balances **achromatic zinc minimalism** with modern micro-animations.

### Color Palette (Semantic Mapping)

Do not hardcode raw hex codes. Use Tailwind's functional theme utility mapping:

*   `bg-background` / `text-foreground`: Main application canvas and high-contrast text.

*   `bg-muted` / `text-muted-foreground`: Secondary surfaces, subtle borders, and structural metadata.

*   `bg-primary` / `text-primary-foreground`: Primary active elements and destructive warning flows.

*   `border-border` / `border-input`: Hairline separations `border-[1px]`) matching the default zinc tone.

### Layout Specs &amp; Spatial Rhythm

*   **Grid Base:** Strict 4px/8px metric rhythm (e.g., `p-4`, `space-y-2`, `gap-8`).

*   **Corners:** Uniform `rounded-lg` (equivalent to `0.5rem` or `8px`) for interactive components like cards and dialog components.

*   **Density:** Generous, modern whitespace padding over cramped configurations. Avoid default table condensations unless specifically requested.

---

## 3. Motion Principles &amp; Constraints

Animations must feel **deliberate, physics-based, and optimized for performance**. Avoid aggressive loops or distracting decorative movements.

### Spring Presets

Always prefer physical springs over linear duration eases for interactive widgets.

*   **Snappy (Buttons, Toggles):** `mass: 0.1, stiffness: 150, damping: 15`

*   **Smooth (Modals, Overlays, Tabs):** `mass: 0.2, stiffness: 100, damping: 20`

### Motion Rules &amp; Best Practices

1.  **Layout Transitions:** Use Motion’s `layoutId` component configuration for shifting states, such as active tab highlight pills swapping indicators seamlessly.

2.  **Hardware Acceleration:** Always apply `will-change-transform` or use the `transform` shorthand property on moving canvas containers to maximize GPU performance.

3.  **Accessibility Respect:** Wrap all active high-range wrapper elements within standard `useReducedMotion` hooks. Disable structural spatial movement completely if preferences dictate strict accessibility paths.

---

## 4. Component Implementation Patterns

### Pattern A: The Animated shadcn/ui Tab System

When generating tabs, do not use the raw static shadcn tab container. Inject a layout-backed Motion element inside the underlying trigger tracking state.

```tsx

import { motion } from "motion/react"

import * as TabsPrimitive from "@radix-ui/react-tabs"

// Core Pattern for Active Tab Highlights

&lt;TabsPrimitive.Trigger value={tab.value} className="relative text-muted-foreground data-[state=active]:text-foreground"&gt;

  {tab.title}

  {isActive &amp;&amp; (

    &lt;motion.div 

      layoutId="activeTabIndicator"

      className="absolute bottom-0 h-[2px] bg-primary w-full"

      transition={{ type: "spring", stiffness: 380, damping: 30 }}

    /&gt;

  )}

&lt;/TabsPrimitive.Trigger&gt;

```

### Pattern B: Entrance Reveals (Bento &amp; Cards)

When rendering collections or dashboards, stagger the visual insertion nodes cleanly rather than showing an instantaneous pop.

```tsx

const containerVariants = {

  hidden: { opacity: 0 },

  show: { opacity: 1, transition: { staggerChildren: 0.05 } }

}

const itemVariants = {

  hidden: { opacity: 0, y: 8 },

  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }

}

```

---

## 5. Instructions for AI Code Generation (Anti-Patterns)

   *❌* *NEVER** introduce external design systems or utility packages that bring alien CSS variables or utility patterns.

   *❌* *NEVER** drop arbitrary hardcoded arbitrary pixels (e.g., `w-[342px]`) into functional layout setups unless mapping specific fixed element media (like avatars/logos).

   *❌* *DO NOT** use default Framer Motion syntax loops without ensuring layout nodes are properly typed against modern Next.js/React framework conventions.

   *⚠️* *ALWAYS** preserve shadcn component source architecture. Modify locally within your project directories using utility classes directly rather than introducing abstractions.

