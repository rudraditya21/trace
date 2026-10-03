import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { requireProjectAccess } from "@/lib/project-access"
import { requireSession } from "@/lib/session"
import {
  FileTextIcon,
  NotebookPenIcon,
  PlusIcon,
} from "lucide-react"
import { notFound } from "next/navigation"
import { connection } from "next/server"
import type { ReactNode } from "react"

export default async function ProjectHome({
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
      <header className="px-6 py-5">
        <h1 className="font-heading text-2xl font-medium">{project.name}</h1>
        <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
          {project.description || "No description"}
        </p>
      </header>
      <main className="w-full p-6">
        <ProjectFilesSection
          id="notes"
          title="Notes"
          description="All notes created in this project."
          emptyMessage="No notes in this project yet."
          actionLabel="New note"
          canCreate={access.canEdit}
          icon={<NotebookPenIcon className="size-4" aria-hidden="true" />}
        />
      </main>
    </div>
  )
}

type ProjectFilesSectionProps = {
  id: string
  title: string
  description: string
  emptyMessage: string
  actionLabel: string
  canCreate: boolean
  icon: ReactNode
}

function ProjectFilesSection({
  id,
  title,
  description,
  emptyMessage,
  actionLabel,
  canCreate,
  icon,
}: ProjectFilesSectionProps) {
  return (
    <section id={id} className="scroll-mt-6">
      <div className="flex items-start justify-between gap-4 pb-3">
        <div>
          <div className="flex items-center gap-2">
            {icon}
            <h2 className="font-heading text-lg font-medium">{title}</h2>
            <span className="text-xs text-muted-foreground">0 files</span>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        {canCreate && (
          <Button type="button" size="sm">
            <PlusIcon data-icon="inline-start" aria-hidden="true" />
            {actionLabel}
          </Button>
        )}
      </div>
      <div className="flex min-h-32 items-center justify-center border-t px-4 py-8 text-center">
        <div className="grid justify-items-center gap-2 text-muted-foreground">
          <FileTextIcon className="size-5" aria-hidden="true" />
          <p className="text-sm">{emptyMessage}</p>
        </div>
      </div>
    </section>
  )
}
