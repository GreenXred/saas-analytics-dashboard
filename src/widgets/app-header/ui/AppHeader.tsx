import { Bell, Search } from 'lucide-react'
import { ThemeToggle } from '../../../features/toggle-theme/ui/ThemeToggle'

export function AppHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">Overview</p>
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                    SaaS Analytics Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400 md:flex dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-500">
                    <Search size={16} />
                    <span>Search</span>
                </div>

                <ThemeToggle />

                <button
                    type="button"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition hover:bg-zinc-100 hover:text-zinc-900 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
                >
                    <Bell size={18} />
                </button>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white dark:bg-zinc-100 dark:text-zinc-900">
                    A
                </div>
            </div>
        </header>
    )
}