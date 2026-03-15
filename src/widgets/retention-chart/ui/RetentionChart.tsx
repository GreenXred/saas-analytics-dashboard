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

interface RetentionChartProps {
    params: AnalyticsQueryParams
}

export function RetentionChart({ params }: RetentionChartProps) {
    const { data, isLoading, isError } = useRetentionSeries(params)

    if (isLoading) {
        return (
            <ChartCard
                title="Retention"
                description="Customer retention performance over time."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                    Loading retention chart...
                </div>
            </ChartCard>
        )
    }

    if (isError || !data) {
        return (
            <ChartCard
                title="Retention"
                description="Customer retention performance over time."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-rose-50 text-sm text-rose-700">
                    Failed to load retention data.
                </div>
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
