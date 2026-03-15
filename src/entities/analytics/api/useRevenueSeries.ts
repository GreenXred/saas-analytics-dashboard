import { useQuery } from '@tanstack/react-query'
import { analyticsQueryKeys } from '../model/queryKeys'
import type { AnalyticsQueryParams } from '../model/types'
import { getRevenueSeries } from './getRevenueSeries'

export function useRevenueSeries(params: AnalyticsQueryParams) {
    return useQuery({
        queryKey: analyticsQueryKeys.revenue(params),
        queryFn: () => getRevenueSeries(),
    })
}
