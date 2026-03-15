import { useDashboardSummary } from '../../../entities/analytics/api/useDashboardSummary'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { formatPercent } from '../../../shared/lib/formatPercent'
import { ErrorState } from '../../../shared/ui/error-state/ErrorState'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'
import { StatCard } from '../../../shared/ui/stat-card/StatCard'

interface KpiOverviewProps {
    params: AnalyticsQueryParams
}

function KpiOverviewSkeleton() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                    key={index}
                    className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm"
                >
                    <div className="space-y-4">
                        <div className="flex items-center justify-between gap-3">
                            <Skeleton className="h-4 w-28" />
                            <Skeleton className="h-6 w-16 rounded-full" />
                        </div>

                        <Skeleton className="h-8 w-24" />
                    </div>
                </div>
            ))}
        </div>
    )
}

export function KpiOverview({ params }: KpiOverviewProps) {
    const { data, isLoading, isError } = useDashboardSummary(params)

    if (isLoading) {
        return <KpiOverviewSkeleton />
    }

    if (isError || !data) {
        return (
            <ErrorState
                title="Failed to load key metrics"
                description="We couldn’t load the summary metrics for this dashboard."
                className="min-h-[180px]"
            />
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