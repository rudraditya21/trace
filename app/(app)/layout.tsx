import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { prisma } from "@/lib/prisma"
import { requireSession } from "@/lib/session"
import { connection } from "next/server"

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection()
  const session = await requireSession()

  const projects = await prisma.project
    .findMany({
      where: {
        OR: [
          { ownerId: session.user.id },
          {
            members: {
              some: { userId: session.user.id },
            },
          },
        ],
      },
      select: {
        id: true,
        name: true,
        visibility: true,
      },
      orderBy: { createdAt: "desc" },
    })
    .catch((error) => {
      console.error("Failed to load sidebar projects", error)
      return []
    })

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} user={session.user} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
