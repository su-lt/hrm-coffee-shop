import database from "@/app/config/mongo.database"
import { cookies } from "next/headers"
import { getDistance } from "geolib"
import { findUserWithPopulateById } from "@/app/models/repositories/user.repo"
import {
    checkIn,
    findCurrentWorkdayByUserId,
} from "@/app/models/repositories/workday.repo"
import { checkInSchema } from "@/app/helper/type.schema"
import ResponseHandler from "@/app/utils/responseHandler"

export async function POST(res) {
    // get user in cookies
    const userId = cookies().get("i")
    // get body parameters request
    const bodyParams = await res.json()

    // validate params
    const isValidation = checkInSchema.safeParse(bodyParams)
    if (!isValidation.success)
        return ResponseHandler.BadRequest(isValidation.error.errors)

    try {
        // call database
        await database()

        // check user exists
        // const foundUser = await findUserById(bodyParams.userId)
        const foundUser = await findUserWithPopulateById(userId.value)
        if (!foundUser) return ResponseHandler.NotFound("User not exists !")

        // get distance between user and branch location
        const distance = getDistance(
            bodyParams.location,
            foundUser.branch?.location
        )
        if (distance > foundUser.branch?.maxDistance)
            // too far away from branch location
            return ResponseHandler.Forbidden("you are too far company !")

        // check in record
        const foundCheckIn = await findCurrentWorkdayByUserId(userId.value)
        // check in only once time
        if (foundCheckIn)
            return ResponseHandler.Forbidden("Can't check in again !")

        // check in record
        const result = await checkIn(userId.value)
        if (!result) return ResponseHandler.Forbidden("Check in failed !")

        return ResponseHandler.Success(result)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
