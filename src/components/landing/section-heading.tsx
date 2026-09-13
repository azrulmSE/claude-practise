import { cn } from "@/lib/utils"

export function SectionHeading({
  eyebrow,
  title,
  description,
  className,
}: {
  eyebrow: string
  title: string
  description?: string
  className?: string
}) {
  return (
    <div
      className={cn(
        "mx-auto flex max-w-2xl flex-col items-center gap-4 text-center",
        className
      )}
    >
      <p className="text-sm font-medium text-muted-foreground">{eyebrow}</p>
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description && (
        <p className="text-balance text-muted-foreground">{description}</p>
      )}
    </div>
  )
}
