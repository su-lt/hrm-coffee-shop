import { NextResponse } from "next/server"
import database from "@/app/config/mongo.database"
import { findCurrentWorkdayByUserId } from "@/app/models/repositories/workday.repo"

export async function GET(res, context) {
    await database()
    const { id } = context.params
    const workday = await findCurrentWorkdayByUserId(id)

    return NextResponse.json(workday, { status: 404 })
}
