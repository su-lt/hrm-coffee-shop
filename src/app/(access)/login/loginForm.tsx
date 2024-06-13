"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { resolveResponse } from "@/app/helper"
import { loginSchema, loginType } from "@/app/helper/type.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function LoginForm() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [error, setError] = useState("")

    const loginForm = useForm<loginType>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    // handle login button click
    const onSubmit = async (value: loginType) => {
        // fetch login
        const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
        const response = await fetch(`${baseUrl}/api/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve login response
        const { error } = await resolveResponse(response)

        // login failed
        if (error) {
            if (error === 403 || error === 404)
                setError("Email hoặc mật khẩu không đúng")
            else setError("Lỗi đăng nhập")
        }

        // login successfull
        if (!error) {
            // remove error if exists
            setError("")

            // redirect to dashboard
            const redirect = searchParams.get("redirect") || "/dashboard/"
            router.refresh()
            router.push(redirect)
        }
    }

    return (
        <Form {...loginForm}>
            <form
                onSubmit={loginForm.handleSubmit(onSubmit)}
                className="relative -top-3 space-y-4 px-4 pt-8 bg-white rounded-t-lg"
            >
                {error && (
                    <div className="py-4 bg-red-100 text-center text-xs text-red-600">
                        {error}
                    </div>
                )}
                <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
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
                <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    placeholder="Password"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button type="submit" className="w-full py-6">
                    Submit
                </Button>
            </form>
        </Form>
    )
}
