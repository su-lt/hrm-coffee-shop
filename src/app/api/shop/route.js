import database from "@/app/config/mongo.database"
import {
    findShop,
    findShopAndUpdate,
} from "@/app/models/repositories/shop.repo"
import { shopSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"

export async function GET() {
    try {
        // call database
        await database()

        // get shop
        const shop = await findShop()
        if (!shop) return ResponseHandler.NotFound("shop not found")

        return ResponseHandler.Success(shop)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}

export async function PATCH(res) {
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = shopSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // update shop
        const update = await findShopAndUpdate(isValidation?.data)

        // return update successfully
        return ResponseHandler.Success(update)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
