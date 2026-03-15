export type CustomerPlan = 'Starter' | 'Pro' | 'Enterprise'
export type CustomerStatus = 'active' | 'trial' | 'churned'

export interface Customer {
    id: string
    name: string
    email: string
    company: string
    plan: CustomerPlan
    status: CustomerStatus
    mrr: number
    joinedAt: string
    lastActiveAt: string
}
