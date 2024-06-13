import database from "@/app/config/mongo.database"
import {
    getBranchById,
    findBranchAndUpdateById,
    findBranchAndDeleteById,
} from "@/app/models/repositories/shop.repo"
import { branchSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"
import { isObjectId } from "@/app/helper"

// get the branch by id
export async function GET(_, context) {
    // get user id
    const { id } = context.params
    if (!id) return ResponseHandler.BadRequest("Invalid id")

    try {
        // call database
        await database()

        // find current workday
        const branch = await getBranchById(id)
        if (!branch) return ResponseHandler.NotFound("Branch not found")

        return ResponseHandler.Success(branch)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}

// update branch by id
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

// delete branch by id
export async function DELETE(_, context) {
    // get user id
    const { id } = context.params
    if (!id) return ResponseHandler.BadRequest("Invalid id")

    // check valid id
    if (!isObjectId(id)) return ResponseHandler.BadRequest("Invalid id")

    try {
        // call database
        await database()

        // delete branch by id
        const deleteBranch = await findBranchAndDeleteById(id)
        if (!deleteBranch) return ResponseHandler.NotFound("Branch not found")

        return ResponseHandler.Success("delete successful")
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
