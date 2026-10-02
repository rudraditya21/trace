"use client"

import {
  inviteToProject,
  type InviteToProjectState,
} from "@/app/(app)/actions/project-sharing"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Share2Icon } from "lucide-react"
import { useId, useRef, useState } from "react"
import { useFormStatus } from "react-dom"

const initialState: InviteToProjectState = {
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Sending..." : "Send invitation"}
    </Button>
  )
}

type ShareProjectDialogProps = {
  projectId: string
  projectName: string
}

export function ShareProjectDialog({
  projectId,
  projectName,
}: ShareProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<InviteToProjectState>(initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()

  async function handleSubmit(formData: FormData) {
    const nextState = await inviteToProject(initialState, formData)
    setState(nextState)

    if (nextState.success) {
      formRef.current?.reset()
    }
  }

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => {
          setState(initialState)
          setOpen(true)
        }}
      >
        <Share2Icon aria-hidden="true" />
        Share
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-heading text-xl">
              Share {projectName}
            </DialogTitle>
          </DialogHeader>
          <form ref={formRef} action={handleSubmit} className="grid gap-4">
            <input type="hidden" name="projectId" value={projectId} />
            <div className="grid gap-1.5">
              <label htmlFor={`${id}-email`} className="text-sm font-medium">
                Email
              </label>
              <Input
                id={`${id}-email`}
                name="email"
                type="email"
                placeholder="researcher@example.com"
                autoComplete="email"
                maxLength={320}
                required
                aria-invalid={Boolean(state.errors?.email)}
                aria-describedby={
                  state.errors?.email ? `${id}-email-error` : undefined
                }
              />
              {state.errors?.email && (
                <p id={`${id}-email-error`} className="text-xs text-destructive">
                  {state.errors.email}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <label htmlFor={`${id}-role`} className="text-sm font-medium">
                Access
              </label>
              <select
                id={`${id}-role`}
                name="role"
                defaultValue="EDITOR"
                className="h-8 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 dark:bg-input/30"
                aria-invalid={Boolean(state.errors?.role)}
              >
                <option value="EDITOR">Can edit</option>
                <option value="VIEWER">Can view</option>
              </select>
              {state.errors?.role && (
                <p className="text-xs text-destructive">{state.errors.role}</p>
              )}
            </div>
            {state.message && (
              <p
                className={
                  state.success
                    ? "text-sm text-emerald-600 dark:text-emerald-400"
                    : "text-sm text-destructive"
                }
                role="status"
              >
                {state.message}
              </p>
            )}
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
              >
                Cancel
              </Button>
              <SubmitButton />
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
