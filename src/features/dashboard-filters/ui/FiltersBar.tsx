import { SlidersHorizontal } from 'lucide-react'
import { Card, CardContent } from '../../../shared/ui/card/Card'
import { DateRangeSelect } from './DateRangeSelect'
import { SegmentSelect } from './SegmentSelect'

export function FiltersBar() {
    return (
        <Card className="bg-white dark:bg-zinc-950">
            <CardContent className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex items-center gap-2 text-sm font-medium text-zinc-700 dark:text-zinc-300">
                    <SlidersHorizontal size={16} />
                    <span>Filters</span>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                    <DateRangeSelect />
                    <SegmentSelect />
                </div>
            </CardContent>
        </Card>
    )
}