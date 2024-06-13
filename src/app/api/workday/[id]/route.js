import database from "@/app/config/mongo.database"
import { findCurrentWorkdayByUserId } from "@/app/models/repositories/workday.repo"
import ResponseHandler from "@/app/utils/responseHandler"

export async function GET(_, context) {
    // get user id
    const { id } = context.params
    try {
        // call database
        await database()

        // find current workday
        const workday = await findCurrentWorkdayByUserId(id)
        if (!workday) return ResponseHandler.NotFound("Workday not found")

        return ResponseHandler.Success(workday)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
