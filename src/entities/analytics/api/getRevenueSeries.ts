import { revenueSeriesMock } from '../../../shared/api/mock/revenueSeries'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { RevenuePoint } from '../model/types'

export async function getRevenueSeries(): Promise<RevenuePoint[]> {
    await mockDelay()
    return revenueSeriesMock
}
