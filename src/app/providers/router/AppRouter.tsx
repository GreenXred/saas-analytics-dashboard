// Все маршруты приложения

import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CustomersPage } from '../../../pages/customers/ui/CustomersPage'
import { DashboardPage } from '../../../pages/dashboard/ui/DashboardPage'
import { NotFoundPage } from '../../../pages/not-found/ui/NotFoundPage'
import { ReportsPage } from '../../../pages/reports/ui/ReportsPage'
import { SettingsPage } from '../../../pages/settings/ui/SettingsPage'
import { routes } from '../../../shared/config/routes'
import { PageLayout } from '../../../shared/ui/page-layout/PageLayout'

export function AppRouter() {
    return (
        <BrowserRouter>
            <PageLayout>
                <Routes>
                    <Route path={routes.dashboard} element={<DashboardPage />} />
                    <Route path={routes.customers} element={<CustomersPage />} />
                    <Route path={routes.reports} element={<ReportsPage />} />
                    <Route path={routes.settings} element={<SettingsPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </PageLayout>
        </BrowserRouter>
    )
}