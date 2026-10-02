import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"

export default function InboxPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Inbox</PageTitle>
        <PageDescription>
          Review updates and activity from your projects.
        </PageDescription>
      </div>
    </div>
  )
}
