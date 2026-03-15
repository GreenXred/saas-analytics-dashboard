import { ChevronDown } from 'lucide-react'
import type { DateRange } from '../../../entities/analytics/model/types'
import { useDashboardFiltersStore } from '../model/store'

const DATE_RANGE_OPTIONS: { label: string; value: DateRange }[] = [
    { label: 'Last 3 months', value: '3m' },
    { label: 'Last 6 months', value: '6m' },
    { label: 'Last 12 months', value: '12m' },
]

export function DateRangeSelect() {
    const dateRange = useDashboardFiltersStore((state) => state.dateRange)
    const setDateRange = useDashboardFiltersStore((state) => state.setDateRange)

    return (
        <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Date range
            </span>

            <div className="relative">
                <select
                    value={dateRange}
                    onChange={(event) => setDateRange(event.target.value as DateRange)}
                    className="h-10 min-w-[170px] appearance-none rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                >
                    {DATE_RANGE_OPTIONS.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <ChevronDown
                    size={16}
                    className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400"
                />
            </div>
        </label>
    )
}