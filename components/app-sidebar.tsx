"use client"

import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { SearchCommand } from "@/components/search-command"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  HomeIcon,
  InboxIcon,
  SettingsIcon,
  WaypointsIcon,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar collapsible="icon">
        <SidebarHeader>
          <div className="flex items-center justify-center gap-2">
            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
              <WaypointsIcon className="size-5" aria-hidden="true" />
            </div>
            <h1 className="font-heading text-4xl group-data-[collapsible=icon]:hidden">Trace</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupContent>
              <SidebarMenu>
                <SearchCommand />
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/" />}
                    tooltip="Home"
                    isActive={pathname === "/"}
                  >
                    <HomeIcon aria-hidden="true" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/inbox" />}
                    tooltip="Inbox"
                    isActive={pathname === "/inbox"}
                  >
                    <InboxIcon aria-hidden="true" />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/settings" />}
                    tooltip="Settings"
                    isActive={pathname === "/settings"}
                  >
                    <SettingsIcon aria-hidden="true" />
                    <span>Settings</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Private</SidebarGroupLabel>
            <SidebarGroupContent />
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>Shared</SidebarGroupLabel>
            <SidebarGroupContent />
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <KeyboardShortcutsDialog />
            <ThemeToggle />
          </SidebarMenu>
        </SidebarFooter>
    </Sidebar>
  )
}
