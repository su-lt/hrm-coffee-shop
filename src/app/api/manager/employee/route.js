import database from "@/app/config/mongo.database"
import ResponseHandler from "@/app/utils/responseHandler"
import { getAllEmployees } from "@/app/models/repositories/user.repo"

/**
 * Api for employee manager
 */

// get total employee
export async function GET() {
    try {
        // call database
        await database()

        // find current workday
        const employees = await getAllEmployees()
        if (!employees) return ResponseHandler.Forbidden("access denied")

        return ResponseHandler.Success(employees)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
