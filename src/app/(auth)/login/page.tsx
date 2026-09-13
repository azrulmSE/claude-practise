import type { Metadata } from "next"
import Link from "next/link"

import { LoginForm } from "@/components/auth/login-form"
import { Logo } from "@/components/logo"
import { Stagger, StaggerItem } from "@/components/motion/stagger"

export const metadata: Metadata = {
  title: "Log in",
}

export default function LoginPage() {
  return (
    <Stagger className="flex w-full max-w-sm flex-col gap-6">
      <StaggerItem className="lg:hidden">
        <Link href="/" aria-label="Orca home">
          <Logo />
        </Link>
      </StaggerItem>

      <StaggerItem className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Log in to your account to continue.
        </p>
      </StaggerItem>

      <LoginForm />

      <StaggerItem>
        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/register"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Sign up
          </Link>
        </p>
      </StaggerItem>
    </Stagger>
  )
}
