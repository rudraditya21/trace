"use server"

import { ProjectVisibility } from "@/generated/prisma/enums"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import { revalidatePath } from "next/cache"

export type CreateProjectState = {
  success: boolean
  message?: string
  errors?: {
    name?: string
    description?: string
  }
}

export async function createProject(
  _previousState: CreateProjectState,
  formData: FormData
): Promise<CreateProjectState> {
  const session = await getSession()

  if (!session) {
    return {
      success: false,
      message: "You must be signed in to create a project.",
    }
  }

  const rawName = formData.get("name")
  const rawDescription = formData.get("description")
  const name = typeof rawName === "string" ? rawName.trim() : ""
  const description =
    typeof rawDescription === "string" ? rawDescription.trim() : ""

  const errors: CreateProjectState["errors"] = {}

  if (!name) {
    errors.name = "Project name is required."
  } else if (name.length > 120) {
    errors.name = "Project name must be 120 characters or fewer."
  }

  if (description.length > 500) {
    errors.description = "Description must be 500 characters or fewer."
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, errors }
  }

  try {
    await prisma.project.create({
      data: {
        name,
        description: description || null,
        visibility: ProjectVisibility.PRIVATE,
        ownerId: session.user.id,
      },
    })

    revalidatePath("/", "layout")
    return { success: true }
  } catch (error) {
    console.error("Failed to create project", error)
    return {
      success: false,
      message: "Could not create the project. Please try again.",
    }
  }
}
