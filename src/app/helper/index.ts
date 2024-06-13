import { Types } from "mongoose"

export const isObjectId = (id: string) => {
    return Types.ObjectId.isValid(id)
}

export const resolveResponse = async (response: Response) => {
    const result = await response.json()
    if (!response.ok) {
        return { error: response.status, result }
    }

    return { error: null, result }
}

export const formatTime = (now: Date) => {
    if (!now) return ""

    const hours = `0${now.getHours()}`.slice(-2)
    const minutes = `0${now.getMinutes()}`.slice(-2)
    const seconds = `0${now.getSeconds()}`.slice(-2)

    return `${hours}:${minutes}:${seconds}`
}

export const formatDate = (now: Date) => {
    if (!now) return ""

    const days = `0${now.getDate()}`.slice(-2)
    const months = `0${now.getMonth() + 1}`.slice(-2)
    const years = now.getFullYear()

    return `${days}/${months}/${years}`
}

export const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
