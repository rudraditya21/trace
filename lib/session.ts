import "server-only"

import { auth } from "@/lib/auth"
import { cache } from "react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export const getSession = cache(async () =>
  auth.api.getSession({
    headers: await headers(),
  })
)

export const requireSession = cache(async () => {
  const session = await getSession()

  if (!session) {
    redirect("/sign-in")
  }

  return session
})
