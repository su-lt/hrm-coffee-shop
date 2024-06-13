"use client"

import { useState, useEffect } from "react"
import { profileSchema, profileType } from "@/app/helper/type.schema"
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
import { useProfileContext } from "@/contexts/ProfileContext"
import { useAuthContext } from "@/contexts/AuthContext"
import { useToast } from "@/components/ui/use-toast"

export default function ProfileForm() {
    // use state
    const [error, setError] = useState("")
    // profile context
    const { profile, setProfile } = useProfileContext()
    const { setUsername } = useAuthContext()
    // create toast
    const { toast } = useToast()

    // form
    const profileForm = useForm<profileType>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            fullname: profile.fullname,
            phone: profile.phone,
            email: profile.email,
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = profileForm

    // handle login button click
    const onSubmit = async (value: profileType) => {
        // fetch register
        const response = await fetch(`${baseUrl}/api/user/update/profile`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve register response
        const { error, result } = await resolveResponse(response)

        // register failed
        if (error) setError("Cập nhật lỗi, hãy thử lại !")

        // register successfull
        if (!error) {
            // remove error if exists
            setError("")
            // update profile
            setProfile(result.metadata)
            // update username in auth context
            setUsername(result.metadata.fullname)
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Cập nhật thông tin cá nhân thành công",
            })
        }
    }

    // Reset form when updated profile
    useEffect(() => {
        reset({
            fullname: profile.fullname,
            phone: profile.phone,
            email: profile.email,
        })
    }, [profile, reset])

    return (
        <div className="border m-2 px-2 py-4 rounded-lg">
            <p className="px-2 font-semibold text-lg">Thông tin cá nhân</p>
            <Form {...profileForm}>
                <form
                    onSubmit={profileForm.handleSubmit(onSubmit)}
                    className="space-y-4 p-4 grid grid-cols-1"
                >
                    {error && (
                        <div className="py-2 bg-red-100 text-center text-md text-red-600">
                            {error}
                        </div>
                    )}
                    <FormField
                        control={profileForm.control}
                        name="fullname"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Họ tên{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Họ tên"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Số điện thoại{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Số điện thoại"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={profileForm.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Email{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Email"
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
                        Cập nhật thông tin
                    </Button>
                </form>
            </Form>
        </div>
    )
}
