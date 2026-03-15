export type DateRange = '3m' | '6m' | '12m'
export type Segment = 'all' | 'free' | 'pro' | 'enterprise'

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