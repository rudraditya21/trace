"use client"

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  CommandIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export function SearchCommand() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  function selectItem(action?: () => void) {
    setOpen(false)
    action?.()
  }

  return (
    <>
      <SidebarMenuItem>
        <SidebarMenuButton
          type="button"
          tooltip="Search"
          onClick={() => setOpen(true)}
        >
          <SearchIcon aria-hidden="true" />
          <span>Search</span>
          <div className="ml-auto flex items-center gap-1 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
            <CommandIcon className="size-3!" aria-hidden="true" />
            <span>+</span>
            <span>K</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
      <CommandDialog
        open={open}
        onOpenChange={setOpen}
        title="Search"
        description="Search navigation"
      >
        <Command>
          <CommandInput placeholder="Search..." autoFocus />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Navigation">
              <CommandItem
                value="home"
                onSelect={() => selectItem(() => router.push("/"))}
              >
                <HomeIcon aria-hidden="true" />
                <span>Home</span>
              </CommandItem>
              <CommandItem value="inbox" onSelect={() => selectItem()}>
                <InboxIcon aria-hidden="true" />
                <span>Inbox</span>
              </CommandItem>
              <CommandItem value="settings" onSelect={() => selectItem()}>
                <SettingsIcon aria-hidden="true" />
                <span>Settings</span>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}
