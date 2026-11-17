import { CircleUser } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/lib/utils"
import { useThemeStore } from "@/stores/theme-store"

const themes = ["light", "dark"] as const

export function SettingsPage() {
  const theme = useThemeStore((state) => state.theme)
  const setTheme = useThemeStore((state) => state.setTheme)

  return (
    <section className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <PageHeader
        title="Settings"
        description="Appearance and the account shown in the top bar."
      />
      <div className="grid max-w-2xl gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Appearance</CardTitle>
            <CardDescription>
              Choose how Drama Forge looks on this device.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="inline-flex rounded-lg bg-muted p-1">
              {themes.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  className={cn(
                    "rounded-md px-3 py-1 text-sm capitalize",
                    theme === value
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground",
                  )}
                >
                  {value}
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account</CardTitle>
            <CardDescription>The icon in the top bar.</CardDescription>
          </CardHeader>
          <CardContent className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-full border bg-background">
              <CircleUser className="size-5" />
            </div>
            <div>
              <div className="font-medium">Local account</div>
              <div className="text-xs text-muted-foreground">
                Signed in on this browser
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
