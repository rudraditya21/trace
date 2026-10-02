"use client"

import {
  createProject,
  type CreateProjectState,
} from "@/app/(app)/actions/projects"
import { Button } from "@/components/ui/button"
import { SidebarGroupAction } from "@/components/ui/sidebar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { PlusIcon } from "lucide-react"
import { useId, useRef, useState } from "react"
import { useFormStatus } from "react-dom"

const initialState: CreateProjectState = {
  success: false,
}

function SubmitButton() {
  const { pending } = useFormStatus()

  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Creating..." : "Create project"}
    </Button>
  )
}

type NewProjectDialogProps = {
  trigger?: "button" | "sidebar-group-action"
}

export function NewProjectDialog({
  trigger = "button",
}: NewProjectDialogProps) {
  const [open, setOpen] = useState(false)
  const [state, setState] = useState<CreateProjectState>(initialState)
  const formRef = useRef<HTMLFormElement>(null)
  const id = useId()

  function openDialog() {
    setState(initialState)
    setOpen(true)
  }

  async function handleSubmit(formData: FormData) {
    const nextState = await createProject(initialState, formData)

    setState(nextState)

    if (nextState.success) {
      formRef.current?.reset()
      setOpen(false)
    }
  }

  return (
    <>
      {trigger === "sidebar-group-action" ? (
        <SidebarGroupAction
          type="button"
          onClick={openDialog}
          aria-label="Create private project"
          title="Create private project"
        >
          <PlusIcon aria-hidden="true" />
        </SidebarGroupAction>
      ) : (
        <Button type="button" onClick={openDialog}>
          <PlusIcon aria-hidden="true" />
          New project
        </Button>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[calc(100dvh-2rem)] overflow-y-auto sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl">New Project</DialogTitle>
            <DialogDescription>
              Create a workspace for your notes, diagrams, and research.
            </DialogDescription>
          </DialogHeader>
          <form ref={formRef} action={handleSubmit} className="grid gap-4">
            <div className="grid gap-1.5">
              <label htmlFor={`${id}-name`} className="text-sm font-medium">
                Name
              </label>
              <Input
                id={`${id}-name`}
                name="name"
                maxLength={120}
                placeholder="Project name"
                autoFocus
                required
                aria-invalid={Boolean(state.errors?.name)}
                aria-describedby={
                  state.errors?.name ? `${id}-name-error` : undefined
                }
              />
              {state.errors?.name && (
                <p id={`${id}-name-error`} className="text-xs text-destructive">
                  {state.errors.name}
                </p>
              )}
            </div>
            <div className="grid gap-1.5">
              <div className="flex items-center justify-between gap-2">
                <label
                  htmlFor={`${id}-description`}
                  className="text-sm font-medium"
                >
                  Description
                </label>
                <span className="text-xs text-muted-foreground">Optional</span>
              </div>
              <Textarea
                id={`${id}-description`}
                name="description"
                maxLength={500}
                className="field-sizing-fixed h-24 max-h-24 resize-none overflow-y-auto"
                placeholder="What is this project about?"
                aria-invalid={Boolean(state.errors?.description)}
                aria-describedby={
                  state.errors?.description
                    ? `${id}-description-error`
                    : undefined
                }
              />
              {state.errors?.description && (
                <p
                  id={`${id}-description-error`}
                  className="text-xs text-destructive"
                >
                  {state.errors.description}
                </p>
              )}
            </div>
            {state.message && (
              <p className="text-sm text-destructive" aria-live="polite">
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
