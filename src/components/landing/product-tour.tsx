"use client"

import { useState, type ComponentType } from "react"
import { MotionConfig, motion, useReducedMotion } from "motion/react"
import {
  ChartLine,
  CircleCheck,
  CircleDashed,
  ListTodo,
  Rocket,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SPRING_SMOOTH } from "@/lib/motion"

// NOTE: `initial` values below are static on purpose — they're SSR'd, so they
// must not branch on useReducedMotion (hydration mismatch). MotionConfig
// reducedMotion="user" removes the movement for reduced-motion users.

// --- Plan: kanban board ---------------------------------------------------

const COLUMNS = [
  {
    title: "Backlog",
    items: [
      { title: "Audit log export", tag: "Security" },
      { title: "Dark mode polish", tag: "Design" },
    ],
  },
  {
    title: "In progress",
    items: [
      { title: "Onboarding checklist", tag: "Growth" },
      { title: "Billing webhooks", tag: "Platform" },
    ],
  },
  {
    title: "Done",
    items: [
      { title: "SSO for teams", tag: "Security" },
      { title: "Faster search", tag: "Platform" },
    ],
  },
]

function PlanPanel() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {COLUMNS.map((col) => (
        <div
          key={col.title}
          className="flex flex-col gap-2 rounded-lg bg-muted/50 p-3"
        >
          <div className="flex items-center justify-between px-1 text-xs font-medium text-muted-foreground">
            <span>{col.title}</span>
            <span>{col.items.length}</span>
          </div>
          {col.items.map((item) => (
            <div
              key={item.title}
              className="flex flex-col items-start gap-2 rounded-lg border border-border bg-background p-3 shadow-xs"
            >
              <p className="text-sm font-medium">{item.title}</p>
              <Badge variant="secondary">{item.tag}</Badge>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// --- Track: stats + weekly chart --------------------------------------------

const STATS = [
  { label: "Cycle time", value: "3.2d" },
  { label: "Shipped this month", value: "48" },
  { label: "On track", value: "92%" },
]
const BARS = [40, 65, 45, 80, 60, 95, 70]
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]

function TrackPanel() {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid gap-4 sm:grid-cols-3">
        {STATS.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border p-4">
            <p className="text-xs text-muted-foreground">{stat.label}</p>
            <p className="mt-1 text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
          </div>
        ))}
      </div>
      <div className="flex h-44 gap-3 rounded-lg border border-border p-4">
        {BARS.map((height, i) => (
          <div key={DAYS[i]} className="flex flex-1 flex-col gap-2">
            <div className="flex flex-1 items-end">
              <motion.div
                className="w-full origin-bottom rounded-md bg-primary/80 will-change-transform"
                style={{ height: `${height}%` }}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ ...SPRING_SMOOTH, delay: i * 0.04 }}
              />
            </div>
            <span className="text-center text-xs text-muted-foreground">
              {DAYS[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Ship: release timeline ---------------------------------------------------

const RELEASES = [
  { title: "v2.4.0 released to all workspaces", meta: "Today · 10:42", done: true },
  { title: "Changelog published", meta: "Today · 10:45", done: true },
  { title: "Customers notified", meta: "Today · 10:46", done: true },
  { title: "v2.5.0 staged for review", meta: "Scheduled · Friday", done: false },
]

function ShipPanel() {
  return (
    <ol className="flex flex-col">
      {RELEASES.map((release, i) => (
        <motion.li
          key={release.title}
          data-reveal
          className="flex items-start gap-3 border-b border-border py-4 last:border-b-0"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...SPRING_SMOOTH, delay: i * 0.06 }}
        >
          {release.done ? (
            <CircleCheck className="mt-0.5 size-5 shrink-0" aria-hidden />
          ) : (
            <CircleDashed
              className="mt-0.5 size-5 shrink-0 text-muted-foreground"
              aria-hidden
            />
          )}
          <div className="flex flex-1 flex-col gap-1">
            <p className="text-sm font-medium">{release.title}</p>
            <p className="text-xs text-muted-foreground">{release.meta}</p>
          </div>
          <Badge variant={release.done ? "secondary" : "outline"}>
            {release.done ? "Live" : "Queued"}
          </Badge>
        </motion.li>
      ))}
    </ol>
  )
}

// --- Tour ----------------------------------------------------------------------

const TABS: {
  value: string
  label: string
  icon: ComponentType<{ "aria-hidden"?: boolean }>
  Panel: ComponentType
}[] = [
  { value: "plan", label: "Plan", icon: ListTodo, Panel: PlanPanel },
  { value: "track", label: "Track", icon: ChartLine, Panel: TrackPanel },
  { value: "ship", label: "Ship", icon: Rocket, Panel: ShipPanel },
]

export function ProductTour() {
  const [tab, setTab] = useState(TABS[0].value)
  // safe: only feeds `transition`, which isn't part of SSR markup
  const reduce = useReducedMotion()

  return (
    <MotionConfig reducedMotion="user">
      <Tabs
        value={tab}
        onValueChange={setTab}
        className="flex-col items-center gap-6"
      >
        <TabsList
          variant="line"
          className="gap-2 border-b border-border group-data-horizontal/tabs:h-10"
        >
          {TABS.map(({ value, label, icon: Icon }) => (
            <TabsTrigger key={value} value={value} className="px-4 after:hidden">
              <Icon aria-hidden />
              {label}
              {/* DESIGN.md Pattern A: layout-backed indicator */}
              {tab === value && (
                <motion.span
                  layoutId="tour-tab-indicator"
                  aria-hidden
                  className="absolute inset-x-0 -bottom-1 h-0.5 bg-primary will-change-transform"
                  transition={reduce ? { duration: 0 } : SPRING_SMOOTH}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* product window */}
        <div className="w-full rounded-lg border border-border bg-card shadow-sm">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="size-2.5 rounded-full bg-muted-foreground/30"
              />
            ))}
            <span className="ml-4 text-xs text-muted-foreground">
              orca.app/{tab}
            </span>
          </div>

          {TABS.map(({ value, Panel }) => (
            <TabsContent key={value} value={value} className="p-4 sm:p-6">
              {/* radix remounts content per tab -> entrance replays on switch */}
              <motion.div
                data-reveal
                className="min-h-80"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={SPRING_SMOOTH}
              >
                <Panel />
              </motion.div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </MotionConfig>
  )
}
