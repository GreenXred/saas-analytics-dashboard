export type DateRange = '7d' | '30d' | '90d' | '12m'
export type Segment = 'all' | 'sales' | 'marketing' | 'product'

export interface AnalyticsQueryParams {
    dateRange: DateRange
    segment: Segment
}

export interface DashboardSummary {
    mrr: number
    arr: number
    activeUsers: number
    churnRate: number
    mrrChange: number
    arrChange: number
    activeUsersChange: number
    churnRateChange: number
}

export interface RevenuePoint {
    month: string
    current: number
    previous: number
}

export interface RetentionPoint {
    period: string
    retention: number
}

export interface PlanDistributionItem {
    plan: 'Starter' | 'Pro' | 'Enterprise'
    value: number
}
