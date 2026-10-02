import { cn } from "@/lib/utils"

export function PageTitle({
  className,
  ...props
}: React.ComponentProps<"h1">) {
  return (
    <h1
      className={cn("font-heading text-3xl", className)}
      {...props}
    />
  )
}
