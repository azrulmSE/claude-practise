"use client"

import { useActionState, useEffect } from "react"
import Link from "next/link"
import {
  AnimatePresence,
  motion,
  useAnimate,
  useReducedMotion,
} from "motion/react"
import { LoaderCircle } from "lucide-react"

import { login } from "@/actions/auth"
import { PasswordInput } from "@/components/auth/password-input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { EASE, fadeUp, stagger } from "@/lib/motion"

const SHAKE = [0, -10, 10, -6, 6, -3, 3, 0]

// height+margin animate together: avoids the jump a CSS gap would cause
const collapse = {
  initial: { opacity: 0, height: 0 },
  animate: { opacity: 1, height: "auto" },
  exit: { opacity: 0, height: 0 },
  transition: { duration: 0.2, ease: EASE },
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence initial={false}>
      {message && (
        <motion.p
          key="error"
          id={id}
          {...collapse}
          initial={{ ...collapse.initial, marginTop: 0 }}
          animate={{ ...collapse.animate, marginTop: 8 }}
          exit={{ ...collapse.exit, marginTop: 0 }}
          className="overflow-hidden text-sm text-destructive"
        >
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

export function LoginForm() {
  const [state, formAction, pending] = useActionState(login, undefined)
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const reduce = useReducedMotion()
  const emailError = state?.errors?.email?.[0]
  const passwordError = state?.errors?.password?.[0]

  // new state object = new failed attempt (success redirects) -> shake
  useEffect(() => {
    if (!state || reduce) return
    animate(scope.current, { x: SHAKE }, { duration: 0.45, ease: "easeInOut" })
  }, [state, reduce, animate, scope])

  return (
    // no initial/animate: inherits hidden->show from the page <Stagger>
    <motion.form action={formAction} variants={stagger(0.06)}>
      <div ref={scope}>
        <AnimatePresence initial={false}>
          {state?.message && (
            <motion.div
              key="alert"
              role="alert"
              {...collapse}
              initial={{ ...collapse.initial, marginBottom: 0 }}
              animate={{ ...collapse.animate, marginBottom: 16 }}
              exit={{ ...collapse.exit, marginBottom: 0 }}
              className="overflow-hidden"
            >
              <div className="rounded-lg border border-destructive/50 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {state.message}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="grid gap-4">
          <motion.div data-reveal variants={fadeUp}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                required
                // React 19 resets the form after the action; keep email via defaultValue
                defaultValue={state?.email}
                aria-invalid={emailError ? true : undefined}
                aria-describedby={emailError ? "email-error" : undefined}
                className="h-10"
              />
            </div>
            <FieldError id="email-error" message={emailError} />
          </motion.div>

          <motion.div data-reveal variants={fadeUp}>
            <div className="grid gap-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/forgot-password"
                  className="text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <PasswordInput
                id="password"
                name="password"
                autoComplete="current-password"
                required
                aria-invalid={passwordError ? true : undefined}
                aria-describedby={passwordError ? "password-error" : undefined}
                className="h-10"
              />
            </div>
            <FieldError id="password-error" message={passwordError} />
          </motion.div>

          <motion.div
            data-reveal
            variants={fadeUp}
            className="flex items-center gap-2"
          >
            <Checkbox id="remember" name="remember" />
            <Label
              htmlFor="remember"
              className="font-normal text-muted-foreground"
            >
              Remember me
            </Label>
          </motion.div>

          <motion.div
            data-reveal
            variants={fadeUp}
            whileTap={pending ? undefined : { scale: 0.98 }}
          >
            <Button
              type="submit"
              className="h-10 w-full overflow-hidden"
              disabled={pending}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={pending ? "pending" : "idle"}
                  initial={{ y: 16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -16, opacity: 0 }}
                  transition={{ duration: 0.2, ease: EASE }}
                  className="flex items-center gap-1.5"
                >
                  {pending ? (
                    <>
                      <LoaderCircle className="animate-spin" aria-hidden />
                      Logging in…
                    </>
                  ) : (
                    "Log in"
                  )}
                </motion.span>
              </AnimatePresence>
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.form>
  )
}
