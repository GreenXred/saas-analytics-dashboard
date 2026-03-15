import { dashboardSummaryMock } from '../../../shared/api/mock/dashboardSummary'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { DashboardSummary } from '../model/types'

export async function getDashboardSummary(): Promise<DashboardSummary> {
    await mockDelay()
    return dashboardSummaryMock
}
