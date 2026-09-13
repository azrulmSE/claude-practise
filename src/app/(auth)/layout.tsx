import { AuthGlows, AuthShowcase } from "@/components/auth/auth-showcase"
import { Logo } from "@/components/logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="grid min-h-svh flex-1 lg:grid-cols-2">
      <aside className="relative hidden overflow-hidden bg-primary p-10 text-primary-foreground lg:flex lg:flex-col lg:items-center lg:justify-between lg:gap-10">
        <AuthGlows />

        <Logo inverted className="relative" />

        <AuthShowcase />

        <p className="relative text-xs text-primary-foreground/50">
          © {new Date().getFullYear()} Orca
        </p>
      </aside>

      <main className="flex items-center justify-center p-6 md:p-10">
        {children}
      </main>
    </div>
  )
}
