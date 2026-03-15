import { useMemo } from 'react'
import { useCustomers } from '../../../entities/customer/api/useCustomers'
import type { Customer } from '../../../entities/customer/model/types'
import { Card, CardContent } from '../../../shared/ui/card/Card'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'

function CustomersSummarySkeleton() {
    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <Card key={index}>
                    <CardContent className="space-y-3">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-8 w-16" />
                    </CardContent>
                </Card>
            ))}
        </div>
    )
}

function getSummary(customers: Customer[]) {
    return {
        total: customers.length,
        active: customers.filter((customer) => customer.status === 'active').length,
        trial: customers.filter((customer) => customer.status === 'trial').length,
        churned: customers.filter((customer) => customer.status === 'churned').length,
    }
}

export function CustomersSummary() {
    const { data, isLoading } = useCustomers()

    const customers = data ?? []

    const summary = useMemo(() => {
        return getSummary(customers)
    }, [customers])

    if (isLoading) {
        return <CustomersSummarySkeleton />
    }

    return (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card>
                <CardContent className="space-y-2">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Total customers
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {summary.total}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Active
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {summary.active}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Trial
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {summary.trial}
                    </p>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="space-y-2">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        Churned
                    </p>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {summary.churned}
                    </p>
                </CardContent>
            </Card>
        </div>
    )
}