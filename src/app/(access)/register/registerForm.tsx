"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { resolveResponse } from "@/app/helper"
import { registerSchema, registerType } from "@/app/helper/type.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// define branch type
type branchType = {
    name: string
    _id: string
}
export default function LoginForm() {
    // hooks
    const router = useRouter()
    const [branches, setBranches] = useState<branchType[]>([])
    const [error, setError] = useState("")
    // get server url
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT

    const registerForm = useForm<registerType>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            fullname: "",
            phone: "",
            email: "",
            password: "",
            confirmPassword: "",
            branch: "",
        },
    })

    const {
        formState: { isDirty, isValid },
    } = registerForm

    // handle login button click
    const onSubmit = async (value: registerType) => {
        // fetch register
        const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT
        const response = await fetch(`${baseUrl}/api/auth/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(value),
        })

        // resolve register response
        const { error, result } = await resolveResponse(response)

        // register failed
        if (error) setError(result.metadata)

        // register successfull
        if (!error) {
            // remove error if exists
            setError("")
            // redirect to dashboard
            router.push("/dashboard")
        }
    }

    // get branches
    useEffect(() => {
        ;(async () => {
            // fetch branches
            const response = await fetch(`${baseUrl}/api/shop/branch/`)
            const { error, result } = await resolveResponse(response)

            // fetch failed
            if (error) {
                setError("Lỗi tải dữ liệu, xin thử lại sau.")
            }

            // fetch successfull
            if (!error) setBranches(result.metadata)
        })()
    }, [])

    return (
        <Form {...registerForm}>
            <form
                onSubmit={registerForm.handleSubmit(onSubmit)}
                className="relative -top-3 space-y-4 px-4 py-6 bg-white rounded-t-lg"
            >
                {error && (
                    <div className="py-4 bg-red-100 text-center text-xs text-red-600">
                        {error}
                    </div>
                )}
                <FormField
                    control={registerForm.control}
                    name="fullname"
                    render={({ field }) => (
                        <FormItem>
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
                    control={registerForm.control}
                    name="phone"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    placeholder="Số điện thoại"
                                    type="number"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
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
                    control={registerForm.control}
                    name="password"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    placeholder="Mật khẩu"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <FormItem>
                            <FormControl>
                                <Input
                                    className="py-5"
                                    placeholder="Xác nhận mật khẩu"
                                    type="password"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <FormField
                    control={registerForm.control}
                    name="branch"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Lựa chọn chi nhánh làm việc" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {branches.map((branch) => (
                                        <SelectItem
                                            key={branch._id}
                                            value={branch._id}
                                        >
                                            {branch.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    disabled={!isDirty || !isValid}
                    type="submit"
                    className="w-full py-6"
                >
                    Đăng ký
                </Button>
            </form>
        </Form>
    )
}
