import database from "@/app/config/mongo.database"
import { cookies } from "next/headers"
import { findUserById } from "@/app/models/repositories/user.repo"
import { updatePasswordSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"

export async function PATCH(res) {
    // get user in cookies
    const userId = cookies().get("i")
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = updatePasswordSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // check user exists
        const foundUser = await findUserById(userId.value)
        if (!foundUser) return ResponseHandler.NotFound("User not found !")

        // check match password
        const match = await foundUser.comparePassword(
            isValidation?.data.currentPassword
        )
        if (!match) return ResponseHandler.Forbidden("Invalid password !")

        // update password user
        foundUser.password = isValidation.data?.password
        await foundUser.save()

        return ResponseHandler.Success("updated password successfully")
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
