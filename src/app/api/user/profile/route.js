import database from "@/app/config/mongo.database"
import ResponseHandler from "@/app/utils/responseHandler"
import { cookies } from "next/headers"
import { findUserById } from "@/app/models/repositories/user.repo"

export async function GET() {
    // get user in cookies
    const userId = cookies().get("i")

    try {
        // call database
        await database()

        // find current workday
        const foundUser = await findUserById(userId.value)
        if (!foundUser) return ResponseHandler.NotFound("User not found")

        return ResponseHandler.Success(foundUser)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
