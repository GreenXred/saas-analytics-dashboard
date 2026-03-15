import { useQuery } from '@tanstack/react-query'
import { analyticsQueryKeys } from '../model/queryKeys'
import type { AnalyticsQueryParams } from '../model/types'
import { getPlanDistribution } from './getPlanDistribution'

export function usePlanDistribution(params: AnalyticsQueryParams) {
    return useQuery({
        queryKey: analyticsQueryKeys.planDistribution(params),
        queryFn: () => getPlanDistribution(),
    })
}
