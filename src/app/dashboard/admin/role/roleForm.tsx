"use client"

import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { roleSchema, roleType } from "@/app/helper/type.schema"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { resolveResponse, baseUrl } from "@/app/helper"
import { useToast } from "@/components/ui/use-toast"
import { useProfileContext } from "@/contexts/ProfileContext"

export default function RoleForm({
    user,
    cleanSelected,
}: {
    user: roleType
    cleanSelected: () => void
}) {
    // use state
    const [error, setError] = useState("")
    // load user context
    const { getUsers } = useProfileContext()

    // create toast
    const { toast } = useToast()

    // form
    const roleForm = useForm<roleType>({
        resolver: zodResolver(roleSchema),
        defaultValues: {
            _id: user._id,
            role: user.role,
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = roleForm

    // handle update button click
    const onSubmit = async (value: roleType) => {
        // fetch update branch
        const response = await fetch(`${baseUrl}/api/user/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve update branch response
        const { error } = await resolveResponse(response)

        // update branch failed
        if (error) setError("Cập nhật lỗi, hãy thử lại !")

        // update branch successfull
        if (!error) {
            // remove error if exists
            setError("")
            // update users
            getUsers()
            cleanSelected()
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Cập nhật quyền hạn thành công",
            })
        }
    }

    useEffect(() => {
        reset({
            _id: user._id,
            role: user.role,
        })
    }, [user, reset])

    return (
        <Form {...roleForm}>
            <form
                onSubmit={roleForm.handleSubmit(onSubmit)}
                className="w-2/3 space-y-6 mt-5"
            >
                {error && (
                    <div className="py-2 bg-red-100 text-center text-md text-red-600">
                        {error}
                    </div>
                )}
                <FormField
                    control={roleForm.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem className="space-y-3">
                            <FormControl>
                                <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex space-y-1"
                                >
                                    {["admin", "manager", "employee"].map(
                                        (role) => (
                                            <FormItem
                                                key={role}
                                                className="flex items-center space-x-3 space-y-0"
                                            >
                                                <FormControl>
                                                    <RadioGroupItem
                                                        value={role}
                                                    />
                                                </FormControl>
                                                <FormLabel className="font-normal">
                                                    {role}
                                                </FormLabel>
                                            </FormItem>
                                        )
                                    )}
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button disabled={!isDirty} type="submit">
                    Cập nhật quyền hạn
                </Button>
            </form>
        </Form>
    )
}
