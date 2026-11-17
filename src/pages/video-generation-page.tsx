import { useId, useState, type FormEvent } from "react"
import { Plus } from "lucide-react"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  agentCount,
  videoPresets,
  type VideoPreset,
} from "@/data/video-presets"

type Space = {
  id: string
  name: string
  presetId: VideoPreset["id"]
}

export function VideoGenerationPage() {
  const nameId = useId()
  const errorId = useId()
  const [open, setOpen] = useState(false)
  const [name, setName] = useState("")
  const [presetId, setPresetId] = useState<VideoPreset["id"] | null>(null)
  const [error, setError] = useState("")
  const [spaces, setSpaces] = useState<Space[]>([])
  const [notice, setNotice] = useState("")
  const preset = videoPresets.find((item) => item.id === presetId) ?? null

  function closeDialog(next: boolean) {
    setOpen(next)
    if (!next) {
      setName("")
      setPresetId(null)
      setError("")
    }
  }

  function createSpace(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const trimmed = name.trim()
    if (!trimmed) {
      setError("Name the space before creating it.")
      setNotice("")
      return
    }
    if (!preset) {
      setError("Choose a preset so the space has a crew.")
      setNotice("")
      return
    }

    setSpaces((current) => [
      { id: crypto.randomUUID(), name: trimmed, presetId: preset.id },
      ...current,
    ])
    setNotice(`Created ${trimmed}.`)
    closeDialog(false)
  }

  return (
    <section className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <PageHeader
        title="Video Generation"
        description="Open a space, pick a preset, and see the agents that come with it."
      />

      <p role="status" aria-live="polite" className="sr-only">
        {notice}
      </p>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {spaces.map((space) => {
          const chosen = videoPresets.find((item) => item.id === space.presetId)
          return (
            <Card key={space.id} className="min-w-0">
              <CardHeader>
                <CardDescription>{chosen?.name}</CardDescription>
                <CardTitle className="truncate" title={space.name}>
                  {space.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                {chosen ? `${agentCount(chosen)} agents` : "No preset"}
              </CardContent>
            </Card>
          )
        })}

        <Dialog open={open} onOpenChange={closeDialog}>
          <DialogTrigger
            render={
              <Button
                variant="outline"
                className={cn(
                  "h-auto min-h-44 flex-col gap-3 border-dashed py-8",
                  spaces.length === 0
                    ? "w-full max-w-xs justify-self-start"
                    : "w-full",
                )}
              />
            }
          >
            <span className="flex size-10 items-center justify-center rounded-full border bg-background">
              <Plus aria-hidden="true" />
            </span>
            New space
          </DialogTrigger>
          <DialogContent className="flex max-h-[min(42rem,calc(100svh-2rem))] flex-col gap-0 overflow-hidden p-0 sm:max-w-3xl">
            <DialogHeader className="gap-1 border-b px-4 py-4 pr-12">
              <DialogTitle>New space</DialogTitle>
              <DialogDescription>
                Name it and choose the crew that will make it.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={createSpace} className="flex min-h-0 flex-1 flex-col">
              <div className="grid min-h-0 flex-1 items-start gap-6 overflow-y-auto p-4 sm:grid-cols-[minmax(0,16rem)_minmax(0,1fr)]">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-2">
                    <label htmlFor={nameId} className="text-sm font-medium">
                      Space name
                    </label>
                    <Input
                      id={nameId}
                      name="space-name"
                      value={name}
                      autoComplete="off"
                      aria-invalid={error.includes("Name") || undefined}
                      aria-describedby={error ? errorId : undefined}
                      placeholder="The greenhouse episode"
                      onChange={(event) => {
                        setName(event.target.value)
                        if (error) setError("")
                      }}
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm font-medium" id="video-preset-label">
                      Preset
                    </span>
                    <div
                      role="radiogroup"
                      aria-labelledby="video-preset-label"
                      className="grid gap-2"
                    >
                      {videoPresets.map((item) => {
                        const selected = item.id === presetId
                        return (
                          <label
                            key={item.id}
                            className={cn(
                              "cursor-pointer rounded-lg border px-3 py-3 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring",
                              selected
                                ? "border-foreground bg-background"
                                : "border-border hover:bg-muted",
                            )}
                          >
                            <input
                              type="radio"
                              name="preset"
                              value={item.id}
                              checked={selected}
                              className="sr-only"
                              onChange={() => {
                                setPresetId(item.id)
                                if (error.includes("preset")) setError("")
                              }}
                            />
                            <span className="block text-sm font-medium">
                              {item.name}
                            </span>
                            <span className="mt-1 block text-sm text-muted-foreground">
                              {item.summary}
                            </span>
                            <span className="mt-2 block text-xs text-muted-foreground">
                              {agentCount(item)} agents
                            </span>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
                <div className="min-w-0">
                  {preset ? (
                    <Crew preset={preset} />
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      Select a preset to see the agents in that crew.
                    </p>
                  )}
                </div>
              </div>
              <div className="flex flex-col gap-2 border-t px-4 py-3 sm:flex-row sm:items-center sm:justify-end">
                {error ? (
                  <p id={errorId} role="alert" className="text-sm text-destructive sm:mr-auto">
                    {error}
                  </p>
                ) : null}
                <Button type="submit" className="w-full sm:w-fit">
                  Create space
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  )
}

function Crew({ preset }: { preset: VideoPreset }) {
  const phases = preset.phases.map((phase, phaseIndex) => {
    const start = preset.phases
      .slice(0, phaseIndex)
      .reduce((total, item) => total + item.agents.length, 0)
    return {
      title: phase.title,
      agents: phase.agents.map((agent, index) => ({
        ...agent,
        number: start + index + 1,
      })),
    }
  })

  return (
    <div className="flex flex-col gap-5">
      <h2 className="text-sm font-medium">{preset.name} crew</h2>
      {phases.map((phase) => (
        <section key={phase.title} className="flex flex-col gap-3">
          <h3 className="text-sm text-muted-foreground">{phase.title}</h3>
          <ol className="flex flex-col gap-3">
            {phase.agents.map((agent) => (
              <li
                key={agent.name}
                className="grid grid-cols-[1.5rem_minmax(0,1fr)] gap-2"
              >
                <span className="pt-0.5 text-xs text-muted-foreground tabular-nums">
                  {agent.number}
                </span>
                <div className="min-w-0">
                  <div className="text-sm font-medium">{agent.name}</div>
                  <p className="text-sm text-muted-foreground">{agent.role}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  )
}
