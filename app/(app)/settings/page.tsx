import { PageDescription } from "@/components/page/description"
import { PageTitle } from "@/components/page/title"
import { AccountSettings } from "@/components/settings/account-settings"
import { AppearanceSettings } from "@/components/settings/appearance-settings"
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { prisma } from "@/lib/prisma"
import { requireSession } from "@/lib/session"
import packageJson from "@/package.json"
import { connection } from "next/server"

export default async function SettingsPage() {
  await connection()
  const session = await requireSession()

  let databaseConnected = false

  try {
    await prisma.$queryRaw`SELECT 1`
    databaseConnected = true
  } catch (error) {
    console.error("PostgreSQL connection check failed", error)
  }

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      <div>
        <PageTitle>Settings</PageTitle>
        <PageDescription>
          Manage your workspace and application preferences.
        </PageDescription>
      </div>
      <Tabs defaultValue="account" className="w-full gap-6">
        <TabsList variant="line">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
        </TabsList>
        <TabsContent value="account">
          <AccountSettings user={session.user} />
        </TabsContent>
        <TabsContent value="appearance">
          <AppearanceSettings />
        </TabsContent>
        <TabsContent value="about">
          <section className="grid gap-3">
            <div>
              <h2 className="font-heading text-lg font-medium">About</h2>
              <p className="text-sm text-muted-foreground">
                Application and service information.
              </p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center justify-between gap-4">
                <span className="text-sm font-medium">App version</span>
                <span className="text-sm text-muted-foreground">
                  v{packageJson.version}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t pt-4">
                <span className="text-sm font-medium">PostgreSQL</span>
                <span className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span
                    className={`size-2 rounded-full ${
                      databaseConnected ? "bg-emerald-500" : "bg-destructive"
                    }`}
                    aria-hidden="true"
                  />
                  {databaseConnected ? "Connected" : "Unavailable"}
                </span>
              </div>
            </div>
          </section>
        </TabsContent>
      </Tabs>
    </div>
  )
}
