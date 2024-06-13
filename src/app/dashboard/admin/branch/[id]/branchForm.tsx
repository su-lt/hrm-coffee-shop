"use client"

import { useState } from "react"
import { branchSchema, branchType } from "@/app/helper/type.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resolveResponse, baseUrl } from "@/app/helper"
import { useBranchContext } from "@/contexts/BranchContext"
import { useToast } from "@/components/ui/use-toast"

export default function BranchForm() {
    // use state
    const [error, setError] = useState("")
    // branch context
    const { branch } = useBranchContext()
    // create toast
    const { toast } = useToast()

    // form
    const branchForm = useForm<branchType>({
        resolver: zodResolver(branchSchema),
        defaultValues: {
            _id: branch._id,
            name: branch.name,
            address: branch.address,
            location: {
                latitude: String(branch.location.latitude),
                longitude: String(branch.location.longitude),
            },
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = branchForm

    // handle update button click
    const onSubmit = async (value: branchType) => {
        // fetch update branch
        const response = await fetch(
            `${baseUrl}/api/shop/branch/${value._id}`,
            {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(value),
            }
        )

        // resolve update branch response
        const { error, result } = await resolveResponse(response)

        // update branch failed
        if (error) setError("Cập nhật lỗi, hãy thử lại !")

        // update branch successfull
        if (!error) {
            // remove error if exists
            setError("")

            reset({
                _id: result.metadata._id,
                name: result.metadata.name,
                address: result.metadata.address,
                location: {
                    latitude: String(result.metadata.location.latitude),
                    longitude: String(result.metadata.location.longitude),
                },
            })
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Cập nhật thông tin chi nhánh thành công",
            })
        }
    }

    return (
        <div className="border m-2 px-2 py-4 rounded-lg">
            <p className="px-2 font-semibold text-lg">Thông tin chi nhánh</p>
            <Form {...branchForm}>
                <form
                    onSubmit={branchForm.handleSubmit(onSubmit)}
                    className="space-y-4 p-4 grid grid-cols-1"
                >
                    {error && (
                        <div className="py-2 bg-red-100 text-center text-md text-red-600">
                            {error}
                        </div>
                    )}
                    <FormField
                        control={branchForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Tên chi nhánh{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Tên chi nhánh"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={branchForm.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Địa chỉ{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Địa chỉ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormLabel>Toạ Độ</FormLabel>
                    <FormField
                        control={branchForm.control}
                        name="location.latitude"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    &#160; Vĩ độ{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Vĩ độ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={branchForm.control}
                        name="location.longitude"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    &#160; Kinh độ{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Kinh độ"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        disabled={!isDirty}
                        type="submit"
                        className="w-full py-6"
                    >
                        Cập nhật thông tin chi nhánh
                    </Button>
                </form>
            </Form>
        </div>
    )
}
