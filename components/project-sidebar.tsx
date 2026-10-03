"use client"

import { UserMenu } from "@/components/auth/user-menu"
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
import type { ProjectAccessRole } from "@/lib/project-access"
import { ArrowLeftIcon, FileTextIcon, WaypointsIcon } from "lucide-react"
import Link from "next/link"

type ProjectSidebarProps = {
  project: {
    id: string
    name: string
  }
  role: ProjectAccessRole
  user: {
    name: string
  }
}

export function ProjectSidebar({ project, role, user }: ProjectSidebarProps) {
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton render={<Link href="/" />} tooltip="All projects">
              <ArrowLeftIcon aria-hidden="true" />
              <span>All projects</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <div className="flex min-w-0 items-center gap-2 px-2 py-2 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-foreground text-background">
            <WaypointsIcon className="size-5" aria-hidden="true" />
          </div>
          <div className="min-w-0 group-data-[collapsible=icon]:hidden">
            <p className="truncate font-heading text-sm font-medium">
              {project.name}
            </p>
            <p className="text-xs capitalize text-sidebar-foreground/60">
              {role.toLowerCase()}
            </p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Project</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton
                  render={<Link href={`/projects/${project.id}`} />}
                  tooltip="Editor"
                  isActive
                >
                  <FileTextIcon aria-hidden="true" />
                  <span>Editor</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <KeyboardShortcutsDialog />
          <ThemeToggle />
          <UserMenu user={user} />
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
