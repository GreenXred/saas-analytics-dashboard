import { customersMock } from '../../../shared/api/mock/customers'
import { mockDelay } from '../../../shared/api/mockDelay'
import type { Customer } from '../model/types'

export async function getCustomers(): Promise<Customer[]> {
    await mockDelay()
    return customersMock
}
