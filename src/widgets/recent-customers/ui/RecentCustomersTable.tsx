import { useRecentCustomers } from '../../../entities/customer/api/useRecentCustomers'
import type { Customer, CustomerStatus } from '../../../entities/customer/model/types'
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

function RecentCustomersTableSkeleton() {
    return (
        <Card>
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle>Recent customers</CardTitle>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Recently active accounts and subscription status.
                    </p>
                </div>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Customer
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Plan
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Status
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                MRR
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Joined
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: 5 }).map((_, index) => (
                            <tr key={index}>
                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <div className="space-y-2">
                                        <Skeleton className="h-4 w-28" />
                                        <Skeleton className="h-4 w-20" />
                                    </div>
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <Skeleton className="h-6 w-16 rounded-full" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-16" />
                                </td>

                                <td className="border-b border-zinc-100 py-4 dark:border-zinc-800">
                                    <Skeleton className="h-4 w-20" />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}

export function RecentCustomersTable() {
    const { data, isLoading, isError } = useRecentCustomers()

    const customers: Customer[] = data ?? []

    if (isLoading) {
        return <RecentCustomersTableSkeleton />
    }

    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <CardTitle>Recent customers</CardTitle>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Recently active accounts and subscription status.
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <ErrorState
                        title="Failed to load customers"
                        description="We couldn’t load the recent customer list."
                        className="min-h-[260px]"
                    />
                </CardContent>
            </Card>
        )
    }

    if (customers.length === 0) {
        return (
            <Card>
                <CardHeader>
                    <div className="space-y-1">
                        <CardTitle>Recent customers</CardTitle>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Recently active accounts and subscription status.
                        </p>
                    </div>
                </CardHeader>

                <CardContent>
                    <EmptyState
                        title="No recent customers"
                        description="There are no customer records to display right now."
                        className="min-h-[260px]"
                    />
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle>Recent customers</CardTitle>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                        Recently active accounts and subscription status.
                    </p>
                </div>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Customer
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Plan
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Status
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                MRR
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                Joined
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border-b border-zinc-100 py-4 pr-4 dark:border-zinc-800">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                            {customer.name}
                                        </p>
                                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                                            {customer.company}
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

                                <td className="border-b border-zinc-100 py-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
                                    {formatDate(customer.joinedAt)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </CardContent>
        </Card>
    )
}