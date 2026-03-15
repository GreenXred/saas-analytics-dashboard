import type { ReportsOverview } from '../../../entities/report/model/types'

export const reportsOverviewMock: ReportsOverview = {
    totalReports: 24,
    exportsCount: 182,
    conversionRate: 14.8,
    funnel: [
        { label: 'Visitors', value: 48200 },
        { label: 'Sign-ups', value: 8400 },
        { label: 'Trials', value: 2140 },
        { label: 'Paid', value: 710 },
    ],
}
