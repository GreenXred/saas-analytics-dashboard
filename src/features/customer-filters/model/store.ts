import { create } from 'zustand'
import type { CustomerFilters } from './types'

interface CustomerFiltersState extends CustomerFilters {
    setSearch: (search: string) => void
    setStatus: (status: CustomerFilters['status']) => void
    setPlan: (plan: CustomerFilters['plan']) => void
    resetFilters: () => void
}

const initialState: CustomerFilters = {
    search: '',
    status: 'all',
    plan: 'all',
}

export const useCustomerFiltersStore = create<CustomerFiltersState>((set) => ({
    ...initialState,

    setSearch: (search) => set({ search }),
    setStatus: (status) => set({ status }),
    setPlan: (plan) => set({ plan }),
    resetFilters: () => set(initialState),
}))
