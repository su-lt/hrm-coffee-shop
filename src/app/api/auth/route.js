import database from "@/app/config/mongo.database"
import { headers } from "next/headers"
import { findKeyByUserId } from "@/app/models/repositories/key.repo"
import { findUserById } from "@/app/models/repositories/user.repo"
import { verifySessionKey } from "@/app/utils//auth"
import ResponseHandler from "@/app/utils/responseHandler"

export async function GET() {
    // get authorization in headers
    const authorization = headers().get("authorization")
    const id = headers().get("id")

    // check null
    if (!authorization || !id)
        return ResponseHandler.Forbidden("Invalid Authorization !")

    try {
        // connect to database
        await database()

        // check user exist
        const foundUser = await findUserById(id)
        if (!foundUser)
            return ResponseHandler.Forbidden("Invalid Authorization !")

        // check key store exists
        const keyStoreUser = await findKeyByUserId(id)
        if (!keyStoreUser)
            return ResponseHandler.Forbidden("Invalid Authorization !")

        // verify token
        const payload = await verifySessionKey(
            authorization,
            keyStoreUser.privateKey
        )
        if (payload.userId !== id)
            return ResponseHandler.Forbidden("Invalid Authorization !")

        return ResponseHandler.Success({
            userId: foundUser._id,
            role: foundUser.role,
        })
    } catch (error) {
        console.log(error)
        return ResponseHandler.ServerError()
    }
}
