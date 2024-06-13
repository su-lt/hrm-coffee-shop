"use client"
import { createContext, useContext, useState } from "react"
import { branchType } from "@/app/helper/type.schema"

const BranchContext = createContext<any>(null)

export function BranchContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [branches, setBranches] = useState<branchType[]>([])
    const [branch, setBranch] = useState<branchType | null>(null)
    const [loading, setLoading] = useState(true)

    // get branches
    const getBranches = () => {
        if (!loading) setLoading(true)

        fetch("http://localhost:3000/api/shop/branch")
            .then((res) => res.json())
            .then((data) => {
                setBranches(data.metadata)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    // get branch
    const getBranch = (id: string) => {
        if (!loading) setLoading(true)

        fetch(`http://localhost:3000/api/shop/branch/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setBranch(data.metadata)
                setLoading(false)
            })
            .catch((err) => console.log(err))
    }

    return (
        <BranchContext.Provider
            value={{
                loading,
                branch,
                branches,
                getBranch,
                getBranches,
                setBranch,
            }}
        >
            {children}
        </BranchContext.Provider>
    )
}

export function useBranchContext() {
    return useContext(BranchContext)
}
