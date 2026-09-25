export function generateTempId(): string {
    return `temp:${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`
}