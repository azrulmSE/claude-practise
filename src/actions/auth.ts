"use server"

import { redirect } from "next/navigation"
import * as z from "zod"

import { verifyCredentials } from "@/lib/auth-stub"
import { LoginSchema, type LoginFormState } from "@/lib/definitions"

export async function login(
  _prevState: LoginFormState,
  formData: FormData
): Promise<LoginFormState> {
  // trim before parse: z.email() checks format before any .trim()
  const email = String(formData.get("email") ?? "").trim()

  const parsed = LoginSchema.safeParse({
    email,
    password: formData.get("password") ?? "",
    remember: formData.get("remember") === "on",
  })

  if (!parsed.success) {
    return { errors: z.flattenError(parsed.error).fieldErrors, email }
  }

  const ok = await verifyCredentials(parsed.data.email, parsed.data.password)
  if (!ok) {
    // generic msg: don't reveal whether email exists
    return { message: "Invalid email or password.", email }
  }

  // TODO: create session; use parsed.data.remember for cookie maxAge
  redirect("/")
}
