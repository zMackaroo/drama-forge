import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { RouterProvider } from "react-router/dom"
import { router } from "@/router"
import { applyAppearance, useThemeStore } from "@/stores/theme-store"
import "./index.css"

applyAppearance(useThemeStore.getState())

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
