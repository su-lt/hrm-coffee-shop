"use client"

import { useEffect, useState } from "react"
import { TrashIcon, SwitchIcon } from "@radix-ui/react-icons"
import { Card, CardContent, CardTitle } from "@/components/ui/card"
import { useProfileContext } from "@/contexts/ProfileContext"
import { userType } from "@/app/helper/type.schema"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const EmployeeDashboard = () => {
    const [employees, setEmployees] = useState<userType[]>([])
    const [newEmployees, setNewEmployees] = useState<userType[]>([])
    // user context
    const { loading, users, getEmployees } = useProfileContext()

    // watch users : all employees
    useEffect(() => {
        // empty list
        setEmployees([])
        setNewEmployees([])
        // check status
        users.map((user: userType) => {
            switch (user.status) {
                case "inactive":
                    setNewEmployees((pre) => [...pre, user])
                    break

                default:
                    setEmployees((pre) => [...pre, user])
                    break
            }
        })
    }, [users])

    useEffect(() => {
        getEmployees()
    }, [])
    return (
        <div className="p-4">
            {loading && <div> loading ... </div>}
            {!loading && (
                <Card>
                    <CardContent className="p-4">
                        <Table>
                            <TableCaption className="caption-top mt-1 text-left">
                                Danh sách nhân viên mới
                            </TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="w-[160px] text-right"></TableHead>
                                    <TableHead className="w-[50px] whitespace-nowrap">
                                        Trạng thái
                                    </TableHead>
                                    <TableHead className="whitespace-nowrap">
                                        Họ tên
                                    </TableHead>
                                    <TableHead>Email</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {newEmployees.map((user: userType) => (
                                    <TableRow key={user._id}>
                                        <TableCell className="flex gap-4">
                                            <div className="flex gap-2 items-center">
                                                <p className="whitespace-nowrap">
                                                    duyệt
                                                </p>
                                                <SwitchIcon />
                                            </div>
                                            <div className="text-red-500 flex gap-2 items-center">
                                                <p>xoá</p>
                                                <TrashIcon />
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <p className="text-center bg-gray-200 text-gray-600 border rounded-md">
                                                {user.status}
                                            </p>
                                        </TableCell>
                                        <TableCell className="font-medium whitespace-nowrap">
                                            {user.fullname}
                                        </TableCell>
                                        <TableCell className="whitespace-nowrap">
                                            {user.email}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}

export default EmployeeDashboard
