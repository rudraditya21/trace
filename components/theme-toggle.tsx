"use client"

import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { MoonIcon, SunIcon } from "lucide-react"

const THEME_STORAGE_KEY = "theme"

export function ThemeToggle() {
  function toggleTheme() {
    const root = document.documentElement
    const isDark = root.classList.toggle("dark")

    root.style.colorScheme = isDark ? "dark" : "light"
    localStorage.setItem(THEME_STORAGE_KEY, isDark ? "dark" : "light")
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        type="button"
        tooltip="Toggle theme"
        onClick={toggleTheme}
      >
        <MoonIcon className="dark:hidden" aria-hidden="true" />
        <SunIcon className="hidden dark:block" aria-hidden="true" />
        <span className="dark:hidden">Dark mode</span>
        <span className="hidden dark:inline">Light mode</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  )
}
