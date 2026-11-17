import { create } from "zustand"

export type Theme = "light" | "dark"
export type Accent = "ink" | "red" | "blue" | "amber"
export type Corner = "sharp" | "soft" | "round"

type Palette = {
  primary: string
  foreground: string
  ring: string
}

const STORAGE_KEY = "drama-forge-appearance"
const LEGACY_THEME_KEY = "drama-forge-theme"

export const accentOptions = [
  { id: "ink", label: "Ink", swatch: "oklch(0.25 0 0)" },
  { id: "red", label: "Red", swatch: "oklch(0.55 0.19 25)" },
  { id: "blue", label: "Blue", swatch: "oklch(0.52 0.16 255)" },
  { id: "amber", label: "Amber", swatch: "oklch(0.72 0.14 80)" },
] as const satisfies ReadonlyArray<{
  id: Accent
  label: string
  swatch: string
}>

export const cornerOptions = [
  { id: "sharp", label: "Sharp" },
  { id: "soft", label: "Soft" },
  { id: "round", label: "Round" },
] as const satisfies ReadonlyArray<{ id: Corner; label: string }>

const accentTokens: Record<Accent, { light: Palette; dark: Palette }> = {
  ink: {
    light: {
      primary: "oklch(0.205 0 0)",
      foreground: "oklch(0.985 0 0)",
      ring: "oklch(0.708 0 0)",
    },
    dark: {
      primary: "oklch(0.922 0 0)",
      foreground: "oklch(0.205 0 0)",
      ring: "oklch(0.556 0 0)",
    },
  },
  red: {
    light: {
      primary: "oklch(0.5 0.18 25)",
      foreground: "oklch(0.985 0 0)",
      ring: "oklch(0.6 0.16 25)",
    },
    dark: {
      primary: "oklch(0.72 0.16 25)",
      foreground: "oklch(0.22 0.04 25)",
      ring: "oklch(0.72 0.16 25)",
    },
  },
  blue: {
    light: {
      primary: "oklch(0.48 0.16 255)",
      foreground: "oklch(0.985 0 0)",
      ring: "oklch(0.6 0.14 255)",
    },
    dark: {
      primary: "oklch(0.74 0.12 255)",
      foreground: "oklch(0.2 0.04 255)",
      ring: "oklch(0.74 0.12 255)",
    },
  },
  amber: {
    light: {
      primary: "oklch(0.62 0.14 75)",
      foreground: "oklch(0.22 0.04 75)",
      ring: "oklch(0.7 0.12 75)",
    },
    dark: {
      primary: "oklch(0.8 0.13 85)",
      foreground: "oklch(0.24 0.04 75)",
      ring: "oklch(0.8 0.13 85)",
    },
  },
}

const cornerTokens: Record<Corner, string> = {
  sharp: "0.3rem",
  soft: "0.625rem",
  round: "1rem",
}

type Appearance = {
  theme: Theme
  accent: Accent
  corner: Corner
}

function isTheme(value: unknown): value is Theme {
  return value === "light" || value === "dark"
}

function isAccent(value: unknown): value is Accent {
  return value === "ink" || value === "red" || value === "blue" || value === "amber"
}

function isCorner(value: unknown): value is Corner {
  return value === "sharp" || value === "soft" || value === "round"
}

function defaultTheme(): Theme {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light"
}

function readAppearance(): Appearance {
  const fallback: Appearance = {
    theme: defaultTheme(),
    accent: "ink",
    corner: "soft",
  }

  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed: unknown = JSON.parse(raw)
      if (parsed && typeof parsed === "object") {
        const stored = parsed as Partial<Appearance>
        return {
          theme: isTheme(stored.theme) ? stored.theme : fallback.theme,
          accent: isAccent(stored.accent) ? stored.accent : fallback.accent,
          corner: isCorner(stored.corner) ? stored.corner : fallback.corner,
        }
      }
    }
  } catch {
    // Ignore a broken saved value and fall back to the legacy theme key.
  }

  const legacy = localStorage.getItem(LEGACY_THEME_KEY)
  if (isTheme(legacy)) fallback.theme = legacy
  return fallback
}

export function applyAppearance(appearance: Appearance) {
  const root = document.documentElement
  const palette = accentTokens[appearance.accent][appearance.theme]

  root.classList.toggle("dark", appearance.theme === "dark")
  root.style.setProperty("--primary", palette.primary)
  root.style.setProperty("--primary-foreground", palette.foreground)
  root.style.setProperty("--sidebar-primary", palette.primary)
  root.style.setProperty("--sidebar-primary-foreground", palette.foreground)
  root.style.setProperty("--ring", palette.ring)
  root.style.setProperty("--sidebar-ring", palette.ring)
  root.style.setProperty("--radius", cornerTokens[appearance.corner])
  localStorage.setItem(STORAGE_KEY, JSON.stringify(appearance))
}

type ThemeState = Appearance & {
  setTheme: (theme: Theme) => void
  setAccent: (accent: Accent) => void
  setCorner: (corner: Corner) => void
  toggleTheme: () => void
}

const initial = readAppearance()

export const useThemeStore = create<ThemeState>((set, get) => ({
  ...initial,
  setTheme: (theme) => {
    const next = { ...pick(get()), theme }
    applyAppearance(next)
    set({ theme })
  },
  setAccent: (accent) => {
    const next = { ...pick(get()), accent }
    applyAppearance(next)
    set({ accent })
  },
  setCorner: (corner) => {
    const next = { ...pick(get()), corner }
    applyAppearance(next)
    set({ corner })
  },
  toggleTheme: () => {
    const theme: Theme = get().theme === "dark" ? "light" : "dark"
    const next = { ...pick(get()), theme }
    applyAppearance(next)
    set({ theme })
  },
}))

function pick(state: Appearance): Appearance {
  return { theme: state.theme, accent: state.accent, corner: state.corner }
}

applyAppearance(initial)
