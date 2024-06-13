// "use client"

import Link from "next/link"
// import { resolveResponse } from "@/app/helper"
import { useRouter } from "next/navigation"
// import { useAuthContext } from "@/contexts/AuthContext"

const AdminDashboard = () => {
    // const router = useRouter()
    // get role in auth context
    // const { role } = useAuthContext()

    return (
        <div className="md:max-w-[500px] p-4 grid grid-cols-3 justify-items-center gap-5">
            <div className="border w-20 h-20 rounded-full flex items-center">
                <Link href="/dashboard/admin/shop" className="w-20 text-center">
                    Thông tin cửa hàng
                </Link>
            </div>
            <div className="border w-20 h-20 rounded-full flex items-center">
                <Link
                    href="/dashboard/admin/branch"
                    className="w-20 text-center"
                >
                    Quản lý chi nhánh
                </Link>
            </div>
            <div className="border w-20 h-20 rounded-full flex items-center">
                <Link href="/dashboard/admin/role" className="w-20 text-center">
                    Phân quyền nhân sự
                </Link>
            </div>
        </div>
    )
}

export default AdminDashboard
