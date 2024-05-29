import { cookies } from "next/headers"

export const checkAuthentication = async () => {
    // get cookies store
    const cookieStore = cookies()
    // get session token
    const sessionToken = cookieStore.get("sessionToken")
    // get user id
    const id = cookieStore.get("id")

    // if not exist return error
    if (!sessionToken || !id) return { error: true, result: null }

    // get server url
    const baseUrl = process.env.SERVER_URL
    const response = await fetch(`${baseUrl}/api/auth/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            authorization: sessionToken.value,
            id: id.value,
        },
    })
    if (!response.ok) {
        return { error: true, result: null }
    }

    return { error: null, result: await response.json() }
}
