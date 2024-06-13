import database from "@/app/config/mongo.database"
import {
    createBranch,
    findShop,
    getAllBranches,
} from "@/app/models/repositories/shop.repo"
import { branchSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST(res) {
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = branchSchema.safeParse(bodyParams)

    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    // call database
    await database()

    // found shop
    const foundShop = await findShop()

    // create new branch
    const newBranch = await createBranch({
        ...bodyParams,
        shopId: foundShop._id,
    })
    if (!newBranch) return ResponseHandler.Forbidden("Create failed !")

    return ResponseHandler.Success(newBranch)
}

export async function GET() {
    try {
        // call database
        await database()

        // get branches
        const branches = await getAllBranches()
        if (!branches) return ResponseHandler.NotFound("No branches found")

        return ResponseHandler.Success(branches)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
