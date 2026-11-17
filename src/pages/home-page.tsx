import { Link } from "react-router"
import { PageHeader } from "@/components/page-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { projects } from "@/data/projects"

export function HomePage() {
  const sceneCount = projects.reduce((total, project) => total + project.scenes, 0)
  const inRevision = projects.filter((project) => project.status === "Revision")
    .length
  const current = projects[0]

  return (
    <section className="flex flex-1 flex-col gap-6 p-6 md:p-8">
      <PageHeader
        title="Home"
        description="What's on the desk, and where to pick the work back up."
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <Card size="sm">
          <CardHeader>
            <CardDescription>Projects</CardDescription>
            <CardTitle className="text-2xl tabular-nums">
              {projects.length}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">On the desk</CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardDescription>Scenes</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{sceneCount}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Written across every project
          </CardContent>
        </Card>
        <Card size="sm">
          <CardHeader>
            <CardDescription>Revision</CardDescription>
            <CardTitle className="text-2xl tabular-nums">{inRevision}</CardTitle>
          </CardHeader>
          <CardContent className="text-muted-foreground">
            Waiting on another pass
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader>
            <CardTitle>Recent projects</CardTitle>
            <CardDescription>Latest work in the workspace.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col">
            {projects.map((project) => (
              <Link
                key={project.title}
                to="/projects"
                className="flex items-start justify-between gap-4 rounded-lg px-2 py-3 hover:bg-muted"
              >
                <div className="min-w-0">
                  <div className="truncate font-medium">{project.title}</div>
                  <div className="truncate text-xs text-muted-foreground">
                    {project.note}
                  </div>
                </div>
                <div className="shrink-0 text-right">
                  <div className="text-xs font-medium">{project.status}</div>
                  <div className="text-xs text-muted-foreground">
                    {project.updated}
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        {current ? (
          <Card>
            <CardHeader>
              <CardDescription>Continue</CardDescription>
              <CardTitle>{current.title}</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {current.note}
            </CardContent>
            <CardFooter>
              <Button
                nativeButton={false}
                render={<Link to="/projects" />}
                className="w-full"
              >
                Open projects
              </Button>
            </CardFooter>
          </Card>
        ) : null}
      </div>
    </section>
  )
}
