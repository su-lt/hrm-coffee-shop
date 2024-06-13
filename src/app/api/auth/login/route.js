import database from "@/app/config/mongo.database"
import { cookies } from "next/headers"
import { findUserByEmail } from "@/app/models/repositories/user.repo"
import { loginSchema } from "@/app/helper/type.schema"
import { createSessionToken } from "@/app/utils/auth"
import { createKey } from "@/app/models/repositories/key.repo"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST(res) {
    // get body parameters request
    // { email, password }
    const bodyParams = await res.json()
    // validate params
    const isValidation = loginSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // check user exists
        const foundUser = await findUserByEmail(isValidation?.data.email)
        if (!foundUser) return ResponseHandler.NotFound("User not found !")

        // check match password
        const match = await foundUser.comparePassword(
            isValidation?.data.password
        )
        if (!match)
            return ResponseHandler.Forbidden("Invalid username or password !")

        // get token pair
        const { privateKey, sessionToken } = await createSessionToken({
            userId: foundUser._id,
        })

        // store key
        const key = await createKey({ userId: foundUser._id, privateKey })

        // set session token to cookie
        const cookieStore = cookies()
        cookieStore.set("i", foundUser._id, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d - milisecond
            httpOnly: true,
            sameSite: true,
        })
        cookieStore.set("t", sessionToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d - milisecond
            httpOnly: true,
            sameSite: true,
        })

        return ResponseHandler.Success({
            fullname: foundUser?.fullname,
            email: foundUser?.email,
            expiredAt: key?.expiredAt,
        })
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
