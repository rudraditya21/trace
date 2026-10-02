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
import { useState } from "react"

export function KeyboardShortcutsDialog() {
  const [open, setOpen] = useState(false)

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
        </SidebarMenuButton>
      </SidebarMenuItem>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="h-[70dvh] w-[70dvw] max-w-[70dvw] content-start sm:max-w-[70dvw]">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Keyboard Shortcuts
            </DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-3 gap-8">
            <section className="min-w-0">
              <h2 className="font-heading mb-3 text-base font-medium">
                General
              </h2>
              <div className="flex items-center justify-between gap-4 py-2">
                <span>Toggle sidebar</span>
                <div className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground">
                  <kbd className="flex size-6 items-center justify-center rounded border bg-muted font-sans">
                    <CommandIcon className="size-3.5" aria-hidden="true" />
                    <span className="sr-only">Command</span>
                  </kbd>
                  <span>/</span>
                  <kbd className="flex h-6 items-center rounded border bg-muted px-1.5 font-sans">
                    Ctrl
                  </kbd>
                  <span>+</span>
                  <kbd className="flex size-6 items-center justify-center rounded border bg-muted font-sans uppercase">
                    B
                  </kbd>
                </div>
              </div>
            </section>
            <div aria-hidden="true" />
            <div aria-hidden="true" />
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
