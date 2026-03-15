import { useMemo } from 'react'
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react'

import { useCustomers } from '../../../entities/customer/api/useCustomers'
import { filterCustomers } from '../../../entities/customer/lib/customerFilters'
import { sortCustomers } from '../../../entities/customer/lib/sortCustomers'
import type { Customer, CustomerStatus } from '../../../entities/customer/model/types'

import { useCustomerFiltersStore } from '../../../features/customer-filters/model/store'
import { useCustomerSortingStore } from '../../../features/customer-sorting/model/store'
import type { CustomerSortField } from '../../../features/customer-sorting/model/types'

import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { formatDate } from '../../../shared/lib/formatDate'

import { Badge } from '../../../shared/ui/badge/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card/Card'
import { EmptyState } from '../../../shared/ui/empty-state/EmptyState'
import { ErrorState } from '../../../shared/ui/error-state/ErrorState'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'

function getStatusVariant(status: CustomerStatus): 'success' | 'warning' | 'danger' {
    if (status === 'active') {
        return 'success'
    }

    if (status === 'trial') {
        return 'warning'
    }

    return 'danger'
}

function CustomersListTableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle>Customers</CardTitle>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Manage customer accounts, subscription plans, and recent activity.
                    </p>
                </div>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">Customer</th>
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">Plan</th>
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">Status</th>
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">MRR</th>
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">Joined</th>
                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">Last active</th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 6 }).map((_, index) => (
                            <tr key={index}>
                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-40" />
                                    </div>
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-24" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-24" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}

function SortableHeader({
    label,
    field,
}: {
    label: string
    field: CustomerSortField
}) {
    const activeField = useCustomerSortingStore((state) => state.field)
    const direction = useCustomerSortingStore((state) => state.direction)
    const setSorting = useCustomerSortingStore((state) => state.setSorting)

    const isActive = activeField === field

    return (
        <button
            type="button"
            onClick={() => setSorting(field)}
            className={`inline-flex items-center gap-1 rounded-md text-sm font-medium transition ${isActive
                    ? 'text-zinc-900 dark:text-zinc-100'
                    : 'text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100'
                }`}
        >
            <span>{label}</span>

            {isActive ? (
                direction === 'asc' ? (
                    <ArrowUp size={14} />
                ) : (
                    <ArrowDown size={14} />
                )
            ) : (
                <ArrowUpDown size={14} />
            )}
        </button>
    )
}

export function CustomersListTable() {
    const { data, isLoading, isError } = useCustomers()

    const search = useCustomerFiltersStore((state) => state.search)
    const status = useCustomerFiltersStore((state) => state.status)
    const plan = useCustomerFiltersStore((state) => state.plan)

    const sortField = useCustomerSortingStore((state) => state.field)
    const sortDirection = useCustomerSortingStore((state) => state.direction)

    const customers: Customer[] = data ?? []

    const filteredCustomers = useMemo(() => {
        return filterCustomers(customers, {
            search,
            status,
            plan,
        })
    }, [customers, search, status, plan])

    const sortedCustomers = useMemo(() => {
        return sortCustomers(filteredCustomers, sortField, sortDirection)
    }, [filteredCustomers, sortField, sortDirection])

    if (isLoading) {
        return <CustomersListTableSkeleton />
    }

    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <CardTitle>Customers</CardTitle>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Manage customer accounts, subscription plans, and recent activity.
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <ErrorState
                        title="Failed to load customers"
                        description="We couldn’t load the customer list."
                        className="min-h-[320px]"
                    />
                </CardContent>
            </Card>
        )
    }

    if (sortedCustomers.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <CardTitle>Customers</CardTitle>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Manage customer accounts, subscription plans, and recent activity.
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <EmptyState
                        title="No customers found"
                        description="Try changing your search query or filters."
                        className="min-h-[320px]"
                    />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-1">
                        <CardTitle>Customers</CardTitle>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Manage customer accounts, subscription plans, and recent activity.
                        </p>
                    </div>

                    <div className="rounded-xl border border-zinc-200 px-3 py-2 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                        {sortedCustomers.length} result
                        {sortedCustomers.length === 1 ? '' : 's'}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-3 pr-4 dark:border-zinc-800">
                                <SortableHeader label="Customer" field="name" />
                            </th>

                            <th className="border-b border-zinc-200 pb-3 pr-4 dark:border-zinc-800">
                                <SortableHeader label="Plan" field="plan" />
                            </th>

                            <th className="border-b border-zinc-200 pb-3 pr-4 dark:border-zinc-800">
                                <SortableHeader label="Status" field="status" />
                            </th>

                            <th className="border-b border-zinc-200 pb-3 pr-4 dark:border-zinc-800">
                                <SortableHeader label="MRR" field="mrr" />
                            </th>

                            <th className="border-b border-zinc-200 pb-3 pr-4 dark:border-zinc-800">
                                <SortableHeader label="Joined" field="joinedAt" />
                            </th>

                            <th className="border-b border-zinc-200 pb-3 dark:border-zinc-800">
                                <SortableHeader label="Last active" field="lastActiveAt" />
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {sortedCustomers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {customer.name}
                                        </p>

                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {customer.company} · {customer.email}
                                        </p>
                                    </div>
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                                    {customer.plan}
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <Badge variant={getStatusVariant(customer.status)}>
                                        {customer.status}
                                    </Badge>
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 text-sm text-zinc-700 dark:border-zinc-800 dark:text-zinc-300">
                                    {formatCurrency(customer.mrr)}
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                    {formatDate(customer.joinedAt)}
                                </td>

                                <td className="border-b border-zinc-100 py-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                    {formatDate(customer.lastActiveAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}