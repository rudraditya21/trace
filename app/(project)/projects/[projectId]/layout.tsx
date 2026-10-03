import { ProjectSidebar } from "@/components/project-sidebar"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { prisma } from "@/lib/prisma"
import { requireProjectAccess } from "@/lib/project-access"
import { requireSession } from "@/lib/session"
import { notFound } from "next/navigation"
import { connection } from "next/server"

export default async function ProjectLayout({
  children,
  params,
}: LayoutProps<"/projects/[projectId]">) {
  await connection()
  const session = await requireSession()
  const { projectId } = await params
  const access = await requireProjectAccess(projectId, session.user.id)
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      id: true,
      name: true,
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <SidebarProvider>
      <ProjectSidebar project={project} role={access.role} user={session.user} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
