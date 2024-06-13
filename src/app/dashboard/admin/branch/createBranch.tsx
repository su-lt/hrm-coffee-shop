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
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { resolveResponse, baseUrl } from "@/app/helper"
import { useBranchContext } from "@/contexts/BranchContext"
import { useToast } from "@/components/ui/use-toast"

export default function CreateBranch() {
    // use state
    const [error, setError] = useState("")
    const [open, setOpen] = useState(false)
    // load shop context
    const { getBranches } = useBranchContext()
    // call toast
    const { toast } = useToast()

    // form
    const branchForm = useForm<branchType>({
        resolver: zodResolver(branchSchema),
        defaultValues: {
            name: "",
            address: "",
            location: {
                latitude: "",
                longitude: "",
            },
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = branchForm

    // handle create button click
    const onSubmit = async (value: branchType) => {
        // fetch create branch
        const response = await fetch(`${baseUrl}/api/shop/branch/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve create branch response
        const { error } = await resolveResponse(response)

        // create branch failed
        if (error) setError("Tạo mới không thành công, hãy thử lại !")

        // create branch successfull
        if (!error) {
            // remove error if exists
            setError("")

            reset({
                name: "",
                address: "",
                location: {
                    latitude: "",
                    longitude: "",
                },
            })
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Tạo chi nhánh mới thành công",
            })
            // close dialog
            setOpen(false)
            // refresh list branches
            getBranches()
        }
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button className="mt-6 py-4 w-full">Tạo chi nhánh mới</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[525px]">
                <Form {...branchForm}>
                    <DialogHeader className="text-left">
                        <DialogTitle>Thêm mới</DialogTitle>
                    </DialogHeader>
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
                                            placeholder="tên chi nhánh"
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
                                            placeholder="địa chỉ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormLabel className="underline">Toạ Độ</FormLabel>
                        <FormField
                            control={branchForm.control}
                            name="location.latitude"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>
                                        Vĩ độ{" "}
                                        <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // type="number"
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
                                        Kinh độ{" "}
                                        <span className="text-red-600">*</span>
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            // type="number"
                                            className="py-5"
                                            placeholder="kinh độ"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button
                                disabled={!isDirty}
                                type="submit"
                                className="w-full py-6"
                            >
                                Tạo chi nhánh mới
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}
