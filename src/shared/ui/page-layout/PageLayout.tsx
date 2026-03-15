// Общий layout: sidebar, header, content area

import type { PropsWithChildren } from 'react'
import { AppHeader } from '../../../widgets/app-header/ui/AppHeader'
import { AppSidebar } from '../../../widgets/app-sidebar/ui/AppSidebar'

export function PageLayout({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen bg-zinc-50 text-zinc-900">
            <div className="flex min-h-screen">
                <AppSidebar />

                <div className="flex min-w-0 flex-1 flex-col">
                    <AppHeader />

                    <main className="flex-1 p-6">
                        {children}
                    </main>
                </div>
            </div>
        </div>
    )
}