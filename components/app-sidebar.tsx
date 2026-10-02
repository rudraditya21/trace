import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
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
  CommandIcon,
  HomeIcon,
  InboxIcon,
  SearchIcon,
  SettingsIcon,
  WaypointsIcon,
} from "lucide-react"
import Link from "next/link"

export function AppSidebar() {
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
                <SidebarMenuItem>
                  <SidebarMenuButton type="button" tooltip="Search">
                    <SearchIcon aria-hidden="true" />
                    <span>Search</span>
                    <div className="ml-auto flex items-center gap-1 text-xs text-sidebar-foreground/60 group-data-[collapsible=icon]:hidden">
                      <CommandIcon className="size-3!" aria-hidden="true" />
                      <span>+</span>
                      <span>K</span>
                    </div>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/" />}
                    tooltip="Home"
                    isActive
                  >
                    <HomeIcon aria-hidden="true" />
                    <span>Home</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton type="button" tooltip="Inbox">
                    <InboxIcon aria-hidden="true" />
                    <span>Inbox</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton type="button" tooltip="Settings">
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
