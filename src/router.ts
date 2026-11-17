import { createBrowserRouter } from "react-router"
import { AppLayout } from "@/components/app-layout"
import { HomePage } from "@/pages/home-page"
import { NotFoundPage } from "@/pages/not-found-page"
import { ProjectsPage } from "@/pages/projects-page"
import { SettingsPage } from "@/pages/settings-page"
import { VideoGenerationPage } from "@/pages/video-generation-page"

export const router = createBrowserRouter([
  {
    path: "/",
    Component: AppLayout,
    children: [
      { index: true, Component: HomePage },
      { path: "projects", Component: ProjectsPage },
      { path: "video-generation", Component: VideoGenerationPage },
      { path: "settings", Component: SettingsPage },
      { path: "*", Component: NotFoundPage },
    ],
  },
])
