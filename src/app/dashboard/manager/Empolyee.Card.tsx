"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { MixerVerticalIcon } from "@radix-ui/react-icons"
import { useRouter, usePathname } from "next/navigation"

const getTotalEmployees = async () => {
    return await fetch("http://localhost:3000/api/manager/employee/total").then(
        (response) => response.json()
    )
}

const EmpolyeeDashboard = () => {
    // use state
    const [totalEmployee, setTotalEmployee] = useState(0)
    const [totalNewEmployee, setTotalNewEmployee] = useState(0)
    // navigation
    const router = useRouter()
    const pathName = usePathname()

    useEffect(() => {
        getTotalEmployees()
            // .then((res) => res.json())
            .then((data) => {
                setTotalEmployee(data.metadata.totalEmployee)
                setTotalNewEmployee(data.metadata.totalNewEmployee)
            })
    }, [])

    return (
        totalEmployee > 0 && (
            <Card>
                <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2">
                            {/* icon person */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                className="h-4 w-4 text-muted-foreground"
                            >
                                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                                <circle cx="9" cy="7" r="4"></circle>
                                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"></path>
                            </svg>
                            <CardTitle>Nhân sự</CardTitle>
                        </div>
                        <div
                            className="flex gap-2 items-center cursor-pointer"
                            onClick={() => router.push(`${pathName}/employee`)}
                        >
                            <MixerVerticalIcon />
                            <p>Chi tiết</p>
                        </div>
                    </div>

                    <div className="pt-4 flex justify-between">
                        <div>Tổng số nhân viên</div>
                        <div>{totalEmployee} người</div>
                    </div>
                    {totalNewEmployee > 0 && (
                        <div className="flex justify-between text-sm text-red-500">
                            <div>Nhân viên mới</div>
                            <div>{totalNewEmployee} người</div>
                        </div>
                    )}
                </CardContent>
            </Card>
        )
    )
}
export default EmpolyeeDashboard
