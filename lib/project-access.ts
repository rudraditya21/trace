import "server-only"

import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

export type ProjectAccessRole = "OWNER" | "EDITOR" | "VIEWER"

export async function getProjectAccess(projectId: string, userId: string) {
  const project = await prisma.project.findFirst({
    where: {
      id: projectId,
      OR: [
        { ownerId: userId },
        {
          members: {
            some: { userId },
          },
        },
      ],
    },
    select: {
      id: true,
      ownerId: true,
      members: {
        where: { userId },
        select: { role: true },
        take: 1,
      },
    },
  })

  if (!project) {
    return null
  }

  let role: ProjectAccessRole

  if (project.ownerId === userId) {
    role = "OWNER"
  } else {
    const memberRole = project.members[0]?.role

    if (!memberRole) {
      return null
    }

    role = memberRole
  }

  return {
    projectId: project.id,
    role,
    canEdit: role === "OWNER" || role === "EDITOR",
    canManageMembers: role === "OWNER",
  }
}

export async function requireProjectAccess(projectId: string, userId: string) {
  const access = await getProjectAccess(projectId, userId)

  if (!access) {
    notFound()
  }

  return access
}
