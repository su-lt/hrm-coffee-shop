import database from "@/app/config/mongo.database"
import { NextRequest } from "next/server"
import { findShop } from "@/app/models/repositories/shop.repo"
import ResponseHandle from "@/app/utils/responseHandler"
import { headers } from "next/headers"

export async function GET() {
    await database()
    const shop = await findShop()
    console.log(">>>>>>>", headers().get("x-user-id"))

    return ResponseHandle.Success(shop)
}
