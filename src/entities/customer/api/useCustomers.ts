import { useQuery } from '@tanstack/react-query'
import { customerQueryKeys } from '../model/queryKeys'
import { getCustomers } from './getCustomers'

export function useCustomers() {
    return useQuery({
        queryKey: customerQueryKeys.list,
        queryFn: getCustomers,
    })
}
