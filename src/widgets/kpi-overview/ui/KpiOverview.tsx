// Виджет, который получает summary-данные через hook и рендерит сетку StatCard

import { useDashboardSummary } from '../../../entities/analytics/api/useDashboardSummary'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { formatPercent } from '../../../shared/lib/formatPercent'
import { StatCard } from '../../../shared/ui/stat-card/StatCard'

interface KpiOverviewProps {
    params: AnalyticsQueryParams
}

export function KpiOverview({ params }: KpiOverviewProps) {
    const { data, isLoading, isError } = useDashboardSummary(params)

    if (isLoading) {
        return (
            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
                Loading key metrics...
            </div>
        )
    }

    if (isError || !data) {
        return (
            <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                Failed to load key metrics.
            </div>
        )
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <StatCard
                label="Monthly recurring revenue"
                value={formatCurrency(data.mrr)}
                changeText={`${data.mrrChange > 0 ? '+' : ''}${formatPercent(data.mrrChange)}`}
                trend={data.mrrChange >= 0 ? 'up' : 'down'}
            />

            <StatCard
                label="Annual run rate"
                value={formatCurrency(data.arr)}
                changeText={`${data.arrChange > 0 ? '+' : ''}${formatPercent(data.arrChange)}`}
                trend={data.arrChange >= 0 ? 'up' : 'down'}
            />

            <StatCard
                label="Active users"
                value={data.activeUsers.toLocaleString('en-US')}
                changeText={`${data.activeUsersChange > 0 ? '+' : ''}${formatPercent(data.activeUsersChange)}`}
                trend={data.activeUsersChange >= 0 ? 'up' : 'down'}
            />

            <StatCard
                label="Churn rate"
                value={formatPercent(data.churnRate)}
                changeText={`${data.churnRateChange > 0 ? '+' : ''}${formatPercent(data.churnRateChange)}`}
                trend={data.churnRateChange <= 0 ? 'up' : 'down'}
            />
        </div>
    )
}
