import { Moon, Sun } from 'lucide-react'
import { useThemeStore } from '../model/store'

type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => {
    ready: Promise<void>
    finished: Promise<void>
    updateCallbackDone: Promise<void>
  }
}

export function ThemeToggle() {
  const theme = useThemeStore((state) => state.theme)
  const toggleTheme = useThemeStore((state) => state.toggleTheme)

  const isDark = theme === 'dark'

  function handleToggleTheme() {
    const doc = document as ViewTransitionDocument

    if (!doc.startViewTransition) {
      toggleTheme()
      return
    }

    doc.startViewTransition(() => {
      toggleTheme()
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
      aria-label="Toggle theme"
      title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
    >
      {isDark ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  )
}