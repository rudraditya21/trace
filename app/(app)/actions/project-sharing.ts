"use server"

import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"

export type InviteToProjectState = {
  success: boolean
  message?: string
  errors?: {
    email?: string
    role?: string
  }
}

const initialError: InviteToProjectState = {
  success: false,
  message: "Could not send the invitation. Please try again.",
}

export async function inviteToProject(
  _previousState: InviteToProjectState,
  formData: FormData
): Promise<InviteToProjectState> {
  const session = await getSession()

  if (!session) {
    return { success: false, message: "You must be signed in to share a project." }
  }

  const projectId = String(formData.get("projectId") ?? "")
  const email = String(formData.get("email") ?? "").trim().toLowerCase()
  const rawRole = formData.get("role")
  const errors: InviteToProjectState["errors"] = {}

  if (!email || !email.includes("@") || email.length > 320) {
    errors.email = "Enter a valid email address."
  }

  if (rawRole !== "EDITOR" && rawRole !== "VIEWER") {
    errors.role = "Choose a valid project role."
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  const role = rawRole === "EDITOR" ? "EDITOR" : "VIEWER"

  try {
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        ownerId: session.user.id,
      },
      select: { id: true },
    })

    if (!project) {
      return { success: false, message: "Only the project owner can invite people." }
    }

    const invitee = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        },
      },
      select: { id: true },
    })

    if (!invitee) {
      return {
        success: false,
        errors: { email: "No Trace account exists with this email." },
      }
    }

    if (invitee.id === session.user.id) {
      return {
        success: false,
        errors: { email: "You already own this project." },
      }
    }

    const existingMember = await prisma.projectMember.findUnique({
      where: {
        projectId_userId: {
          projectId,
          userId: invitee.id,
        },
      },
      select: { id: true },
    })

    if (existingMember) {
      return {
        success: false,
        errors: { email: "This person already has access to the project." },
      }
    }

    await prisma.projectInvitation.upsert({
      where: {
        projectId_inviteeId: {
          projectId,
          inviteeId: invitee.id,
        },
      },
      update: {
        inviterId: session.user.id,
        role,
        status: "PENDING",
      },
      create: {
        projectId,
        inviterId: session.user.id,
        inviteeId: invitee.id,
        role,
      },
    })

    revalidatePath("/inbox")
    return { success: true, message: "Invitation sent." }
  } catch (error) {
    console.error("Failed to invite project member", error)
    return initialError
  }
}

export async function respondToProjectInvitation(formData: FormData) {
  const session = await getSession()

  if (!session) {
    return
  }

  const invitationId = String(formData.get("invitationId") ?? "")
  const decision = formData.get("decision")

  if (!invitationId || (decision !== "accept" && decision !== "decline")) {
    return
  }

  try {
    await prisma.$transaction(async (transaction) => {
      const invitation = await transaction.projectInvitation.findFirst({
        where: {
          id: invitationId,
          inviteeId: session.user.id,
          status: "PENDING",
        },
        select: {
          id: true,
          projectId: true,
          role: true,
        },
      })

      if (!invitation) {
        return
      }

      if (decision === "accept") {
        await transaction.projectMember.upsert({
          where: {
            projectId_userId: {
              projectId: invitation.projectId,
              userId: session.user.id,
            },
          },
          update: { role: invitation.role },
          create: {
            projectId: invitation.projectId,
            userId: session.user.id,
            role: invitation.role,
          },
        })

        await transaction.project.update({
          where: { id: invitation.projectId },
          data: { visibility: "SHARED" },
        })
      }

      await transaction.projectInvitation.update({
        where: { id: invitation.id },
        data: { status: decision === "accept" ? "ACCEPTED" : "DECLINED" },
      })
    })

    revalidatePath("/", "layout")
    revalidatePath("/inbox")
  } catch (error) {
    console.error("Failed to respond to project invitation", error)
  }
}
