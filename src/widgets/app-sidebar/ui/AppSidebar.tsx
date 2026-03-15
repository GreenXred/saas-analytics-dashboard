import { BarChart3, FileText, LayoutDashboard, Settings, Users } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { routes } from '../../../shared/config/routes'
import { cn } from '../../../shared/lib/cn'

const navigation = [
    {
        label: 'Dashboard',
        to: routes.dashboard,
        icon: LayoutDashboard,
    },
    {
        label: 'Customers',
        to: routes.customers,
        icon: Users,
    },
    {
        label: 'Reports',
        to: routes.reports,
        icon: FileText,
    },
    {
        label: 'Settings',
        to: routes.settings,
        icon: Settings,
    },
]

export function AppSidebar() {
    return (
        <aside className="sticky top-0 h-screen w-64 shrink-0 border-r border-zinc-200 bg-white px-4 py-6 dark:border-zinc-800 dark:bg-zinc-950">
            <div className="flex h-full flex-col">
                <div className="mb-8 flex items-center gap-3 px-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900">
                        <BarChart3 size={20} />
                    </div>

                    <div>
                        <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                            Analytics
                        </p>
                        <h2 className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                            SaaS Board
                        </h2>
                    </div>
                </div>

                <nav className="flex flex-col gap-1">
                    {navigation.map((item) => {
                        const Icon = item.icon

                        return (
                            <NavLink
                                key={item.to}
                                to={item.to}
                                className={({ isActive }) =>
                                    cn(
                                        'flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition',
                                        isActive
                                            ? 'bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900'
                                            : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                                    )
                                }
                            >
                                <Icon size={18} />
                                <span>{item.label}</span>
                            </NavLink>
                        )
                    })}
                </nav>
            </div>
        </aside>
    )
}