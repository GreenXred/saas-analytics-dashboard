import type { Customer } from '../model/types'
import type {
    CustomerSortField,
    SortDirection,
} from '../../../features/customer-sorting/model/types'

export function sortCustomers(
    customers: Customer[],
    field: CustomerSortField,
    direction: SortDirection
): Customer[] {
    const sorted = [...customers].sort((a, b) => {
        switch (field) {
            case 'name':
                return a.name.localeCompare(b.name)

            case 'plan':
                return a.plan.localeCompare(b.plan)

            case 'status':
                return a.status.localeCompare(b.status)

            case 'mrr':
                return a.mrr - b.mrr

            case 'joinedAt':
                return new Date(a.joinedAt).getTime() - new Date(b.joinedAt).getTime()

            case 'lastActiveAt':
                return (
                    new Date(a.lastActiveAt).getTime() - new Date(b.lastActiveAt).getTime()
                )

            default:
                return 0
        }
    })

    if (direction === 'desc') {
        sorted.reverse()
    }

    return sorted
}
