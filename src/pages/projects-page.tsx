import { PageHeader } from "@/components/page-header"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { projects } from "@/data/projects"

export function ProjectsPage() {
  return (
    <section className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <PageHeader
        title="Projects"
        description="Dramas in progress, from first outline to the next revision."
      />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardDescription>{project.status}</CardDescription>
              <CardTitle>{project.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col gap-3 text-muted-foreground">
              <p>{project.note}</p>
              <p className="text-xs">
                {project.scenes} scenes · Updated {project.updated}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
