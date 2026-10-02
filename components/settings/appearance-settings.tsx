"use client"

import { Button } from "@/components/ui/button"
import {
  getPreferencesSnapshot,
  setThemePreference,
  subscribeToPreferences,
  type ThemePreference,
} from "@/lib/preferences"
import { LaptopIcon, MoonIcon, SunIcon } from "lucide-react"
import { useSyncExternalStore } from "react"

const SERVER_SNAPSHOT = "system|light"

export function AppearanceSettings() {
  const snapshot = useSyncExternalStore(
    subscribeToPreferences,
    getPreferencesSnapshot,
    () => SERVER_SNAPSHOT
  )
  const [theme] = snapshot.split("|") as [ThemePreference, string]

  return (
    <section className="grid gap-3">
      <div>
        <h2 className="font-heading text-lg font-medium">Appearance</h2>
        <p className="text-sm text-muted-foreground">
          Customize how Trace looks and feels on this device.
        </p>
      </div>
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium">Theme</p>
          <p className="text-xs text-muted-foreground">
            Choose a light, dark, or system appearance.
          </p>
        </div>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Theme">
          <ThemeButton
            value="light"
            currentValue={theme}
            label="Light"
            icon={<SunIcon aria-hidden="true" />}
          />
          <ThemeButton
            value="dark"
            currentValue={theme}
            label="Dark"
            icon={<MoonIcon aria-hidden="true" />}
          />
          <ThemeButton
            value="system"
            currentValue={theme}
            label="System"
            icon={<LaptopIcon aria-hidden="true" />}
          />
        </div>
      </div>
    </section>
  )
}

function ThemeButton({
  value,
  currentValue,
  label,
  icon,
}: {
  value: ThemePreference
  currentValue: ThemePreference
  label: string
  icon: React.ReactNode
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={currentValue === value ? "default" : "outline"}
      aria-pressed={currentValue === value}
      onClick={() => setThemePreference(value)}
    >
      {icon}
      {label}
    </Button>
  )
}
