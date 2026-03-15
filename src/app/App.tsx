import { QueryProvider } from './providers/query-client/QueryProvider'
import { AppRouter } from './providers/router/AppRouter'

export function App() {
    return (
        <QueryProvider>
            <AppRouter />
        </QueryProvider>
    )
}