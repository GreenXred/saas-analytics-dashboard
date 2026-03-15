import type { AnalyticsQueryParams } from './types'

export const analyticsQueryKeys = {
    all: ['analytics'] as const,
    summary: (params: AnalyticsQueryParams) =>
        ['analytics', 'summary', params] as const,
    revenue: (params: AnalyticsQueryParams) =>
        ['analytics', 'revenue', params] as const,
    retention: (params: AnalyticsQueryParams) =>
        ['analytics', 'retention', params] as const,
    planDistribution: (params: AnalyticsQueryParams) =>
        ['analytics', 'plan-distribution', params] as const,
}
