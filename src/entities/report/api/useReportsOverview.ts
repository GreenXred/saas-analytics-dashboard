import { useQuery } from '@tanstack/react-query'
import { reportQueryKeys } from '../model/queryKeys'
import { getReportsOverview } from './getReportsOverview'

export function useReportsOverview() {
    return useQuery({
        queryKey: reportQueryKeys.overview,
        queryFn: getReportsOverview,
    })
}
