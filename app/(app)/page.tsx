import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"

export default function Home() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Home</PageTitle>
        <PageDescription>
          View and manage your projects and recent activity.
        </PageDescription>
      </div>
    </div>
  )
}
