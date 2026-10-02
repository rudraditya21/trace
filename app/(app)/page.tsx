import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"
import { NewProjectDialog } from "@/components/projects/new-project-dialog"
import { ShareProjectDialog } from "@/components/projects/share-project-dialog"
import { Button } from "@/components/ui/button"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"
import { requireSession } from "@/lib/session"
import { ArrowRightIcon } from "lucide-react"
import { connection } from "next/server"

export default async function Home() {
  await connection()
  const session = await requireSession()

  const projects = await prisma.project.findMany({
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
    orderBy: { createdAt: "desc" },
  })
  const yourProjects = projects.filter(
    (project) => project.visibility === "PRIVATE"
  )
  const sharedProjects = projects.filter(
    (project) => project.visibility === "SHARED"
  )

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Home</PageTitle>
        <PageDescription>
          View and manage your projects and recent activity.
        </PageDescription>
      </div>
      <Tabs defaultValue="your-projects" className="w-full gap-3">
        <div className="flex w-full items-center justify-between gap-4 pb-3">
          <TabsList variant="line">
            <TabsTrigger value="your-projects">Your Projects</TabsTrigger>
            <TabsTrigger value="shared-projects">Shared Projects</TabsTrigger>
          </TabsList>
          <NewProjectDialog />
        </div>
        <TabsContent value="your-projects">
          {yourProjects.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Create your first project to get started.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {yourProjects.map((project) => (
                <ProjectCard key={project.id} project={project} canShare />
              ))}
            </div>
          )}
        </TabsContent>
        <TabsContent value="shared-projects">
          {sharedProjects.length === 0 ? (
            <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-muted-foreground">
              Projects shared with you will appear here.
            </div>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {sharedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  canShare={project.ownerId === session.user.id}
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

type ProjectCardProps = {
  project: {
    id: string
    name: string
    description: string | null
    visibility: "PRIVATE" | "SHARED"
  }
  canShare?: boolean
}

function ProjectCard({ project, canShare = false }: ProjectCardProps) {
  return (
    <article className="grid min-h-32 content-between gap-4 rounded-xl border bg-card p-4 text-card-foreground">
      <div className="grid gap-2">
        <div className="flex items-start justify-between gap-3">
          <h3 className="min-w-0 truncate font-heading text-lg font-medium">
            {project.name}
          </h3>
          <span className="shrink-0 rounded-md bg-muted px-2 py-1 text-xs text-muted-foreground">
            {project.visibility === "PRIVATE" ? "Private" : "Shared"}
          </span>
        </div>
        <p className="line-clamp-2 text-sm text-muted-foreground">
          {project.description || "No description"}
        </p>
      </div>
      <div className="flex gap-2">
        {canShare && (
          <ShareProjectDialog
            projectId={project.id}
            projectName={project.name}
          />
        )}
        <Button type="button" size="sm" className="flex-1">
          Open project
          <ArrowRightIcon data-icon="inline-end" aria-hidden="true" />
        </Button>
      </div>
    </article>
  )
}
