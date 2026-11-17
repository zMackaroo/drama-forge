import { Moon, Sun } from "lucide-react"
import { Outlet } from "react-router"
import { AccountDialog } from "@/components/account-dialog"
import { AppSidebar } from "@/components/app-sidebar"
import { Button } from "@/components/ui/button"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { TooltipProvider } from "@/components/ui/tooltip"
import { useThemeStore } from "@/stores/theme-store"

export function AppLayout() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-2 border-b bg-background/90 px-3 backdrop-blur-md md:px-4">
            <SidebarTrigger />
            <div className="ml-auto flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon"
                aria-label={
                  theme === "dark" ? "Switch to light" : "Switch to dark"
                }
                onClick={toggleTheme}
              >
                {theme === "dark" ? <Sun /> : <Moon />}
              </Button>
              <span className="mx-1 h-4 w-px bg-border" />
              <AccountDialog />
            </div>
          </header>
          <div className="flex flex-1 flex-col bg-background">
            <Outlet />
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  )
}
