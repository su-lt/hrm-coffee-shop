"use client"

import React, { createContext, useContext, useState } from "react"
import { profileType } from "@/app/helper/type.schema"
import { userType } from "@/app/helper/type.schema"

const ProfileContext = createContext<any>(null)

export function ProfileContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [users, setUsers] = useState<userType[]>([])
    const [user, setUser] = useState<userType | null>(null)
    const [profile, setProfile] = useState<profileType | null>(null)
    const [loading, setLoading] = useState(true)

    // get profile
    const getProfile = () => {
        setLoading(true)
        fetch("http://localhost:3000/api/user/profile/")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setProfile(data.metadata)
            })
            .catch((err) => console.log(err))
    }

    // get user
    const getUser = (id: string) => {
        fetch(`http://localhost:3000/api/user/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setUser(data.metadata)
            })
            .catch((err) => console.log(err))
    }

    // get users
    const getUsers = () => {
        setLoading(true)
        fetch("http://localhost:3000/api/user/")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setUsers(data.metadata)
                setUser(null)
            })
            .catch((err) => console.log(err))
    }

    // get employees
    const getEmployees = () => {
        setLoading(true)
        fetch("http://localhost:3000/api/manager/employee")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setUsers(data.metadata)
            })
            .catch((err) => console.log(err))
    }

    return (
        <ProfileContext.Provider
            value={{
                loading,
                profile,
                user,
                users,
                getProfile,
                setProfile,
                getUser,
                getUsers,
                getEmployees,
                setUser,
            }}
        >
            {children}
        </ProfileContext.Provider>
    )
}

export function useProfileContext() {
    return useContext(ProfileContext)
}
