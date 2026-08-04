import type { ReactNode } from "react"
import TypeStripe from "@/components/shared/TypeStripe/TypeStripe"

interface Props {
  eyebrow: string
  title: string
  description: string
  footer: ReactNode
  children: ReactNode
}

export default function AuthLayout({ eyebrow, title, description, footer, children }: Props) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-4 py-10">
      <div className="w-full max-w-sm overflow-hidden rounded-xl border border-border bg-card shadow-sm">
        <TypeStripe />

        <div className="flex flex-col gap-6 p-6">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {eyebrow}
            </span>
            <h1 className="font-heading text-2xl font-semibold text-foreground">
              {title}
            </h1>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          {children}

          <p className="text-center text-sm text-muted-foreground">{footer}</p>
        </div>
      </div>
    </div>
  )
}
