"use client"

import { useEffect, useState } from "react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useProfileContext } from "@/contexts/ProfileContext"
import { userType } from "@/app/helper/type.schema"
import RoleForm from "./roleForm"

const Role = () => {
    const { loading, user, users, getUser, getUsers } = useProfileContext()
    const [selected, setSelected] = useState("")

    // clear selected
    const clearSelected = () => setSelected("")

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        // get selected user
        if (selected) getUser(selected)
    }, [selected])

    return (
        <section className="p-4">
            {loading && <div> loading... </div>}
            {!loading && (
                <div className="p-2 border rounded-lg">
                    <p className="font-semibold">Phân quyền cho nhân viên</p>
                    {/* select users */}
                    <Select onValueChange={setSelected}>
                        <SelectTrigger className="mt-4 w-full max-w-[450px]">
                            <SelectValue placeholder="Chọn một người" />
                        </SelectTrigger>
                        <SelectContent>
                            {users.map((user: userType) => (
                                <SelectItem key={user._id} value={user._id}>
                                    {user.fullname} {user.role}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {/* load user */}
                    {user && (
                        <RoleForm
                            user={user}
                            key={user._id}
                            cleanSelected={clearSelected}
                        />
                    )}
                </div>
            )}
        </section>
    )
}

export default Role
