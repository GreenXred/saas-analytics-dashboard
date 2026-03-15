import { TrendingDown, TrendingUp } from 'lucide-react'
import { Badge } from '../badge/Badge'
import { Card, CardContent } from '../card/Card'

interface StatCardProps {
    label: string
    value: string
    changeText: string
    trend: 'up' | 'down'
}

export function StatCard({ label, value, changeText, trend }: StatCardProps) {
    const isPositive = trend === 'up'

    return (
        <Card className="bg-white dark:bg-zinc-950">
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                        {label}
                    </p>

                    <Badge variant={isPositive ? 'success' : 'danger'}>
                        <span className="flex items-center gap-1">
                            {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                            {changeText}
                        </span>
                    </Badge>
                </div>

                <div>
                    <p className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                        {value}
                    </p>
                </div>
            </CardContent>
        </Card>
    )
}