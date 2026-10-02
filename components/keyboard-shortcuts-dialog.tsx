"use client"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { CommandIcon, KeyboardIcon } from "lucide-react"
import { useEffect, useState } from "react"

const generalShortcuts = [
  { label: "Toggle sidebar", key: "B" },
  { label: "Search", key: "K" },
  { label: "Keyboard shortcuts", key: "H" },
]

function ShortcutKeys({ shortcutKey }: { shortcutKey: string }) {
  return (
    <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
      <kbd className="flex size-5 items-center justify-center rounded border bg-muted font-sans">
        <CommandIcon className="size-3" aria-hidden="true" />
        <span className="sr-only">Command</span>
      </kbd>
      <span>+</span>
      <kbd className="flex size-5 items-center justify-center rounded border bg-muted font-sans uppercase">
        {shortcutKey}
      </kbd>
    </div>
  )
}

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "h") {
        event.preventDefault()
        setOpen(true)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          tooltip="Keyboard shortcuts"
          onClick={() => setOpen(true)}
        >
          <KeyboardIcon aria-hidden="true" />
          <span>Keyboard shortcuts</span>
          <div className="ml-auto flex items-center gap-1 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            <CommandIcon className="size-3!" aria-hidden="true" />
            <span>+</span>
            <span>H</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[70dvh] w-[70dvw] max-w-[70dvw] grid-rows-[auto_minmax(0,1fr)] sm:max-w-[70dvw]">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="grid min-h-0 grid-cols-[minmax(0,1fr)_1px_minmax(0,1fr)] gap-8">
            <section className="min-w-0">
              <h2 className="font-heading mb-3 text-base font-medium">
                General
              </h2>
              {generalShortcuts.map((shortcut) => (
                <div
                  key={shortcut.key}
                  className="flex items-center justify-between gap-4 py-2 text-xs"
                >
                  <span>{shortcut.label}</span>
                  <ShortcutKeys shortcutKey={shortcut.key} />
                </div>
              ))}
            </section>
            <div className="bg-border" aria-hidden="true" />
            <div aria-hidden="true" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
