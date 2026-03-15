export async function mockDelay(delay = 400): Promise<void> {
    await new Promise((resolve) => {
        setTimeout(resolve, delay)
    })
}