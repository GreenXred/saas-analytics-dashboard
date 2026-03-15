import { useEffect, type PropsWithChildren } from 'react'
import { useThemeStore } from '../../../features/toggle-theme/model/store'

export function ThemeProvider({ children }: PropsWithChildren) {
    const theme = useThemeStore((state) => state.theme)

    useEffect(() => {
        const root = document.documentElement

        root.classList.remove('light', 'dark')
        root.classList.add(theme)
    }, [theme])

    return children
}