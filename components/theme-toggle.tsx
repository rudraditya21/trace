"use client"

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  getPreferencesSnapshot,
  setThemePreference,
  subscribeToPreferences,
} from "@/lib/preferences"
import { MoonIcon, SunIcon } from "lucide-react"
import { useSyncExternalStore } from "react"

export function ThemeToggle() {
  const snapshot = useSyncExternalStore(
    subscribeToPreferences,
    getPreferencesSnapshot,
    () => "system|light"
  )
  const isDark = snapshot.endsWith("|dark")

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Toggle theme"
        onClick={() => setThemePreference(isDark ? "light" : "dark")}
      >
        <MoonIcon className="dark:hidden" aria-hidden="true" />
        <SunIcon className="hidden dark:block" aria-hidden="true" />
        <span className="dark:hidden">Dark mode</span>
        <span className="hidden dark:inline">Light mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
