import type { PropsWithChildren, ReactNode } from 'react'
import { cn } from '../../lib/cn'

interface PageHeaderProps extends PropsWithChildren {
    title: string
    description?: string
    actions?: ReactNode
    className?: string
}

export function PageHeader({
    title,
    description,
    actions,
    className,
}: PageHeaderProps) {
    return (
        <div
            className={cn(
                'flex flex-col gap-4 md:flex-row md:items-start md:justify-between',
                className
            )}
        >
            <div className="space-y-1">
                <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
                    {title}
                </h1>
                {description ? (
                    <p className="text-sm text-zinc-500">{description}</p>
                ) : null}
            </div>

            {actions ? <div className="flex items-center gap-2">{actions}</div> : null}
        </div>
    )
}
