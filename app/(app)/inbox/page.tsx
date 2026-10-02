import { respondToProjectInvitation } from "@/app/(app)/actions/project-sharing"
import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"
import { Button } from "@/components/ui/button"
import { prisma } from "@/lib/prisma"
import { requireSession } from "@/lib/session"
import { connection } from "next/server"

export default async function InboxPage() {
  await connection()
  const session = await requireSession()

  const invitations = await prisma.projectInvitation.findMany({
    where: {
      inviteeId: session.user.id,
      status: "PENDING",
    },
    include: {
      project: {
        select: {
          name: true,
        },
      },
      inviter: {
        select: {
          name: true,
          email: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  })

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Inbox</PageTitle>
        <PageDescription>
          Review updates and activity from your projects.
        </PageDescription>
      </div>
      {invitations.length === 0 ? (
        <div className="flex min-h-48 items-center justify-center px-6 text-center text-sm text-muted-foreground">
          You&apos;re all caught up.
        </div>
      ) : (
        <section className="grid">
          {invitations.map((invitation) => (
            <article
              key={invitation.id}
              className="flex flex-col justify-between gap-4 border-b py-4 first:pt-0 sm:flex-row sm:items-center"
            >
              <div className="min-w-0">
                <p className="text-sm font-medium">
                  Invitation to {invitation.project.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {invitation.inviter.name} ({invitation.inviter.email}) invited
                  you as {invitation.role === "EDITOR" ? "an editor" : "a viewer"}.
                </p>
              </div>
              <form
                action={respondToProjectInvitation}
                className="flex shrink-0 gap-2"
              >
                <input
                  type="hidden"
                  name="invitationId"
                  value={invitation.id}
                />
                <Button
                  type="submit"
                  name="decision"
                  value="decline"
                  variant="outline"
                  size="sm"
                >
                  Decline
                </Button>
                <Button
                  type="submit"
                  name="decision"
                  value="accept"
                  size="sm"
                >
                  Accept
                </Button>
              </form>
            </article>
          ))}
        </section>
      )}
    </div>
  )
}
