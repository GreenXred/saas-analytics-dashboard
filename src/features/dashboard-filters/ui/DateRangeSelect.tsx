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
            <span className="text-xs font-medium text-zinc-500">Date range</span>

            <select
                value={dateRange}
                onChange={(event) => setDateRange(event.target.value as DateRange)}
                className="h-10 min-w-[170px] rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
            >
                {DATE_RANGE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}