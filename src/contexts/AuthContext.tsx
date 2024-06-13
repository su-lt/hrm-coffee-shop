"use client"
import { getCookie } from "cookies-next"
import React, { createContext, useContext, useState } from "react"

const AuthContext = createContext<any>(null)

export function AuthContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [userId, setUserId] = useState("")
    const [username, setUsername] = useState("")
    const [role, setRole] = useState("")

    // update if user changed
    const checkNewUpdate = () => {
        // get cookie
        const cookieStore = getCookie("u")
        // check local storage
        if (cookieStore) {
            const cookieParser = JSON.parse(cookieStore)

            setUsername(cookieParser?.username)
            setRole(cookieParser?.role)
            setUserId(cookieParser.userId)
        }
    }

    return (
        <AuthContext.Provider
            value={{ userId, username, role, checkNewUpdate, setUsername }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}
