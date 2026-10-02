import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { prisma } from "@/lib/prisma"
import { connection } from "next/server"

export default async function RootLayout({ children }: LayoutProps<"/">) {
  await connection()

  const projects = await prisma.project.findMany({
    select: {
      id: true,
      name: true,
      visibility: true,
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <SidebarProvider>
      <AppSidebar projects={projects} />
      <SidebarInset>
        <SidebarTrigger />
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
