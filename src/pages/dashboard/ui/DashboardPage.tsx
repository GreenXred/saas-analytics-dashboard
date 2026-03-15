import { useEffect, useRef } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Button } from '../../../shared/ui/button/Button'
import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { FiltersBar } from '../../../features/dashboard-filters/ui/FiltersBar'
import { useDashboardFiltersStore } from '../../../features/dashboard-filters/model/store'
import { getDateRangeFromSearchParams, getSegmentFromSearchParams } from '../../../features/dashboard-filters/lib/queryParams'
import { KpiOverview } from '../../../widgets/kpi-overview/ui/KpiOverview'
import { PlanDistributionChart } from '../../../widgets/plan-distribution/ui/PlanDistributionChart'
import { RecentCustomersTable } from '../../../widgets/recent-customers/ui/RecentCustomersTable'
import { RetentionChart } from '../../../widgets/retention-chart/ui/RetentionChart'
import { RevenueChart } from '../../../widgets/revenue-chart/ui/RevenueChart'

export function DashboardPage() {
    const [searchParams, setSearchParams] = useSearchParams()
    const isInitializedRef = useRef(false)

    const dateRange = useDashboardFiltersStore((state) => state.dateRange)
    const segment = useDashboardFiltersStore((state) => state.segment)
    const setFilters = useDashboardFiltersStore((state) => state.setFilters)

    useEffect(() => {
        if (isInitializedRef.current) {
            return
        }

        const nextDateRange = getDateRangeFromSearchParams(searchParams)
        const nextSegment = getSegmentFromSearchParams(searchParams)

        setFilters({
            dateRange: nextDateRange,
            segment: nextSegment,
        })

        isInitializedRef.current = true
    }, [searchParams, setFilters])

    useEffect(() => {
        if (!isInitializedRef.current) {
            return
        }

        setSearchParams({
            range: dateRange,
            segment,
        })
    }, [dateRange, segment, setSearchParams])

    const params = {
        dateRange,
        segment,
    }

    return (
        <section className="space-y-6">
            <PageHeader
                title="Dashboard"
                description="Track key SaaS metrics, revenue performance, and customer activity."
                actions={<Button variant="secondary">Export report</Button>}
            />

            <FiltersBar />

            <KpiOverview params={params} />

            <div className="grid gap-4 xl:grid-cols-3">
                <div className="xl:col-span-2">
                    <RevenueChart params={params} />
                </div>

                <RetentionChart params={params} />
            </div>

            <div className="grid gap-4 xl:grid-cols-3">
                <PlanDistributionChart params={params} />

                <div className="xl:col-span-2">
                    <RecentCustomersTable />
                </div>
            </div>
        </section>
    )
}