import "server-only"

// TODO: replace w/ real auth provider (Auth.js / Better Auth)
const DEMO_USER = { email: "demo@orca.dev", password: "Password123!" }

export async function verifyCredentials(email: string, password: string) {
  // fake latency so pending UI is visible
  await new Promise((resolve) => setTimeout(resolve, 300))
  return (
    email.toLowerCase() === DEMO_USER.email && password === DEMO_USER.password
  )
}
