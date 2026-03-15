import { Button } from '../../../shared/ui/button/Button'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'
import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { StatCard } from '../../../shared/ui/stat-card/StatCard'

export function DashboardPage() {
    return (
        <section className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Track key SaaS metrics, revenue performance, and customer activity."
                actions={<Button variant="secondary">Export report</Button>}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Monthly recurring revenue"
                    value="$48,240"
                    changeText="+12.4%"
                    trend="up"
                />
                <StatCard
                    label="Annual run rate"
                    value="$578,880"
                    changeText="+8.1%"
                    trend="up"
                />
                <StatCard
                    label="Active users"
                    value="12,540"
                    changeText="+5.2%"
                    trend="up"
                />
                <StatCard
                    label="Churn rate"
                    value="2.14%"
                    changeText="-0.6%"
                    trend="down"
                />
            </div>

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