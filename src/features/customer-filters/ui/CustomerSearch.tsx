import { Search } from 'lucide-react'
import { useCustomerFiltersStore } from '../model/store'

export function CustomerSearch() {
    const search = useCustomerFiltersStore((state) => state.search)
    const setSearch = useCustomerFiltersStore((state) => state.setSearch)

    return (
        <label className="flex w-full max-w-[420px] flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Search
            </span>

            <div className="relative">
                <Search
                    size={16}
                    className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
                />

                <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search by name, company or email"
                    className="h-11 w-full rounded-xl border border-zinc-200 bg-white pl-11 pr-4 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                />
            </div>
        </label>
    )
}