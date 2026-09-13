import Link from "next/link"

import { NavLinks } from "@/components/landing/nav-links"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link
          href="/"
          aria-label="Orca home"
          className="rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <Logo />
        </Link>

        <NavLinks />

        <div className="flex items-center gap-2">
          <Button asChild variant="ghost" size="lg">
            <Link href="/login">Log in</Link>
          </Button>
          <Button asChild size="lg">
            <Link href="/register">Get started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
