import type { PropsWithChildren, ReactNode } from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '../card/Card'

interface ChartCardProps extends PropsWithChildren {
    title: string
    description?: string
    action?: ReactNode
}

export function ChartCard({
    title,
    description,
    action,
    children,
}: ChartCardProps) {
    return (
        <Card className="h-full">
            <CardHeader>
                <div className="space-y-1">
                    <CardTitle>{title}</CardTitle>
                    {description ? <CardDescription>{description}</CardDescription> : null}
                </div>

                {action ? <div>{action}</div> : null}
            </CardHeader>

            <CardContent>{children}</CardContent>
        </Card>
    )
}
