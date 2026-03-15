import { Link } from 'react-router-dom'
import { routes } from '../../../shared/config/routes'

export function NotFoundPage() {
    return (
        <section className="space-y-4">
            <h1 className="text-2xl font-semibold tracking-tight">Page not found</h1>
            <p className="text-sm text-zinc-500">
                The page you are looking for does not exist.
            </p>

            <Link
                to={routes.dashboard}
                className="inline-flex rounded-lg border px-4 py-2 text-sm font-medium transition hover:bg-zinc-100"
            >
                Go to dashboard
            </Link>
        </section>
    )
}