"use client"

import { useState } from "react"
import Link from "next/link"
import { motion, useReducedMotion } from "motion/react"
import { Check } from "lucide-react"

import { SectionHeading } from "@/components/landing/section-heading"
import { Reveal, RevealItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SPRING_SMOOTH } from "@/lib/motion"
import { cn } from "@/lib/utils"

type Billing = "monthly" | "yearly"

// TODO: placeholder plans/prices — replace w/ real ones; Enterprise CTA needs a real contact route
const PLANS = [
  {
    name: "Starter",
    description: "For individuals getting organized.",
    price: { monthly: 0, yearly: 0 },
    cta: "Get started",
    features: ["Up to 3 projects", "Unlimited tasks", "Basic insights"],
  },
  {
    name: "Team",
    description: "For growing teams that ship together.",
    price: { monthly: 12, yearly: 10 },
    cta: "Get started",
    featured: true,
    features: [
      "Unlimited projects",
      "Live dashboards",
      "Roles & permissions",
      "Priority support",
    ],
  },
  {
    name: "Enterprise",
    description: "For organizations with advanced needs.",
    price: null,
    cta: "Contact sales",
    features: [
      "SSO & audit logs",
      "Custom data retention",
      "Dedicated success manager",
      "Uptime SLA",
    ],
  },
]

const BILLING: { value: Billing; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "yearly", label: "Yearly" },
]

function Price({
  price,
  billing,
}: {
  price: (typeof PLANS)[number]["price"]
  billing: Billing
}) {
  if (!price) {
    return <p className="text-4xl font-semibold tracking-tight">Custom</p>
  }
  const amount = price[billing]
  return (
    <div className="flex items-baseline gap-1">
      <p className="text-4xl font-semibold tracking-tight">${amount}</p>
      <p className="text-sm text-muted-foreground">
        {amount === 0
          ? "free forever"
          : `/user/mo${billing === "yearly" ? ", billed yearly" : ""}`}
      </p>
    </div>
  )
}

export function Pricing() {
  const [billing, setBilling] = useState<Billing>("monthly")
  const reduce = useReducedMotion()

  return (
    <section id="pricing" className="py-24">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 px-4 sm:px-6">
        <Reveal>
          <RevealItem>
            <SectionHeading
              eyebrow="Pricing"
              title="Simple pricing that scales with you"
              description="Start free. Upgrade when your team is ready."
            />
          </RevealItem>
        </Reveal>

        <Tabs
          value={billing}
          onValueChange={(v) => setBilling(v === "yearly" ? "yearly" : "monthly")}
          className="flex-col items-center gap-10"
        >
          <TabsList className="group-data-horizontal/tabs:h-10">
            {BILLING.map(({ value, label }) => (
              <TabsTrigger
                key={value}
                value={value}
                className="gap-2 px-4 data-active:bg-transparent data-active:shadow-none data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                {/* sliding pill (Pattern A, pill form) */}
                {billing === value && (
                  <motion.span
                    layoutId="billing-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-md bg-background shadow-sm will-change-transform"
                    transition={reduce ? { duration: 0 } : SPRING_SMOOTH}
                  />
                )}
                <span className="relative">{label}</span>
                {value === "yearly" && (
                  <Badge variant="secondary" className="relative">
                    Save 17%
                  </Badge>
                )}
              </TabsTrigger>
            ))}
          </TabsList>

          {BILLING.map(({ value }) => (
            <TabsContent key={value} value={value} className="w-full">
              {/* remounts on switch -> in view already -> entrance replays */}
              <Reveal className="grid items-start gap-4 lg:grid-cols-3">
                {PLANS.map((plan) => (
                  <RevealItem key={plan.name} lift className="h-full">
                    <Card
                      className={cn(
                        "h-full rounded-lg border border-border ring-0 [--card-spacing:--spacing(6)]",
                        plan.featured && "border-primary shadow-md"
                      )}
                    >
                      <CardHeader>
                        <div className="flex items-center justify-between gap-2">
                          <CardTitle>{plan.name}</CardTitle>
                          {plan.featured && <Badge>Most popular</Badge>}
                        </div>
                        <CardDescription>{plan.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col gap-6">
                        <Price price={plan.price} billing={value} />
                        <Button
                          asChild
                          size="lg"
                          variant={plan.featured ? "default" : "outline"}
                          className="w-full"
                        >
                          <Link href="/register">{plan.cta}</Link>
                        </Button>
                        <ul className="flex flex-col gap-3">
                          {plan.features.map((feature) => (
                            <li
                              key={feature}
                              className="flex items-center gap-2 text-sm"
                            >
                              <Check
                                className="size-4 shrink-0 text-muted-foreground"
                                aria-hidden
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>
                  </RevealItem>
                ))}
              </Reveal>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
