import { DateRangeSelect } from './DateRangeSelect'
import { SegmentSelect } from './SegmentSelect'

export function FiltersBar() {
    return (
        <div className="flex flex-wrap items-center gap-3">
            <DateRangeSelect />
            <SegmentSelect />
        </div>
    )
}
