import type { DateRange, Segment } from '../../../entities/analytics/model/types'

const DATE_RANGES: DateRange[] = ['3m', '6m', '12m']
const SEGMENTS: Segment[] = ['all', 'free', 'pro', 'enterprise']

function isDateRange(value: string | null): value is DateRange {
    if (value === null) {
        return false
    }

    return DATE_RANGES.includes(value as DateRange)
}

function isSegment(value: string | null): value is Segment {
    if (value === null) {
        return false
    }

    return SEGMENTS.includes(value as Segment)
}

export function getDateRangeFromSearchParams(searchParams: URLSearchParams): DateRange {
    const value = searchParams.get('range')

    if (isDateRange(value)) {
        return value
    }

    return '12m'
}

export function getSegmentFromSearchParams(searchParams: URLSearchParams): Segment {
    const value = searchParams.get('segment')

    if (isSegment(value)) {
        return value
    }

    return 'all'
}