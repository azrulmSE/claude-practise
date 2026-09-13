import * as z from "zod"

export const LoginSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }),
  password: z.string().min(1, { error: "Password is required." }),
  remember: z.boolean(),
})

export type LoginFormState =
  | {
      errors?: Partial<Record<"email" | "password", string[]>>
      message?: string
      email?: string
    }
  | undefined
