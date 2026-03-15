import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { Button } from '../../../shared/ui/button/Button'
import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { KpiOverview } from '../../../widgets/kpi-overview/ui/KpiOverview'
import { PlanDistributionChart } from '../../../widgets/plan-distribution/ui/PlanDistributionChart'
import { RecentCustomersTable } from '../../../widgets/recent-customers/ui/RecentCustomersTable'
import { RetentionChart } from '../../../widgets/retention-chart/ui/RetentionChart'
import { RevenueChart } from '../../../widgets/revenue-chart/ui/RevenueChart'

const defaultParams: AnalyticsQueryParams = {
    dateRange: '12m',
    segment: 'all',
}

export function DashboardPage() {
    return (
        <section className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Track key SaaS metrics, revenue performance, and customer activity."
                actions={<Button variant="secondary">Export report</Button>}
            />

            <KpiOverview params={defaultParams} />

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RevenueChart params={defaultParams} />
                </div>

                <RetentionChart params={defaultParams} />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <PlanDistributionChart params={defaultParams} />

                <div className="xl:col-span-2">
                    <RecentCustomersTable />
                </div>
            </div>
        </section>
    )
}