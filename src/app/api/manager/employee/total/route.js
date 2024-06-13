import database from "@/app/config/mongo.database"
import ResponseHandler from "@/app/utils/responseHandler"
import { getTotalEmployee } from "@/app/models/repositories/user.repo"

// get total employee
export async function GET() {
    try {
        // call database
        await database()

        // find current workday
        const totalCount = await getTotalEmployee()
        if (!totalCount) return ResponseHandler.Forbidden("access denied")

        return ResponseHandler.Success(totalCount)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
