import { PageHeader } from '../../../shared/ui/page-header/PageHeader'
import { CustomerFilters } from '../../../features/customer-filters/ui/CustomerFilters'
import { CustomerSearch } from '../../../features/customer-filters/ui/CustomerSearch'
import { CustomersListTable } from '../../../widgets/customers-list/ui/CustomersListTable'

export function CustomersPage() {
    return (
        <section className="space-y-6">
            <PageHeader
                title="Customers"
                description="View customer accounts, subscription plans, and activity."
            />

            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <CustomerSearch />
            </div>

            <CustomerFilters />

            <CustomersListTable />
        </section>
    )
}