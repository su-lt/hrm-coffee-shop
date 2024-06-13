"use client"

import { useState, useEffect } from "react"
import { Pencil2Icon, TrashIcon } from "@radix-ui/react-icons"
import { branchType } from "@/app/helper/type.schema"
import { resolveResponse, baseUrl } from "@/app/helper"
import { useBranchContext } from "@/contexts/BranchContext"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import CreateBranch from "./createBranch"

const Branch = () => {
    // use state
    const [error, setError] = useState("")
    // load shop context
    const { loading, branches, getBranches } = useBranchContext()
    // router
    const router = useRouter()
    // call toast
    const { toast } = useToast()

    const handleDelete = async (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        id: string | undefined
    ) => {
        event.stopPropagation()

        // check id exists
        if (!id) return

        // fetch delete branch
        const response = await fetch(`${baseUrl}/api/shop/branch/${id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })

        // resolve delete branch response
        const { error } = await resolveResponse(response)

        // delete branch failed
        if (error) setError("Xoá chi nhánh không thành công, hãy thử lại !")

        // delete branch successfull
        if (!error) {
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Xoá chi nhánh mới thành công",
            })
            // refresh list branches
            getBranches()
        }
    }

    useEffect(() => {
        // get branches
        getBranches()
    }, [])

    return (
        <section className="p-4">
            {loading && <div>Loading ...</div>}
            {/* {!loading && <ShopForm />} */}
            {!loading && branches && (
                <>
                    <p>Danh sách chi nhánh:</p>
                    {error && (
                        <div className="py-2 bg-red-100 text-center text-md text-red-600">
                            {error}
                        </div>
                    )}
                    {branches.map((branch: branchType) => (
                        <div
                            key={branch._id}
                            onClick={() =>
                                router.push(
                                    "/dashboard/admin/branch/" + branch._id
                                )
                            }
                            className="p-4 mt-4 border rounded-lg flex justify-between items-center"
                        >
                            <div>{branch.name}</div>
                            <div className="flex items-center gap-2">
                                <button
                                    className="p-2"
                                    onClick={(e) => handleDelete(e, branch._id)}
                                >
                                    <TrashIcon color="red" />
                                </button>
                                <Pencil2Icon />
                            </div>
                        </div>
                    ))}
                    {/* create new branch */}
                    <CreateBranch />
                </>
            )}
        </section>
    )
}

export default Branch
