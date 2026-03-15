import { create } from 'zustand'
import type { CustomerSortField, SortDirection } from './types'

interface CustomerSortingState {
    field: CustomerSortField
    direction: SortDirection
    setSorting: (field: CustomerSortField) => void
}

export const useCustomerSortingStore = create<CustomerSortingState>((set, get) => ({
    field: 'joinedAt',
    direction: 'desc',

    setSorting: (field) => {
        const current = get()

        if (current.field === field) {
            set({
                field,
                direction: current.direction === 'asc' ? 'desc' : 'asc',
            })
            return
        }

        set({
            field,
            direction: 'asc',
        })
    },
}))
