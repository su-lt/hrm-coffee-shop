import database from "@/app/config/mongo.database"
import { cookies } from "next/headers"
import { findByIdAndUpdate } from "@/app/models/repositories/user.repo"
import { profileSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"

export async function PATCH(res) {
    // get user in cookies
    const userId = cookies().get("i")
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = profileSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // update user
        const update = await findByIdAndUpdate(userId.value, isValidation.data)
        if (!update) return ResponseHandler.NotFound("User not exists !")

        return ResponseHandler.Success(update)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
