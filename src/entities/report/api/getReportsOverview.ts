import { reportsOverviewMock } from '../../../shared/api/mock/reportsOverview'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { ReportsOverview } from '../model/types'

export async function getReportsOverview(): Promise<ReportsOverview> {
    await mockDelay()
    return reportsOverviewMock
}
