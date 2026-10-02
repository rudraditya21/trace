"use client"

import { KeyboardShortcutsDialog } from "@/components/keyboard-shortcuts-dialog"
import { NewProjectDialog } from "@/components/projects/new-project-dialog"
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
import { HomeIcon, InboxIcon, SettingsIcon, WaypointsIcon } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

type SidebarProject = {
  id: string
  name: string
  visibility: "PRIVATE" | "SHARED"
}

type AppSidebarProps = {
  projects: SidebarProject[]
}

export function AppSidebar({ projects }: AppSidebarProps) {
  const pathname = usePathname()
  const privateProjects = projects.filter(
    (project) => project.visibility === "PRIVATE"
  )
  const sharedProjects = projects.filter(
    (project) => project.visibility === "SHARED"
  )

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
          <NewProjectDialog trigger="sidebar-group-action" />
          <SidebarGroupContent>
            {privateProjects.length > 0 ? (
              <SidebarMenu>
                {privateProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      type="button"
                      size="default"
                      tooltip={project.name}
                    >
                      <span className="group-data-[collapsible=icon]:hidden">
                        {project.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <p className="px-2 text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
                No private projects yet.
              </p>
            )}
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Shared</SidebarGroupLabel>
          <SidebarGroupContent>
            {sharedProjects.length > 0 ? (
              <SidebarMenu>
                {sharedProjects.map((project) => (
                  <SidebarMenuItem key={project.id}>
                    <SidebarMenuButton
                      type="button"
                      size="sm"
                      tooltip={project.name}
                    >
                      <span className="group-data-[collapsible=icon]:hidden">
                        {project.name}
                      </span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            ) : (
              <p className="px-2 text-xs text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
                No shared projects yet.
              </p>
            )}
          </SidebarGroupContent>
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
