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
            <span className="text-xs font-medium text-zinc-500">Segment</span>

            <select
                value={segment}
                onChange={(event) => setSegment(event.target.value as Segment)}
                className="h-10 min-w-[170px] rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400"
            >
                {SEGMENT_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </label>
    )
}