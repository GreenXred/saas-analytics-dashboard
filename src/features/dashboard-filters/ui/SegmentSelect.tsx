import { ChevronDown } from 'lucide-react'
import type { Segment } from '../../../entities/analytics/model/types'
import { useDashboardFiltersStore } from '../model/store'

const SEGMENT_OPTIONS: { label: string; value: Segment }[] = [
    { label: 'All users', value: 'all' },
    { label: 'Free', value: 'free' },
    { label: 'Pro', value: 'pro' },
    { label: 'Enterprise', value: 'enterprise' },
]

export function SegmentSelect() {
    const segment = useDashboardFiltersStore((state) => state.segment)
    const setSegment = useDashboardFiltersStore((state) => state.setSegment)

    return (
        <label className="flex flex-col gap-1">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Segment
            </span>

            <div className="relative">
                <select
                    value={segment}
                    onChange={(event) => setSegment(event.target.value as Segment)}
                    className="h-10 min-w-[170px] appearance-none rounded-xl border border-zinc-200 bg-white px-3 pr-10 text-sm text-zinc-900 outline-none transition-colors focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                >
                    {SEGMENT_OPTIONS.map((option) => (
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