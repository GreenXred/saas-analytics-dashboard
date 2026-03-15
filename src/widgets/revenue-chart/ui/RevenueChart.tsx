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

interface RevenueChartProps {
    params: AnalyticsQueryParams
}

export function RevenueChart({ params }: RevenueChartProps) {
    const { data, isLoading, isError } = useRevenueSeries(params)

    if (isLoading) {
        return (
            <ChartCard
                title="Revenue trend"
                description="Monthly revenue compared to the previous period."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                    Loading revenue chart...
                </div>
            </ChartCard>
        )
    }

    if (isError || !data) {
        return (
            <ChartCard
                title="Revenue trend"
                description="Monthly revenue compared to the previous period."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-rose-50 text-sm text-rose-700">
                    Failed to load revenue data.
                </div>
            </ChartCard>
        )
    }

    return (
        <ChartCard
            title="Revenue trend"
            description="Monthly revenue compared to the previous period."
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
