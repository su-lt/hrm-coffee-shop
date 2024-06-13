import database from "@/app/config/mongo.database"
import { cookies } from "next/headers"
import { removeKeyByUserId } from "@/app/models/repositories/key.repo"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST() {
    // get user in cookies
    const userId = cookies().get("i")

    try {
        // call database
        await database()

        // delete key stored
        const { deletedCount } = await removeKeyByUserId(userId.value)
        // delete failed
        if (deletedCount === 0)
            return ResponseHandler.Forbidden("logout failed !")

        // clean up cookie
        cookies().delete("i")
        cookies().delete("t")
        cookies().delete("u")

        return ResponseHandler.Success("logout successfully")
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
