import type { DateRange, Segment } from '../../../entities/analytics/model/types'

export interface DashboardFilters {
    dateRange: DateRange
    segment: Segment
}
