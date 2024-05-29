import { NextResponse } from "next/server"
import database from "@/app/config/mongo.database"
import {
    findAllWorkdayByUserId,
    checkIn,
} from "@/app/models/repositories/workday.repo"

export async function GET() {
    await database()
    const workday = await findAllWorkdayByUserId("664caa87d87d044cc0ca112c")

    return NextResponse.json(workday, { status: 200 })
}

export async function POST(res) {
    await database()
    const { id } = await res.json()
    console.log("id:", id)
    const workday = await checkIn(id)

    return NextResponse.json(workday, { status: 200 })
}
