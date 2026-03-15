import { create } from 'zustand'
import type { DashboardFilters } from './types'

interface DashboardFiltersState extends DashboardFilters {
    setDateRange: (dateRange: DashboardFilters['dateRange']) => void
    setSegment: (segment: DashboardFilters['segment']) => void
    setFilters: (filters: DashboardFilters) => void
}

export const useDashboardFiltersStore = create<DashboardFiltersState>((set) => ({
    dateRange: '12m',
    segment: 'all',

    setDateRange: (dateRange) => set({ dateRange }),
    setSegment: (segment) => set({ segment }),
    setFilters: (filters) => set(filters),
}))