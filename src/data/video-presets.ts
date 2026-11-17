export type VideoAgent = {
  name: string
  role: string
}

export type VideoPhase = {
  title: string
  agents: VideoAgent[]
}

export type VideoPreset = {
  id: "ai-drama" | "explainer"
  name: string
  summary: string
  phases: VideoPhase[]
}

export const videoPresets: VideoPreset[] = [
  {
    id: "ai-drama",
    name: "AI Drama",
    summary: "A full crew for a scripted episode, from the concept to the finished cut.",
    phases: [
      {
        title: "Phase 1 · Story creation",
        agents: [
          {
            name: "Creative Director Agent",
            role: "Defines the drama's genre, tone, target audience, emotional direction, and overall concept.",
          },
          {
            name: "Story Architect Agent",
            role: "Develops the plot, major twists, conflicts, climax, and ending.",
          },
          {
            name: "Scriptwriter Agent",
            role: "Converts the storyline into a complete screenplay with dialogue, narration, and scene descriptions.",
          },
          {
            name: "Character Development Agent",
            role: "Creates character profiles, personalities, relationships, clothing, facial features, and visual references.",
          },
        ],
      },
      {
        title: "Phase 2 · Production planning",
        agents: [
          {
            name: "Scene Director Agent",
            role: "Breaks the screenplay into individual shots, camera angles, movements, and visual compositions.",
          },
          {
            name: "Visual Prompt Engineer Agent",
            role: "Converts each shot into optimized prompts for Seedance, Kling, or Veo.",
          },
        ],
      },
      {
        title: "Phase 3 · Production",
        agents: [
          {
            name: "Video Generation Agent",
            role: "Sends prompts and character references to the selected video-generation API and manages generated clips.",
          },
          {
            name: "Voice & Audio Director Agent",
            role: "Assigns voices to characters, generates dialogue, narration, sound effects, and background music.",
          },
        ],
      },
      {
        title: "Phase 4 · Quality control",
        agents: [
          {
            name: "Continuity Supervisor Agent",
            role: "Checks whether characters, clothing, locations, dialogue, and story events remain consistent between scenes.",
          },
          {
            name: "Quality Assurance Agent",
            role: "Evaluates the final episode for visual quality, audio synchronization, pacing, storytelling, and technical errors.",
          },
        ],
      },
    ],
  },
  {
    id: "explainer",
    name: "Explainer Video",
    summary: "A smaller crew for a narrated lesson. No cast and no plotted twists.",
    phases: [
      {
        title: "Phase 1 · Brief",
        agents: [
          {
            name: "Creative Director Agent",
            role: "Sets the audience, learning goal, tone, and how long the video should run.",
          },
          {
            name: "Scriptwriter Agent",
            role: "Writes the narration, the on-screen points, and the examples that carry the idea.",
          },
        ],
      },
      {
        title: "Phase 2 · Planning",
        agents: [
          {
            name: "Scene Director Agent",
            role: "Breaks the script into sections, the visuals for each one, and the pace between them.",
          },
          {
            name: "Visual Prompt Engineer Agent",
            role: "Turns each section into prompts for Seedance, Kling, or Veo.",
          },
        ],
      },
      {
        title: "Phase 3 · Production",
        agents: [
          {
            name: "Video Generation Agent",
            role: "Sends those prompts to the selected video API and keeps the finished clips.",
          },
          {
            name: "Voice & Audio Director Agent",
            role: "Records the narration and adds music and emphasis.",
          },
        ],
      },
      {
        title: "Phase 4 · Review",
        agents: [
          {
            name: "Quality Assurance Agent",
            role: "Checks clarity, sync, pacing, and whether the explanation is accurate.",
          },
        ],
      },
    ],
  },
]

export function agentCount(preset: VideoPreset) {
  return preset.phases.reduce((total, phase) => total + phase.agents.length, 0)
}
