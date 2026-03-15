import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import { usePlanDistribution } from '../../../entities/analytics/api/usePlanDistribution'
import type { AnalyticsQueryParams } from '../../../entities/analytics/model/types'
import { ChartCard } from '../../../shared/ui/chart-card/ChartCard'
import { EmptyState } from '../../../shared/ui/empty-state/EmptyState'
import { ErrorState } from '../../../shared/ui/error-state/ErrorState'
import { Skeleton } from '../../../shared/ui/skeleton/Skeleton'

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
    const { cx, cy, midAngle, outerRadius, percent } = props

    if (
        cx === undefined ||
        cy === undefined ||
        midAngle === undefined ||
        outerRadius === undefined ||
        percent === undefined
    ) {
        return null
    }

    const radius = outerRadius + 18
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

function PlanDistributionSkeleton() {
    return (
        <ChartCard
            title="Plan distribution"
            description="Share of customers by subscription plan."
        >
            <div className="flex h-[280px] items-center justify-center rounded-xl bg-zinc-50 dark:bg-zinc-900">
                <Skeleton className="h-40 w-40 rounded-full" />
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2">
                {Array.from({ length: 3 }).map((_, index) => (
                    <div
                        key={index}
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-center dark:border-zinc-800"
                    >
                        <Skeleton className="mx-auto h-4 w-16" />
                        <Skeleton className="mx-auto mt-2 h-4 w-10" />
                    </div>
                ))}
            </div>
        </ChartCard>
    )
}

export function PlanDistributionChart({ params }: PlanDistributionChartProps) {
    const { data, isLoading, isError } = usePlanDistribution(params)

    if (isLoading) {
        return <PlanDistributionSkeleton />
    }

    if (isError) {
        return (
            <ChartCard
                title="Plan distribution"
                description="Share of customers by subscription plan."
            >
                <ErrorState
                    title="Failed to load plan distribution"
                    description="We couldn’t load the subscription plan breakdown."
                />
            </ChartCard>
        )
    }

    if (!data || data.length === 0) {
        return (
            <ChartCard
                title="Plan distribution"
                description="Share of customers by subscription plan."
            >
                <EmptyState
                    title="No plan data"
                    description="There is no plan distribution data for the selected filters."
                />
            </ChartCard>
        )
    }

    return (
        <ChartCard
            title="Plan distribution"
            description="Share of customers by subscription plan."
        >
            <div className="h-[280px] text-zinc-900 dark:text-zinc-100">
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

                        <Tooltip
                            formatter={(value) => `${value}%`}
                            contentStyle={{
                                borderRadius: 16,
                                border: '1px solid #27272a',
                                backgroundColor: '#09090b',
                                color: '#fafafa',
                            }}
                            labelStyle={{ color: '#a1a1aa' }}
                        />
                    </PieChart>
                </ResponsiveContainer>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-2 text-sm text-zinc-500 dark:text-zinc-400">
                {data.map((item) => (
                    <div
                        key={item.plan}
                        className="rounded-xl border border-zinc-200 px-3 py-2 text-center dark:border-zinc-800"
                    >
                        <p className="font-medium text-zinc-900 dark:text-zinc-100">{item.plan}</p>
                        <p>{item.value}%</p>
                    </div>
                ))}
            </div>
        </ChartCard>
    )
}