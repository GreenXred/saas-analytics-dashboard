import type { ButtonHTMLAttributes } from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../../lib/cn'

const buttonVariants = cva(
    'inline-flex items-center justify-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
    {
        variants: {
            variant: {
                primary: 'bg-zinc-900 text-white hover:bg-zinc-800',
                secondary: 'border border-zinc-200 bg-white text-zinc-900 hover:bg-zinc-100',
                ghost: 'bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900',
            },
            size: {
                sm: 'h-9 px-3',
                md: 'h-10 px-4',
                lg: 'h-11 px-5',
            },
        },
        defaultVariants: {
            variant: 'primary',
            size: 'md',
        },
    }
)

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
    VariantProps<typeof buttonVariants>

export function Button({
    className,
    variant,
    size,
    type = 'button',
    ...props
}: ButtonProps) {
    return (
        <button
            type={type}
            className={cn(buttonVariants({ variant, size }), className)}
            {...props}
        />
    )
}