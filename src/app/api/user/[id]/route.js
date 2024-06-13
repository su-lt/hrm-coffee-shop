import database from "@/app/config/mongo.database"
import { findUserById } from "@/app/models/repositories/user.repo"
import { branchSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"
import { isObjectId } from "@/app/helper"

// get the user by id
export async function GET(_, context) {
    // get user id
    const { id } = context.params
    if (!id) return ResponseHandler.BadRequest("Invalid id")

    if (!isObjectId(id)) return ResponseHandler.BadRequest("Invalid id")

    try {
        // call database
        await database()

        // find current workday
        const foundUser = await findUserById(id)

        if (!foundUser) return ResponseHandler.NotFound("User not found")

        return ResponseHandler.Success(foundUser)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}

// update user role by id
export async function PATCH(res, context) {
    // get user id
    const { id } = context.params
    if (!id) return ResponseHandler.BadRequest("Invalid id")

    // get body parameters request
    const bodyParams = await res.json()
    // validate params
    const isValidation = branchSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    if (id !== isValidation.data._id)
        return ResponseHandler.BadRequest("invalid id")

    try {
        // call database
        await database()

        // find current workday
        const update = await findBranchAndUpdateById(
            isValidation.data._id,
            isValidation.data
        )
        if (!update) return ResponseHandler.NotFound("Branch not found")

        return ResponseHandler.Success(update)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
