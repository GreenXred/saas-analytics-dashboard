import { useQuery } from '@tanstack/react-query'
import { analyticsQueryKeys } from '../model/queryKeys'
import type { AnalyticsQueryParams } from '../model/types'
import { getRetentionSeries } from './getRetentionSeries'

export function useRetentionSeries(params: AnalyticsQueryParams) {
    return useQuery({
        queryKey: analyticsQueryKeys.retention(params),
        queryFn: () => getRetentionSeries(),
    })
}
