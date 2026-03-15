// Базовый helper для Tailwind-классов
// Почти в каждом UI-компоненте потом будет что-то вроде: базовые классы, условные классы, внешние className

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs))
}