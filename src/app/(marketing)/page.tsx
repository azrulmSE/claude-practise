import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

import { Faq } from "@/components/landing/faq"
import { Features } from "@/components/landing/features"
import { Pricing } from "@/components/landing/pricing"
import { ProductTour } from "@/components/landing/product-tour"
import { Reveal, RevealItem } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <>
      {/* hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-96 bg-linear-to-b from-muted/60 to-transparent"
        />
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-16 px-4 pt-20 pb-24 sm:px-6 sm:pt-28">
          <Reveal className="flex max-w-3xl flex-col items-center gap-6 text-center">
            <RevealItem>
              <Badge variant="outline" className="h-7 px-3">
                <Sparkles data-icon="inline-start" aria-hidden />
                Live dashboards are here
              </Badge>
            </RevealItem>
            <RevealItem>
              <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl">
                Everything your team needs, in one calm workspace.
              </h1>
            </RevealItem>
            <RevealItem>
              <p className="max-w-2xl text-lg text-balance text-muted-foreground">
                Plan projects, track progress, and ship with confidence —
                without the noise, the tab-juggling, or the status meetings.
              </p>
            </RevealItem>
            <RevealItem className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" className="px-4">
                <Link href="/register">
                  Get started
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="px-4">
                <Link href="/#tour">See how it works</Link>
              </Button>
            </RevealItem>
          </Reveal>

          <Reveal id="tour" className="w-full scroll-mt-24">
            <RevealItem>
              <ProductTour />
            </RevealItem>
          </Reveal>
        </div>
      </section>

      <Features />
      <Pricing />
      <Faq />

      {/* closing CTA */}
      <section className="py-24">
        <Reveal className="mx-auto max-w-6xl px-4 sm:px-6">
          <RevealItem className="flex flex-col items-center gap-6 rounded-lg bg-primary px-6 py-16 text-center text-primary-foreground sm:px-16">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              Ready for a calmer way to ship?
            </h2>
            <p className="max-w-xl text-balance text-primary-foreground/70">
              Set up your workspace in minutes. Bring your team when you&apos;re
              ready.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button asChild size="lg" variant="secondary" className="px-4">
                <Link href="/register">
                  Get started
                  <ArrowRight data-icon="inline-end" aria-hidden />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="ghost"
                className="px-4 text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
              >
                <Link href="/login">Log in</Link>
              </Button>
            </div>
          </RevealItem>
        </Reveal>
      </section>
    </>
  )
}
