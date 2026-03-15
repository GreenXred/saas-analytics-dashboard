import { useQuery } from '@tanstack/react-query'
import { analyticsQueryKeys } from '../model/queryKeys'
import type { AnalyticsQueryParams } from '../model/types'
import { getDashboardSummary } from './getDashboardSummary'

export function useDashboardSummary(params: AnalyticsQueryParams) {
    return useQuery({
        queryKey: analyticsQueryKeys.summary(params),
        queryFn: () => getDashboardSummary(),
    })
}
