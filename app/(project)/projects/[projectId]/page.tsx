import { prisma } from "@/lib/prisma"
import { requireProjectAccess } from "@/lib/project-access"
import { requireSession } from "@/lib/session"
import { notFound } from "next/navigation"
import { connection } from "next/server"

export default async function ProjectEditor({
  params,
}: PageProps<"/projects/[projectId]">) {
  await connection()
  const session = await requireSession()
  const { projectId } = await params
  const access = await requireProjectAccess(projectId, session.user.id)
  const project = await prisma.project.findUnique({
    where: { id: projectId },
    select: {
      name: true,
      description: true,
    },
  })

  if (!project) {
    notFound()
  }

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <header className="border-b px-6 py-4">
        <h1 className="font-heading text-xl font-medium">{project.name}</h1>
        <p className="mt-1 text-xs text-muted-foreground">
          {project.description || "No description"}
        </p>
      </header>
      <main className="flex flex-1 items-center justify-center p-6 text-sm text-muted-foreground">
        {access.canEdit
          ? "The project editor will be added here."
          : "You have view-only access to this project."}
      </main>
    </div>
  )
}
