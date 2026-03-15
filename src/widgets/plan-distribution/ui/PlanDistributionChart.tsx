import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { usePlanDistribution } from '../../../entities/analytics/api/usePlanDistribution'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'

interface PlanDistributionChartProps {
    params: AnalyticsQueryParams
}

function renderLabel(props: {
    cx?: number
    cy?: number
    midAngle?: number
    innerRadius?: number
    outerRadius?: number
    percent?: number
}) {
    const { cx, cy, midAngle, innerRadius, outerRadius, percent } = props

    if (
        cx === undefined ||
        cy === undefined ||
        midAngle === undefined ||
        innerRadius === undefined ||
        outerRadius === undefined ||
        percent === undefined
    ) {
        return null
    }

    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180)
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180)

    return (
        <text
            x={x}
            y={y}
            fill="currentColor"
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            fontSize={12}
        >
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    )
}

export function PlanDistributionChart({ params }: PlanDistributionChartProps) {
    const { data, isLoading, isError } = usePlanDistribution(params)

    if (isLoading) {
        return (
            <ChartCard
                title="Plan distribution"
                description="Share of customers by subscription plan."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 text-sm text-zinc-400">
                    Loading plan distribution...
                </div>
            </ChartCard>
        )
    }

    if (isError || !data) {
        return (
            <ChartCard
                title="Plan distribution"
                description="Share of customers by subscription plan."
            >
                <div className="flex h-[280px] items-center justify-center rounded-xl bg-rose-50 text-sm text-rose-700">
                    Failed to load plan distribution.
                </div>
            </ChartCard>
        )
    }

    return (
        <ChartCard
            title="Plan distribution"
            description="Share of customers by subscription plan."
        >
            <div className="h-[280px] text-zinc-900">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="value"
                            nameKey="plan"
                            innerRadius={60}
                            outerRadius={90}
                            paddingAngle={4}
                            labelLine={false}
                            label={renderLabel}
                        >
                            <Cell fill="currentColor" fillOpacity={1} />
                            <Cell fill="currentColor" fillOpacity={0.65} />
                            <Cell fill="currentColor" fillOpacity={0.35} />
                        </Pie>

                        <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-zinc-500">
                {data.map((item) => (
                    <div
                        key={item.plan}
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-center"
                    >
                        <p className="font-medium text-zinc-900">{item.plan}</p>
                        <p>{item.value}%</p>
                    </div>
                ))}
            </div>
        </ChartCard>
    )
}