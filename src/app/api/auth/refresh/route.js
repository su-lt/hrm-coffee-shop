import { cookies } from "next/headers"
import database from "@/app/config/mongo.database"
import bcrypt from "bcrypt"
import { findUserByEmail } from "@/app/models/repositories/user.repo"
import { loginSchema } from "@/app/utils/validate"
import { createSessionToken, verifySessionKey } from "@/app/utils/auth"
import { createKey } from "@/app/models/repositories/key.repo"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST(res) {
    // check cookies
    const cookieStore = cookies()
    //
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

        // match password
        const match = await bcrypt.compare(
            isValidation?.data.password,
            foundUser.password
        )
        if (!match) return ResponseHandler.Forbidden("Authentication failed !")

        // get token pair
        const { privateKey, sessionToken } = await createSessionToken({
            userId: foundUser._id,
        })

        // store key
        const key = await createKey({ userId: foundUser._id, privateKey })

        // set session token to cookie
        cookieStore.set("id", foundUser._id)
        cookieStore.set("sessionToken", sessionToken, {
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
