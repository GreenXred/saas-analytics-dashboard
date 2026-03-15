import { useRecentCustomers } from '../../../entities/customer/api/useRecentCustomers'
import type { Customer, CustomerStatus } from '../../../entities/customer/model/types'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { formatDate } from '../../../shared/lib/formatDate'
import { Badge } from '../../../shared/ui/badge/Badge'
import { Card, CardContent, CardHeader, CardTitle } from '../../../shared/ui/card/Card'

function getStatusVariant(status: CustomerStatus): 'success' | 'warning' | 'danger' {
    if (status === 'active') {
        return 'success'
    }

    if (status === 'trial') {
        return 'warning'
    }

    return 'danger'
}

export function RecentCustomersTable() {
    const { data, isLoading, isError } = useRecentCustomers()

    const customers: Customer[] = data ?? []

    if (isLoading) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent customers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-zinc-500">Loading customers...</div>
                </CardContent>
            </Card>
        )
    }

    if (isError) {
        return (
            <Card>
                <CardHeader>
                    <CardTitle>Recent customers</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-sm text-rose-700">Failed to load customers.</div>
                </CardContent>
            </Card>
        )
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent customers</CardTitle>
            </CardHeader>

            <CardContent className="overflow-x-auto">
                <table className="min-w-full border-separate border-spacing-0">
                    <thead>
                        <tr className="text-left">
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500">
                                Customer
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500">
                                Plan
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500">
                                Status
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500">
                                MRR
                            </th>
                            <th className="border-b border-zinc-200 pb-3 text-sm font-medium text-zinc-500">
                                Joined
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map((customer) => (
                            <tr key={customer.id}>
                                <td className="border-b border-zinc-100 py-4 pr-4">
                                    <div>
                                        <p className="text-sm font-medium text-zinc-900">{customer.name}</p>
                                        <p className="text-sm text-zinc-500">{customer.company}</p>
                                    </div>
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 text-sm text-zinc-700">
                                    {customer.plan}
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4">
                                    <Badge variant={getStatusVariant(customer.status)}>
                                        {customer.status}
                                    </Badge>
                                </td>

                                <td className="border-b border-zinc-100 py-4 pr-4 text-sm text-zinc-700">
                                    {formatCurrency(customer.mrr)}
                                </td>

                                <td className="border-b border-zinc-100 py-4 text-sm text-zinc-500">
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