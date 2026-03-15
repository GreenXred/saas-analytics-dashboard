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
        <select
            value={dateRange}
            onChange={(event) => setDateRange(event.target.value as DateRange)}
            className="rounded-xl border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900"
        >
            {DATE_RANGE_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                    {option.label}
                </option>
            ))}
        </select>
    )
}