import { AuthForm } from "@/components/auth/auth-form"
import { getSession } from "@/lib/session"
import { redirect } from "next/navigation"

export default async function SignUpPage() {
  if (await getSession()) {
    redirect("/")
  }

  return (
    <div className="grid gap-6">
      <div className="text-center">
        <h1 className="font-heading text-2xl font-medium">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Start organizing your research and projects.
        </p>
      </div>
      <AuthForm mode="sign-up" />
    </div>
  )
}
