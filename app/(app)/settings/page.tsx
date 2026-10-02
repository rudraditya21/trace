import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"

export default function SettingsPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Settings</PageTitle>
        <PageDescription>
          Manage your workspace and application preferences.
        </PageDescription>
      </div>
    </div>
  )
}
