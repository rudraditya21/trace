"use client"

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { authClient } from "@/lib/auth-client"
import { LogOutIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

type UserMenuProps = {
  user: {
    name: string
  }
}

export function UserMenu({ user }: UserMenuProps) {
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const initial = user.name.trim().charAt(0).toUpperCase() || "U"

  async function signOut() {
    setPending(true)
    const result = await authClient.signOut()

    if (result.error) {
      setPending(false)
      return
    }

    router.push("/sign-in")
    router.refresh()
  }

  return (
    <>
      <SidebarMenuItem>
        <div className="flex h-8 min-w-0 items-center gap-2">
          <span className="ml-[8px] mb-[3px] flex size-4 shrink-0 items-center justify-center">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-sidebar-accent text-[10px] font-medium text-sidebar-accent-foreground">
              {initial}
            </span>
          </span>
          <span className="min-w-0 truncate text-sm font-medium group-data-[collapsible=icon]:hidden">
            {user.name}
          </span>
        </div>
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          tooltip="Sign out"
          disabled={pending}
          onClick={signOut}
          className="ml-[2px] border border-destructive/50 bg-[color-mix(in_oklch,var(--destructive)_12%,var(--background))] text-destructive hover:bg-[color-mix(in_oklch,var(--destructive)_20%,var(--background))] hover:text-destructive active:bg-[color-mix(in_oklch,var(--destructive)_24%,var(--background))] active:text-destructive"
        >
          <LogOutIcon aria-hidden="true" />
          <span>{pending ? "Signing out..." : "Sign out"}</span>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </>
  )
}
