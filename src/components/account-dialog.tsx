import { useState } from "react"
import { CircleUser } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  accentOptions,
  cornerOptions,
  useThemeStore,
} from "@/stores/theme-store"

const tabs = [
  { id: "profile", label: "Profile" },
  { id: "accounts", label: "Accounts" },
  { id: "api-keys", label: "API Keys" },
  { id: "appearance", label: "Appearance" },
] as const

const themes = ["light", "dark"] as const

function AppearancePanel() {
  const theme = useThemeStore((state) => state.theme)
  const accent = useThemeStore((state) => state.accent)
  const corner = useThemeStore((state) => state.corner)
  const setTheme = useThemeStore((state) => state.setTheme)
  const setAccent = useThemeStore((state) => state.setAccent)
  const setCorner = useThemeStore((state) => state.setCorner)

  return (
    <div
      role="tabpanel"
      id="account-panel-appearance"
      aria-labelledby="account-tab-appearance"
      className="flex flex-col gap-5"
    >
      <p className="text-sm text-muted-foreground">
        Choose how Drama Forge looks on this device.
      </p>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium" id="appearance-theme">
          Theme
        </span>
        <div
          className="inline-flex w-fit rounded-lg bg-muted p-1"
          role="group"
          aria-labelledby="appearance-theme"
        >
          {themes.map((value) => (
            <button
              key={value}
              type="button"
              aria-pressed={theme === value}
              onClick={() => setTheme(value)}
              className={cn(
                "rounded-md px-3 py-1 text-sm capitalize outline-none focus-visible:ring-2 focus-visible:ring-ring",
                theme === value
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              {value}
            </button>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium" id="appearance-accent">
          Accent
        </span>
        <div
          className="flex flex-wrap gap-2"
          role="group"
          aria-labelledby="appearance-accent"
        >
          {accentOptions.map((option) => {
            const selected = accent === option.id
            return (
              <button
                key={option.id}
                type="button"
                aria-pressed={selected}
                onClick={() => setAccent(option.id)}
                className={cn(
                  "flex items-center gap-2 rounded-lg border px-2 py-1.5 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  selected
                    ? "border-foreground bg-background"
                    : "border-border text-muted-foreground",
                )}
              >
                <span
                  className="size-4 shrink-0 rounded-full"
                  style={{ backgroundColor: option.swatch }}
                  aria-hidden="true"
                />
                {option.label}
              </button>
            )
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-sm font-medium" id="appearance-corners">
          Corners
        </span>
        <div
          className="inline-flex w-fit max-w-full flex-wrap rounded-lg bg-muted p-1"
          role="group"
          aria-labelledby="appearance-corners"
        >
          {cornerOptions.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={corner === option.id}
              onClick={() => setCorner(option.id)}
              className={cn(
                "rounded-md px-3 py-1 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring",
                corner === option.id
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground",
              )}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

const socialAccounts = [
  { id: "facebook", name: "Facebook", icon: FacebookIcon },
  { id: "youtube", name: "YouTube", icon: YouTubeIcon },
  { id: "x", name: "X", icon: XIcon },
  { id: "instagram", name: "Instagram", icon: InstagramIcon },
] as const

type AccountTab = (typeof tabs)[number]["id"]

function AccountsPanel() {
  const [connected, setConnected] = useState<Record<string, boolean>>({})

  return (
    <div
      role="tabpanel"
      id="account-panel-accounts"
      aria-labelledby="account-tab-accounts"
    >
      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {socialAccounts.map((account) => {
          const isConnected = connected[account.id] === true
          const Icon = account.icon
          return (
            <li
              key={account.id}
              className="flex min-w-0 items-center gap-2 rounded-lg border px-2.5 py-2"
            >
              <Icon />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {account.name}
              </span>
              <Button
                type="button"
                size="xs"
                variant={isConnected ? "secondary" : "outline"}
                aria-label={
                  isConnected
                    ? `${account.name} connected`
                    : `Connect ${account.name}`
                }
                disabled={isConnected}
                onClick={() =>
                  setConnected((current) => ({
                    ...current,
                    [account.id]: true,
                  }))
                }
              >
                {isConnected ? "Connected" : "Connect"}
              </Button>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        fill="#1877F2"
        d="M14.5 8.5V6.4c0-.7.5-1 1.2-1H17V3h-2.1C12.4 3 11 4.4 11 6.7v1.8H9v2.4h2V21h2.6v-10.1h2.1l.3-2.4h-2.5z"
      />
    </svg>
  )
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        fill="#FF0000"
        d="M22.5 7.2a2.8 2.8 0 0 0-2-2C18.8 4.8 12 4.8 12 4.8s-6.8 0-8.5.4a2.8 2.8 0 0 0-2 2A29 29 0 0 0 1 12a29 29 0 0 0 .5 4.8 2.8 2.8 0 0 0 2 2c1.7.4 8.5.4 8.5.4s6.8 0 8.5-.4a2.8 2.8 0 0 0 2-2A29 29 0 0 0 23 12a29 29 0 0 0-.5-4.8z"
      />
      <path fill="#fff" d="M9.8 15.5v-7l6.2 3.5-6.2 3.5z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <path
        className="fill-neutral-950 dark:fill-white"
        d="M17.6 3h2.8l-6.1 7 7.2 9.5h-5.6l-4.4-5.7L6.4 19.5H3.6l6.5-7.5L3.2 3h5.7l4 5.2L17.6 3zm-1 14.8h1.5L7.5 4.1H5.9l10.7 13.7z"
      />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-4 shrink-0" aria-hidden="true">
      <defs>
        <linearGradient id="instagram-brand" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0%" stopColor="#f9ce34" />
          <stop offset="45%" stopColor="#ee2a7b" />
          <stop offset="100%" stopColor="#6228d7" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagram-brand)"
        d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5zm8 2H8a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V8a3 3 0 0 0-3-3zm-4 3.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2zm0 2A1.8 1.8 0 1 0 13.8 12 1.8 1.8 0 0 0 12 10.2zM17.4 6.6a1.1 1.1 0 1 1-1.1 1.1 1.1 1.1 0 0 1 1.1-1.1z"
      />
    </svg>
  )
}

export function AccountDialog() {
  const [open, setOpen] = useState(false)
  const [selected, setSelected] = useState<AccountTab>("profile")

  function selectTab(id: AccountTab) {
    setSelected(id)
    document.getElementById(`account-tab-${id}`)?.focus()
  }

  function onTabKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    const current = tabs.findIndex((tab) => tab.id === selected)
    const next =
      event.key === "ArrowDown" || event.key === "ArrowRight"
        ? (current + 1) % tabs.length
        : event.key === "ArrowUp" || event.key === "ArrowLeft"
          ? (current - 1 + tabs.length) % tabs.length
          : event.key === "Home"
            ? 0
            : event.key === "End"
              ? tabs.length - 1
              : null

    if (current < 0 || next === null) return

    event.preventDefault()
    selectTab(tabs[next].id)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next)
        if (!next) setSelected("profile")
      }}
    >
      <DialogTrigger
        render={
          <Button
            variant="outline"
            size="icon"
            className="rounded-full"
            aria-label="Account"
          />
        }
      >
        <CircleUser aria-hidden="true" />
      </DialogTrigger>
      <DialogContent className="gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="gap-1 border-b px-4 py-4 pr-12">
          <DialogTitle>Account</DialogTitle>
          <DialogDescription>Signed in on this browser.</DialogDescription>
        </DialogHeader>

        <div className="grid max-h-[calc(100svh-8rem)] min-h-72 grid-cols-[8.5rem_minmax(0,1fr)] overflow-y-auto sm:grid-cols-[11rem_minmax(0,1fr)]">
          <div className="flex h-full flex-col border-r">
            <div
              role="tablist"
              aria-orientation="vertical"
              aria-label="Account"
              className="flex flex-col gap-1 p-2"
              onKeyDown={onTabKeyDown}
            >
              {tabs.map((tab) => {
                const isSelected = selected === tab.id
                return (
                  <Button
                    key={tab.id}
                    id={`account-tab-${tab.id}`}
                    type="button"
                    role="tab"
                    variant="ghost"
                    size="sm"
                    aria-selected={isSelected}
                    aria-controls={`account-panel-${tab.id}`}
                    tabIndex={isSelected ? 0 : -1}
                    className={cn(
                      "w-full justify-start",
                      isSelected && "bg-muted font-medium text-foreground",
                    )}
                    onClick={() => setSelected(tab.id)}
                  >
                    {tab.label}
                  </Button>
                )
              })}
            </div>
            <div className="mt-auto p-2">
              <Button
                type="button"
                variant="destructive"
                size="sm"
                className="w-full"
                onClick={() => setOpen(false)}
              >
                Log out
              </Button>
            </div>
          </div>

          <div className="min-w-0 p-4">
            {selected === "profile" ? (
              <div
                role="tabpanel"
                id="account-panel-profile"
                aria-labelledby="account-tab-profile"
                className="flex items-center gap-3"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-full border bg-background">
                  <CircleUser className="size-5" aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <div className="truncate font-medium">Local account</div>
                  <div className="text-xs text-muted-foreground">
                    No profile is stored yet
                  </div>
                </div>
              </div>
            ) : null}

            {selected === "accounts" ? (
              <AccountsPanel />
            ) : null}

            {selected === "api-keys" ? (
              <div
                role="tabpanel"
                id="account-panel-api-keys"
                aria-labelledby="account-tab-api-keys"
              >
                <p className="text-sm text-muted-foreground">
                  No API keys yet.
                </p>
              </div>
            ) : null}

            {selected === "appearance" ? <AppearancePanel /> : null}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
