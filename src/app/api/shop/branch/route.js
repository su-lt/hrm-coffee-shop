import database from "@/app/config/mongo.database"
import {
    createBranch,
    findShop,
    getAllBranches,
} from "@/app/models/repositories/shop.repo"
import { branchSchema } from "@/app/utils/validate"
import ResponseHandle from "@/app/utils/responseHandle"

export async function POST(res) {
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = branchSchema.safeParse(bodyParams)

    if (!isValidation.success)
        return ResponseHandle.BadRequest(isValidation.error.errors)

    // call database
    await database()

    // found shop
    const foundShop = await findShop()

    // create new branch
    const newBranch = await createBranch({
        ...bodyParams,
        shopId: foundShop._id,
    })
    if (!newBranch) return ResponseHandle.Forbidden("Create failed !")

    return ResponseHandle.Success(newBranch)
}

export async function GET() {
    await database()
    const branches = await getAllBranches()
    if (!branches) return ResponseHandle.Forbidden("No branches found")

    return ResponseHandle.Success(branches)
}
