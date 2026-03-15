import { useQuery } from '@tanstack/react-query'
import type { Customer } from '../model/types'
import { customerQueryKeys } from '../model/queryKeys'
import { getRecentCustomers } from './getRecentCustomers'

export function useRecentCustomers() {
    return useQuery<Customer[]>({
        queryKey: customerQueryKeys.recent,
        queryFn: getRecentCustomers,
    })
}
