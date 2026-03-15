import type {
    CustomerPlan,
    CustomerStatus,
} from '../../../entities/customer/model/types'

export interface CustomerFilters {
    search: string
    status: CustomerStatus | 'all'
    plan: CustomerPlan | 'all'
}
