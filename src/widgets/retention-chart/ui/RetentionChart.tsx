import {
    Area,
    AreaChart,
    CartesianGrid,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useRetentionSeries } from '../../../entities/analytics/api/useRetentionSeries'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { formatPercent } from '../../../shared/lib/formatPercent'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'
import { EmptyState } from '../../../shared/ui/empty-state/EmptyState'
import { ErrorState } from '../../../shared/ui/error-state/ErrorState'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'

interface RetentionChartProps {
    params: AnalyticsQueryParams
}

function RetentionChartSkeleton() {
    return (
        <ChartCard
            title="Retention"
            description="Customer retention performance over time."
        >
            <div className="flex h-[280px] items-end gap-3 rounded-xl bg-zinc-50 p-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="w-full rounded-md"
                        style={{ height: `${120 + (index % 4) * 20}px` }}
                    />
                ))}
            </div>
        </ChartCard>
    )
}

export function RetentionChart({ params }: RetentionChartProps) {
    const { data, isLoading, isError } = useRetentionSeries(params)

    if (isLoading) {
        return <RetentionChartSkeleton />
    }

    if (isError) {
        return (
            <ChartCard
                title="Retention"
                description="Customer retention performance over time."
            >
                <ErrorState
                    title="Failed to load retention data"
                    description="We couldn’t load the retention series for the selected filters."
                />
            </ChartCard>
        )
    }

    if (!data || data.length === 0) {
        return (
            <ChartCard
                title="Retention"
                description="Customer retention performance over time."
            >
                <EmptyState
                    title="No retention data"
                    description="There is no retention data for the selected period."
                />
            </ChartCard>
        )
    }

    return (
        <ChartCard
            title="Retention"
            description="Customer retention performance over time."
        >
            <div className="h-[280px] text-zinc-900">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="period"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />
                        <YAxis
                            tickFormatter={(value) => `${value}%`}
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            width={40}
                        />
                        <Tooltip
                            formatter={(value) => formatPercent(Number(value))}
                            contentStyle={{
                                borderRadius: 16,
                                border: '1px solid #e4e4e7',
                            }}
                        />
                        <Area
                            type="monotone"
                            dataKey="retention"
                            stroke="currentColor"
                            fill="currentColor"
                            fillOpacity={0.12}
                            strokeWidth={2.5}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    )
}