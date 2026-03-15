// Верхняя панель

export function AppHeader() {
    return (
        <header className="flex h-16 items-center justify-between border-b border-zinc-200 bg-white px-6">
            <div>
                <p className="text-sm text-zinc-500">Welcome back</p>
                <h2 className="text-lg font-semibold tracking-tight text-zinc-900">
                    SaaS Analytics Dashboard
                </h2>
            </div>

            <div className="flex items-center gap-3">
                <div className="hidden rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-500 md:block">
                    Search
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-zinc-900 text-sm font-semibold text-white">
                    A
                </div>
            </div>
        </header>
    )
}