import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

type CardProps = HTMLAttributes<HTMLDivElement>

export function Card({ className, ...props }: CardProps) {
    return (
        <div
            className={cn(
                'rounded-2xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-950',
                className
            )}
            {...props}
        />
    )
}

export function CardHeader({ className, ...props }: CardProps) {
    return (
        <div
            className={cn('flex items-start justify-between gap-4 p-6 pb-0', className)}
            {...props}
        />
    )
}

export function CardContent({ className, ...props }: CardProps) {
    return <div className={cn('p-6', className)} {...props} />
}

export function CardTitle({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-50',
                className
            )}
            {...props}
        />
    )
}

export function CardDescription({
    className,
    ...props
}: HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-sm text-zinc-500 dark:text-zinc-400', className)}
            {...props}
        />
    )
}