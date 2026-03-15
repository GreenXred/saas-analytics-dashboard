import { Button } from '../../../shared/ui/button/Button'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'
import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { StatCard } from '../../../shared/ui/stat-card/StatCard'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { formatPercent } from '../../../shared/lib/formatPercent'
import { useDashboardSummary } from '../../../entities/analytics/api/useDashboardSummary'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'

const defaultParams: AnalyticsQueryParams = {
    dateRange: '12m',
    segment: 'all',
}

export function DashboardPage() {
    const { data, isLoading, isError } = useDashboardSummary(defaultParams)

    return (
        <section className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Track key SaaS metrics, revenue performance, and customer activity."
                actions={<Button variant="secondary">Export report</Button>}
            />

            {isLoading ? (
                <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-6 text-sm text-zinc-500">
                    Loading dashboard summary...
                </div>
            ) : null}

            {isError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
                    Failed to load dashboard summary.
                </div>
            ) : null}

            {data ? (
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
            ) : null}

            <div className="grid gap-4 xl:grid-cols-3">
                <ChartCard
                    title="Revenue trend"
                    description="Monthly revenue compared to the previous period."
                >
                    <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                        Revenue chart placeholder
                    </div>
                </ChartCard>

                <ChartCard
                    title="Retention"
                    description="Customer retention performance over time."
                >
                    <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                        Retention chart placeholder
                    </div>
                </ChartCard>

                <ChartCard
                    title="Plan distribution"
                    description="Share of customers by subscription plan."
                >
                    <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                        Plan distribution placeholder
                    </div>
                </ChartCard>
            </div>
        </section>
    )
}