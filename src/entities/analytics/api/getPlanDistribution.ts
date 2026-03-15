import { planDistributionMock } from '../../../shared/api/mock/planDistribution'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { PlanDistributionItem } from '../model/types'

export async function getPlanDistribution(): Promise<PlanDistributionItem[]> {
    await mockDelay()
    return planDistributionMock
}
