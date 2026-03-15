import { retentionSeriesMock } from '../../../shared/api/mock/retentionSeries'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { RetentionPoint } from '../model/types'

export async function getRetentionSeries(): Promise<RetentionPoint[]> {
    await mockDelay()
    return retentionSeriesMock
}
