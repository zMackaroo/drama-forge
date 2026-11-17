export type Project = {
  title: string
  status: "Drafting" | "Outline" | "Revision"
  updated: string
  scenes: number
  note: string
}

export const projects: Project[] = [
  {
    title: "The Last Rehearsal",
    status: "Drafting",
    updated: "Today",
    scenes: 12,
    note: "Act two still needs the confrontation in the wings.",
  },
  {
    title: "Northbound",
    status: "Outline",
    updated: "Yesterday",
    scenes: 4,
    note: "Four scenes blocked. The train sequence is next.",
  },
  {
    title: "Glass Season",
    status: "Revision",
    updated: "3 days ago",
    scenes: 18,
    note: "Another pass on the greenhouse dialogue.",
  },
]
