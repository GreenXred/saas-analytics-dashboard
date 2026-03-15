import { AlertCircle } from 'lucide-react'
import { Button } from '../button/Button'
import { cn } from '../../lib/cn'

interface ErrorStateProps {
    title?: string
    description?: string
    actionLabel?: string
    onAction?: () => void
    className?: string
}

export function ErrorState({
    title = 'Something went wrong',
    description = 'An unexpected error occurred while loading data.',
    actionLabel,
    onAction,
    className,
}: ErrorStateProps) {
    return (
        <div
            className={cn(
                'flex min-h-[220px] flex-col items-center justify-center rounded-xl border border-rose-200 bg-rose-50 px-6 py-8 text-center dark:border-rose-950 dark:bg-rose-950/30',
                className
            )}
        >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/50 dark:text-rose-300">
                <AlertCircle size={18} />
            </div>

            <h3 className="text-base font-semibold text-rose-900 dark:text-rose-200">
                {title}
            </h3>
            <p className="mt-2 max-w-md text-sm text-rose-700 dark:text-rose-300">
                {description}
            </p>

            {actionLabel && onAction ? (
                <Button className="mt-4" variant="secondary" onClick={onAction}>
                    {actionLabel}
                </Button>
            ) : null}
        </div>
    )
}