import { CustomerFilters } from '../../../features/customer-filters/ui/CustomerFilters'
import { CustomerSearch } from '../../../features/customer-filters/ui/CustomerSearch'
import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { CustomersListTable } from '../../../widgets/customers-list/ui/CustomersListTable'
import { CustomersSummary } from '../../../widgets/customer-summary/ui/CustomersSummary'

export function CustomersPage() {
    return (
        <section className="space-y-6">
            <PageHeader
                title="Customers"
                description="View customer accounts, subscription plans, and activity."
            />

            <CustomersSummary />

            <div className="flex flex-col gap-4 xl:flex-row xl:items-end xl:justify-between">
                <CustomerSearch />
            </div>

            <CustomerFilters />

            <CustomersListTable />
        </section>
    )
}