interface RequestOptions extends RequestInit {
    params?: Record<string, string | number | boolean | undefined>
}

function buildUrl(url: string, params?: RequestOptions['params']): string {
    if (!params) {
        return url
    }

    const searchParams = new URLSearchParams()

    Object.entries(params).forEach(([key, value]) => {
        if (value === undefined) {
            return
        }

        searchParams.set(key, String(value))
    })

    const queryString = searchParams.toString()

    if (!queryString) {
        return url
    }

    return `${url}?${queryString}`
}

export class ApiError extends Error {
    status: number

    constructor(message: string, status: number) {
        super(message)
        this.name = 'ApiError'
        this.status = status
    }
}

export async function apiClient<T>(
    url: string,
    options: RequestOptions = {}
): Promise<T> {
    const { params, headers, body, ...restOptions } = options

    const response = await fetch(buildUrl(url, params), {
        ...restOptions,
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
        body,
    })

    if (!response.ok) {
        throw new ApiError(`Request failed with status ${response.status}`, response.status)
    }

    return response.json() as Promise<T>
}
