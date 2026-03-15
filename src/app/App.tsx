import { ThemeProvider } from './providers/theme/ThemeProvider'
import { QueryProvider } from './providers/query-client/QueryProvider'
import { AppRouter } from './providers/router/AppRouter'

export function App() {
    return (
        <ThemeProvider>
            <QueryProvider>
                <AppRouter />
            </QueryProvider>
        </ThemeProvider>
    )
}