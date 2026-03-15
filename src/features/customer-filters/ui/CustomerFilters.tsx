import type {
    CustomerPlan,
    CustomerStatus,
} from '../../../entities/customer/model/types'
import { Button } from '../../../shared/ui/button/Button'
import { Card, CardContent } from '../../../shared/ui/card/Card'
import { useCustomerFiltersStore } from '../model/store'

const STATUS_OPTIONS: Array<{ label: string; value: CustomerStatus | 'all' }> = [
    { label: 'All statuses', value: 'all' },
    { label: 'Active', value: 'active' },
    { label: 'Trial', value: 'trial' },
    { label: 'Churned', value: 'churned' },
]

const PLAN_OPTIONS: Array<{ label: string; value: CustomerPlan | 'all' }> = [
    { label: 'All plans', value: 'all' },
    { label: 'Starter', value: 'Starter' },
    { label: 'Pro', value: 'Pro' },
    { label: 'Enterprise', value: 'Enterprise' },
]

export function CustomerFilters() {
    const status = useCustomerFiltersStore((state) => state.status)
    const plan = useCustomerFiltersStore((state) => state.plan)
    const setStatus = useCustomerFiltersStore((state) => state.setStatus)
    const setPlan = useCustomerFiltersStore((state) => state.setPlan)
    const resetFilters = useCustomerFiltersStore((state) => state.resetFilters)

    return (
        <Card>
            <CardContent className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <label className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Status
                        </span>

                        <select
                            value={status}
                            onChange={(event) => setStatus(event.target.value as CustomerStatus | 'all')}
                            className="h-10 min-w-[170px] rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                        >
                            {STATUS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>

                    <label className="flex flex-col gap-1">
                        <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                            Plan
                        </span>

                        <select
                            value={plan}
                            onChange={(event) => setPlan(event.target.value as CustomerPlan | 'all')}
                            className="h-10 min-w-[170px] rounded-xl border border-zinc-200 bg-white px-3 text-sm text-zinc-900 outline-none transition focus:border-zinc-400 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-100 dark:focus:border-zinc-600"
                        >
                            {PLAN_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </label>
                </div>

                <Button variant="secondary" onClick={resetFilters}>
                    Reset filters
                </Button>
            </CardContent>
        </Card>
    )
}