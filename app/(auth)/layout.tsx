import { WaypointsIcon } from "lucide-react"

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <main className="grid min-h-dvh place-items-center px-6 py-10">
      <div className="grid w-full max-w-sm gap-8">
        <div className="flex items-center justify-center gap-2">
          <div className="flex size-8 items-center justify-center rounded-md bg-foreground text-background">
            <WaypointsIcon className="size-5" aria-hidden="true" />
          </div>
          <span className="font-heading text-3xl">Trace</span>
        </div>
        {children}
      </div>
    </main>
  )
}
