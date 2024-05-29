import { cookies } from "next/headers"
import database from "@/app/config/mongo.database"
import bcrypt from "bcrypt"
import {
    createUser,
    findUserByEmail,
} from "@/app/models/repositories/user.repo"
import { createKey } from "@/app/models/repositories/key.repo"
import { signupSchema } from "@/app/utils/validate"
import { createSessionToken } from "@/app/utils/auth"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST(res) {
    // get body parameters request
    const bodyParams = await res.json()
    // validate params
    const isValidation = signupSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // check user exists
        const foundUser = await findUserByEmail(isValidation?.data.email)
        if (foundUser)
            return ResponseHandler.BadRequest("User already exists !")

        // create new user
        // const passwordHash = await bcrypt.hash(isValidation.data?.password, 10)
        const newUser = await createUser(isValidation?.data)
        if (!newUser) return ResponseHandler.Forbidden("Create failed !")

        // get token pair
        const { privateKey, sessionToken } = await createSessionToken({
            userId: newUser._id,
        })

        // store key
        const key = await createKey({ userId: newUser._id, privateKey })

        // set session token to cookie
        const cookieStore = cookies()
        cookieStore.set("id", newUser._id)
        cookieStore.set("sessionToken", sessionToken, {
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7d - milisecond
            httpOnly: true,
            sameSite: true,
        })

        return ResponseHandler.Success({
            fullname: newUser?.fullname,
            email: newUser?.email,
            expiredAt: key?.expiredAt,
        })
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
