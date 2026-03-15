import type { Customer } from '../model/types'
import type { CustomerFilters } from '../../../features/customer-filters/model/types'

export function filterCustomers(
    customers: Customer[],
    filters: CustomerFilters
): Customer[] {
    const normalizedSearch = filters.search.trim().toLowerCase()

    return customers.filter((customer) => {
        const matchesSearch =
            normalizedSearch.length === 0 ||
            customer.name.toLowerCase().includes(normalizedSearch) ||
            customer.company.toLowerCase().includes(normalizedSearch) ||
            customer.email.toLowerCase().includes(normalizedSearch)

        const matchesStatus =
            filters.status === 'all' || customer.status === filters.status

        const matchesPlan =
            filters.plan === 'all' || customer.plan === filters.plan

        return matchesSearch && matchesStatus && matchesPlan
    })
}