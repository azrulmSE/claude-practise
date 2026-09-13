import { Fragment } from "react"
import {
  ArrowRight,
  ChartLine,
  Plug,
  ShieldCheck,
  Users,
  Workflow,
} from "lucide-react"

import { SectionHeading } from "@/components/landing/section-heading"
import { Reveal, RevealItem } from "@/components/motion/reveal"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"

function FlowChips() {
  return (
    <div className="flex flex-wrap items-center gap-2 px-(--card-spacing) text-xs">
      {["Plan", "Track", "Ship"].map((step, i) => (
        <Fragment key={step}>
          {i > 0 && (
            <ArrowRight className="size-3.5 text-muted-foreground" aria-hidden />
          )}
          <span className="rounded-lg border border-border bg-background px-3 py-1.5 font-medium">
            {step}
          </span>
        </Fragment>
      ))}
    </div>
  )
}

// TODO: placeholder product claims — replace w/ real ones
const FEATURES = [
  {
    icon: Workflow,
    title: "One flow from idea to shipped",
    description:
      "Plans, progress, and releases live in the same place, so nothing falls between tools.",
    className: "md:col-span-2",
    extra: <FlowChips />,
  },
  {
    icon: ChartLine,
    title: "Live insights",
    description: "Cycle time and throughput update as work moves. No manual reports.",
  },
  {
    icon: Users,
    title: "Built for teams",
    description: "Shared views, clear owners, and updates that reach the right people.",
  },
  {
    icon: ShieldCheck,
    title: "Secure by default",
    description: "Roles, permissions, and SSO so access stays exactly where it should.",
  },
  {
    icon: Plug,
    title: "Connects to your stack",
    description: "Bring in work from the tools your team already uses.",
  },
]

export function Features() {
  return (
    <section id="features" className="border-y border-border bg-muted/30 py-24">
      <Reveal className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <RevealItem>
          <SectionHeading
            eyebrow="Features"
            title="Less busywork. More shipping."
            description="Everything you need to keep work moving — and nothing you'll have to ignore."
          />
        </RevealItem>

        <div className="grid gap-4 md:grid-cols-3">
          {FEATURES.map(({ icon: Icon, title, description, className, extra }) => (
            <RevealItem key={title} lift className={cn("h-full", className)}>
              {/* local overrides per DESIGN.md: rounded-lg + hairline border, roomier padding */}
              <Card className="h-full rounded-lg border border-border ring-0 [--card-spacing:--spacing(6)]">
                <div className="px-(--card-spacing)">
                  <span className="flex size-10 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5" aria-hidden />
                  </span>
                </div>
                <CardHeader>
                  <CardTitle>{title}</CardTitle>
                  <CardDescription>{description}</CardDescription>
                </CardHeader>
                {extra}
              </Card>
            </RevealItem>
          ))}
        </div>
      </Reveal>
    </section>
  )
}
