"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { FormEvent, useState } from "react"

type AccountSettingsProps = {
  user: {
    name: string
    email: string
  }
}

export function AccountSettings({ user }: AccountSettingsProps) {
  const router = useRouter()
  const [profilePending, setProfilePending] = useState(false)
  const [profileMessage, setProfileMessage] = useState<string>()
  const [profileError, setProfileError] = useState<string>()
  const [passwordPending, setPasswordPending] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>()

  async function updateProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setProfilePending(true)
    setProfileMessage(undefined)
    setProfileError(undefined)

    const formData = new FormData(event.currentTarget)
    const name = String(formData.get("name") ?? "").trim()

    try {
      const result = await authClient.updateUser({ name })

      if (result.error) {
        setProfileError(result.error.message || "Could not update your profile.")
        return
      }

      setProfileMessage("Profile updated.")
      router.refresh()
    } catch {
      setProfileError("Could not update your profile. Please try again.")
    } finally {
      setProfilePending(false)
    }
  }

  async function changePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setPasswordPending(true)
    setPasswordMessage(undefined)
    setPasswordError(undefined)

    const form = event.currentTarget
    const formData = new FormData(form)
    const currentPassword = String(formData.get("currentPassword") ?? "")
    const newPassword = String(formData.get("newPassword") ?? "")
    const confirmPassword = String(formData.get("confirmPassword") ?? "")

    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match.")
      setPasswordPending(false)
      return
    }

    try {
      const result = await authClient.changePassword({
        currentPassword,
        newPassword,
        revokeOtherSessions: true,
      })

      if (result.error) {
        setPasswordError(result.error.message || "Could not change your password.")
        return
      }

      form.reset()
      setPasswordMessage("Password updated. Other sessions were signed out.")
    } catch {
      setPasswordError("Could not change your password. Please try again.")
    } finally {
      setPasswordPending(false)
    }
  }

  return (
    <section className="grid gap-4">
      <div>
        <h2 className="font-heading text-lg font-medium">Account</h2>
        <p className="text-sm text-muted-foreground">
          Manage your profile and sign-in credentials.
        </p>
      </div>
      <form onSubmit={updateProfile} className="grid gap-4">
        <div className="grid gap-4">
          <div className="grid w-full max-w-2xl gap-1.5">
            <label htmlFor="account-name" className="text-sm font-medium">
              Name
            </label>
            <Input
              id="account-name"
              name="name"
              defaultValue={user.name}
              maxLength={100}
              autoComplete="name"
              required
            />
          </div>
          <div className="grid w-full max-w-2xl gap-1.5">
            <label htmlFor="account-email" className="text-sm font-medium">
              Email
            </label>
            <Input
              id="account-email"
              value={user.email}
              type="email"
              readOnly
              aria-readonly="true"
            />
            <p className="text-xs text-muted-foreground">
              Email changes require verification and are not enabled yet.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" size="sm" disabled={profilePending}>
            {profilePending ? "Saving..." : "Save profile"}
          </Button>
          {profileMessage && (
            <p className="text-xs text-muted-foreground" role="status">
              {profileMessage}
            </p>
          )}
          {profileError && (
            <p className="text-xs text-destructive" role="alert">
              {profileError}
            </p>
          )}
        </div>
      </form>
      <form onSubmit={changePassword} className="grid gap-4">
        <div>
          <p className="text-sm font-medium">Change password</p>
          <p className="text-xs text-muted-foreground">
            Updating your password signs out your other sessions.
          </p>
        </div>
        <div className="grid gap-4">
          <div className="grid w-full max-w-2xl gap-1.5">
            <label htmlFor="current-password" className="text-sm font-medium">
              Current password
            </label>
            <Input
              id="current-password"
              name="currentPassword"
              type="password"
              autoComplete="current-password"
              required
            />
          </div>
          <div className="grid w-full max-w-2xl gap-1.5">
            <label htmlFor="new-password" className="text-sm font-medium">
              New password
            </label>
            <Input
              id="new-password"
              name="newPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
            />
          </div>
          <div className="grid w-full max-w-2xl gap-1.5">
            <label htmlFor="confirm-new-password" className="text-sm font-medium">
              Confirm new password
            </label>
            <Input
              id="confirm-new-password"
              name="confirmPassword"
              type="password"
              autoComplete="new-password"
              minLength={8}
              maxLength={128}
              required
            />
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button type="submit" size="sm" disabled={passwordPending}>
            {passwordPending ? "Updating..." : "Update password"}
          </Button>
          {passwordMessage && (
            <p className="text-xs text-muted-foreground" role="status">
              {passwordMessage}
            </p>
          )}
          {passwordError && (
            <p className="text-xs text-destructive" role="alert">
              {passwordError}
            </p>
          )}
        </div>
      </form>
    </section>
  )
}
