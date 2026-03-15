import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts'
import { useRevenueSeries } from '../../../entities/analytics/api/useRevenueSeries'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { formatCurrency } from '../../../shared/lib/formatCurrency'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'
import { EmptyState } from '../../../shared/ui/empty-state/EmptyState'
import { ErrorState } from '../../../shared/ui/error-state/ErrorState'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'

interface RevenueChartProps {
    params: AnalyticsQueryParams
}

function RevenueChartSkeleton() {
    return (
        <ChartCard
            title="Revenue trend"
            description="Monthly revenue compared to the previous period."
        >
            <div className="space-y-4">
                <div className="flex h-[280px] items-end gap-3 rounded-xl bg-zinc-50 p-4">
                    {Array.from({ length: 12 }).map((_, index) => (
                        <Skeleton
                            key={index}
                            className="w-full rounded-md"
                            style={{ height: `${40 + (index % 6) * 20}px` }}
                        />
                    ))}
                </div>
            </div>
        </ChartCard>
    )
}

export function RevenueChart({ params }: RevenueChartProps) {
    const { data, isLoading, isError } = useRevenueSeries(params)

    if (isLoading) {
        return <RevenueChartSkeleton />
    }

    if (isError) {
        return (
            <ChartCard
                title="Revenue trend"
                description="Monthly revenue compared to the previous period."
            >
                <ErrorState
                    title="Failed to load revenue data"
                    description="We couldn’t load the revenue series for the selected filters."
                />
            </ChartCard>
        )
    }

    if (!data || data.length === 0) {
        return (
            <ChartCard
                title="Revenue trend"
                description="Monthly revenue compared to the previous period."
            >
                <EmptyState
                    title="No revenue data"
                    description="There is no revenue data for the selected period."
                />
            </ChartCard>
        )
    }

    const latestPoint = data[data.length - 1]
    const previousPoint = data[data.length - 2]

    const latestRevenue = latestPoint ? formatCurrency(latestPoint.current) : '$0'
    const previousRevenue = previousPoint ? formatCurrency(previousPoint.current) : '$0'

    return (
        <ChartCard
            title="Revenue trend"
            description="Monthly revenue compared to the previous period."
            action={
                <div className="text-right">
                    <p className="text-sm font-semibold text-zinc-900">{latestRevenue}</p>
                    <p className="text-xs text-zinc-500">Prev: {previousRevenue}</p>
                </div>
            }
        >
            <div className="h-[280px] text-zinc-900">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid vertical={false} strokeDasharray="3 3" />
                        <XAxis
                            dataKey="month"
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                        />
                        <YAxis
                            tickFormatter={(value) => `$${value / 1000}k`}
                            tickLine={false}
                            axisLine={false}
                            fontSize={12}
                            width={48}
                        />
                        <Tooltip
                            formatter={(value) => formatCurrency(Number(value))}
                            contentStyle={{
                                borderRadius: 16,
                                border: '1px solid #e4e4e7',
                            }}
                        />
                        <Line
                            type="monotone"
                            dataKey="current"
                            stroke="currentColor"
                            strokeWidth={2.5}
                            dot={false}
                        />
                        <Line
                            type="monotone"
                            dataKey="previous"
                            stroke="currentColor"
                            strokeOpacity={0.25}
                            strokeWidth={2}
                            dot={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </ChartCard>
    )
}