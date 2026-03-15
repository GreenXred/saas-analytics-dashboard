import { PageHeader } from '../../../shared/ui/page-header/PageHeader'

export function CustomersPage() {
    return (
        <section className="space-y-6">
            <PageHeader
                title="Customers"
                description="View customer accounts, plans, and recent activity."
            />

            <div className="rounded-2xl border border-dashed border-zinc-300 bg-white p-8 text-sm text-zinc-500">
                Customers table placeholder
            </div>
        </section>
    )
}