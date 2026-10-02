export type ThemePreference = "light" | "dark" | "system"

const THEME_STORAGE_KEY = "theme"
const PREFERENCES_CHANGE_EVENT = "trace:preferences-change"

export function getThemePreference(): ThemePreference {
  if (typeof window === "undefined") return "system"

  const theme = localStorage.getItem(THEME_STORAGE_KEY)
  return theme === "light" || theme === "dark" ? theme : "system"
}

function prefersDarkMode() {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
}

export function syncDocumentPreferences() {
  const theme = getThemePreference()
  const isDark = theme === "dark" || (theme === "system" && prefersDarkMode())
  const root = document.documentElement

  root.classList.toggle("dark", isDark)
  root.style.colorScheme = isDark ? "dark" : "light"
}

export function setThemePreference(theme: ThemePreference) {
  localStorage.setItem(THEME_STORAGE_KEY, theme)
  syncDocumentPreferences()
  window.dispatchEvent(new Event(PREFERENCES_CHANGE_EVENT))
}

export function getPreferencesSnapshot() {
  if (typeof window === "undefined") return "system|light"

  const theme = getThemePreference()
  const effectiveTheme =
    theme === "dark" || (theme === "system" && prefersDarkMode())
      ? "dark"
      : "light"

  return `${theme}|${effectiveTheme}`
}

export function subscribeToPreferences(callback: () => void) {
  const colorScheme = window.matchMedia("(prefers-color-scheme: dark)")

  function handleChange() {
    syncDocumentPreferences()
    callback()
  }

  window.addEventListener(PREFERENCES_CHANGE_EVENT, handleChange)
  window.addEventListener("storage", handleChange)
  colorScheme.addEventListener("change", handleChange)

  return () => {
    window.removeEventListener(PREFERENCES_CHANGE_EVENT, handleChange)
    window.removeEventListener("storage", handleChange)
    colorScheme.removeEventListener("change", handleChange)
  }
}
