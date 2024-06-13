"use client"

import { useEffect } from "react"
import { useBranchContext } from "@/contexts/BranchContext"
import BranchForm from "./branchForm"

const BranchDetails = ({ params: { id } }: { params: { id: string } }) => {
    const { loading, branch, getBranch, setBranch } = useBranchContext()

    useEffect(() => {
        // reset branch
        setBranch(null)
        // load the branch
        getBranch(id)
    }, [])

    return (
        <section className="p-4">
            {loading && <div>loading ...</div>}
            {branch && <BranchForm />}
        </section>
    )
}

export default BranchDetails
