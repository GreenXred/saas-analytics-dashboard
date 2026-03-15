import { create } from 'zustand'

export type Theme = 'light' | 'dark'

interface ThemeState {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

function getInitialTheme(): Theme {
    if (typeof window === 'undefined') {
        return 'light'
    }

    const savedTheme = window.localStorage.getItem('app-theme')

    if (savedTheme === 'light' || savedTheme === 'dark') {
        return savedTheme
    }

    return 'light'
}

export const useThemeStore = create<ThemeState>((set, get) => ({
    theme: getInitialTheme(),

    setTheme: (theme) => {
        window.localStorage.setItem('app-theme', theme)
        set({ theme })
    },

    toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light'
        window.localStorage.setItem('app-theme', nextTheme)
        set({ theme: nextTheme })
    },
}))