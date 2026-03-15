export interface FunnelStep {
    label: string
    value: number
}

export interface ReportsOverview {
    totalReports: number
    exportsCount: number
    conversionRate: number
    funnel: FunnelStep[]
}
