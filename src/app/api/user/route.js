import database from "@/app/config/mongo.database"
import ResponseHandler from "@/app/utils/responseHandler"
import { roleSchema } from "@/app/helper/type.schema"
import {
    findAllUsers,
    findByIdAndUpdate,
} from "@/app/models/repositories/user.repo"

// get all users - admin role
export async function GET() {
    try {
        // call database
        await database()

        // find current workday
        const foundUsers = await findAllUsers()
        if (!foundUsers) return ResponseHandler.NotFound("Users not found")

        return ResponseHandler.Success(foundUsers)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
// update role user - admin role
export async function PATCH(res) {
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = roleSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // update user
        const update = await findByIdAndUpdate(
            isValidation.data._id,
            isValidation.data
        )
        if (!update) return ResponseHandler.NotFound("User not exists !")

        return ResponseHandler.Success(update)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
