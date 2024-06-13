import database from "@/app/config/mongo.database"
import { getDistance } from "geolib"
import { cookies } from "next/headers"
import { findUserWithPopulateById } from "@/app/models/repositories/user.repo"
import { findCurrentWorkdayByUserId } from "@/app/models/repositories/workday.repo"
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
        const workday = await findCurrentWorkdayByUserId(userId.value)
        if (!workday) return ResponseHandler.Forbidden("Check out failed !")

        // check out only once time
        if (workday.checkOutTime)
            return ResponseHandler.Forbidden("Can't check out again !")

        // get current time
        const checkOutTime = new Date()
        const checkOutDate = new Date(
            checkOutTime.getFullYear(),
            checkOutTime.getMonth(),
            checkOutTime.getDate()
        )
        const checkInDate = new Date(workday.date)
        const checkInTime = new Date(workday.checkInTime)

        // check out time must be larger than check in time
        if (checkOutTime < checkInTime)
            return ResponseHandler.Forbidden("check out failed !")

        // check out time must same date with check in time
        // one day in millis = 24 * 60 * 60 * 1000
        if (checkOutDate - checkInDate > 24 * 60 * 60 * 1000)
            return ResponseHandler.Forbidden("check out failed !")

        workday.checkOutTime = checkOutTime
        const result = await workday.save()

        return ResponseHandler.Success(result)
    } catch (error) {
        return ResponseHandler.ServerError()
    }
}
