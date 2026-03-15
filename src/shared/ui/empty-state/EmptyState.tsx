import { Inbox } from 'lucide-react'
import { cn } from '../../lib/cn'

interface EmptyStateProps {
    title?: string
    description?: string
    className?: string
}

export function EmptyState({
    title = 'No data available',
    description = 'There is nothing to display right now.',
    className,
}: EmptyStateProps) {
    return (
        <div
            className={cn(
                'flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 px-6 py-8 text-center dark:border-zinc-800 dark:bg-zinc-900',
                className
            )}
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-zinc-200 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-300">
                <Inbox size={18} />
            </div>

            <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                {title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-zinc-500 dark:text-zinc-400">
                {description}
            </p>
        </div>
    )
}