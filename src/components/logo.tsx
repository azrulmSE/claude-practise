import { Waves } from "lucide-react"

import { cn } from "@/lib/utils"

export function Logo({
  className,
  inverted = false,
}: {
  className?: string
  inverted?: boolean
}) {
  return (
    <div className={cn("flex items-center gap-2 font-semibold", className)}>
      <span
        className={cn(
          "flex size-8 items-center justify-center rounded-lg",
          inverted
            ? "bg-primary-foreground text-primary"
            : "bg-primary text-primary-foreground"
        )}
      >
        <Waves className="size-4" aria-hidden />
      </span>
      Orca
    </div>
  )
}
