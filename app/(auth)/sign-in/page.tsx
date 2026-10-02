import { AuthForm } from "@/components/auth/auth-form"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function SignInPage() {
  if (await getSession()) {
    redirect("/")
  }

  return (
    <div className="grid gap-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-medium">Welcome back</h1>
        <p className="text-sm text-muted-foreground">
          Sign in to continue to your projects.
        </p>
      </div>
      <AuthForm mode="sign-in" />
    </div>
  )
}
