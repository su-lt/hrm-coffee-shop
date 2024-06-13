"use client"

import { useEffect, useState } from "react"
import { updatePasswordSchema, passwordType } from "@/app/helper/type.schema"
import { resolveResponse, baseUrl } from "@/app/helper"
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
import { useToast } from "@/components/ui/use-toast"

export default function UpdatePassForm() {
    // use state
    const [error, setError] = useState("")
    // create toast
    const { toast } = useToast()

    // form
    const UpdatePassForm = useForm<passwordType>({
        resolver: zodResolver(updatePasswordSchema),
        defaultValues: {
            currentPassword: "",
            password: "",
            confirmPassword: "",
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = UpdatePassForm

    // handle login button click
    const onSubmit = async (value: passwordType) => {
        // fetch register
        const response = await fetch(`${baseUrl}/api/user/update/password`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve register response
        const { error } = await resolveResponse(response)
        // register failed
        if (error) {
            if (error === 403) {
                // UpdatePassForm.setFocus("currentPassword")
                UpdatePassForm.setError(
                    "currentPassword",
                    {
                        type: "manual",
                        message: "Mật khẩu không chính xác",
                    },
                    { shouldFocus: true }
                )
            } else setError("Đổi mật khẩu không thành công, xin hãy thử lại !")
        }

        // register successfull
        if (!error) {
            // remove error if exists
            setError("")
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Cập nhật mật khẩu thành công",
            })
            // Reset form when updated profile
            reset({
                currentPassword: "",
                password: "",
                confirmPassword: "",
            })
        }
    }

    return (
        <div className="border m-2 px-2 py-4 rounded-lg">
            <p className="px-2 font-semibold text-lg">Thay đổi mật khẩu</p>
            <Form {...UpdatePassForm}>
                <form
                    onSubmit={UpdatePassForm.handleSubmit(onSubmit)}
                    className="space-y-4 p-4 grid grid-cols-1"
                >
                    {error && (
                        <div className="py-2 bg-red-100 text-center text-md text-red-600">
                            {error}
                        </div>
                    )}
                    <FormField
                        control={UpdatePassForm.control}
                        name="currentPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Mật khẩu hiện tại{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="py-5"
                                        placeholder="Mật khẩu hiện tại"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={UpdatePassForm.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Mật khẩu mới{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="py-5"
                                        placeholder="Mật khẩu mới"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={UpdatePassForm.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Nhập lại mật khẩu{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="py-5"
                                        placeholder="Nhập lại mật khẩu"
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
                        Đổi mật khẩu
                    </Button>
                </form>
            </Form>
        </div>
    )
}
