"use client"

import Link from "next/link"
import { resolveResponse } from "../helper"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/contexts/AuthContext"

const Dashboard = () => {
    const router = useRouter()
    // get role in auth context
    const { role } = useAuthContext()

    const handleLogout = async () => {
        const response = await fetch("/api/auth/logout", {
            method: "POST",
        })
        const { error, result } = await resolveResponse(response)
        if (error) console.log("Logout error: " + result?.metadata)

        if (!error) {
            router.replace("/")
            // refresh the current route
            router.refresh()
        }
    }

    return (
        <>
            {!role && <div>loading ...</div>}
            {role && (
                <div className="md:max-w-[500px] p-4 grid grid-cols-3 justify-items-center gap-5">
                    {["admin"].includes(role) && (
                        <div className="border w-20 h-20 rounded-full flex items-center">
                            <Link
                                href="/dashboard/admin"
                                className="w-20 text-center"
                            >
                                Quản lý cửa hàng
                            </Link>
                        </div>
                    )}
                    {["manager", "admin"].includes(role) && (
                        <div className="border w-20 h-20 rounded-full flex items-center">
                            <Link
                                href="/dashboard/manager"
                                className="w-20 text-center"
                            >
                                Quản lý nhân sự
                            </Link>
                        </div>
                    )}

                    <div className="border w-20 h-20 rounded-full flex items-center">
                        <Link
                            href="/dashboard/profile"
                            className="w-20 text-center"
                        >
                            Thông tin cá nhân
                        </Link>
                    </div>

                    {["employee"].includes(role) && (
                        <div className="border w-20 h-20 rounded-full flex items-center">
                            <Link
                                href="/dashboard/timekeeping"
                                className="w-20 text-center"
                            >
                                Điểm danh
                            </Link>
                        </div>
                    )}
                    <div className="border w-20 h-20 rounded-full flex items-center">
                        <button
                            onClick={handleLogout}
                            className="w-20 text-center"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Dashboard
