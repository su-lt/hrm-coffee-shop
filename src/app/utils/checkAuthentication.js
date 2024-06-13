import { cookies } from "next/headers"
import { resolveResponse } from "../helper"

export const checkAuthentication = async () => {
    // get session token
    const sessionToken = cookies().get("t")
    // get user id
    const id = cookies().get("i")

    // if not exist return error
    if (!sessionToken || !id) return { error: true, result: null }

    // get server url
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
    const response = await fetch(`${baseUrl}/api/auth/`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            authorization: sessionToken.value,
            id: id.value,
        },
    })
    const { error, result } = await resolveResponse(response)

    return { error, result }
}
