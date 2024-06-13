"use client"

import { useState } from "react"
import { shopSchema, shopType } from "@/app/helper/type.schema"
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
import { useShopContext } from "@/contexts/ShopContext"
import { useToast } from "@/components/ui/use-toast"

export default function ShopForm() {
    // use state
    const [error, setError] = useState("")
    // shop context
    const { shop, setShop } = useShopContext()
    // create toast
    const { toast } = useToast()

    // form
    const shopForm = useForm<shopType>({
        resolver: zodResolver(shopSchema),
        defaultValues: {
            name: shop.name,
            phone: shop.phone,
            email: shop.email,
        },
    })

    const {
        reset,
        formState: { isDirty },
    } = shopForm

    // handle login button click
    const onSubmit = async (value: shopType) => {
        // fetch register
        const response = await fetch(`${baseUrl}/api/shop`, {
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
            // setShop(result.metadata)
            // Reset form when updated profile
            reset({
                name: result.metadata.name,
                phone: result.metadata.phone,
                email: result.metadata.email,
            })
            // notify user
            toast({
                className: "bg-[#f6fff9] text-lg font-semibold",
                description: "Cập nhật thông tin cửa hàng thành công",
            })
        }
    }

    return (
        <div className="border m-2 px-2 py-4 rounded-lg">
            <p className="px-2 font-semibold text-lg">Thông tin cửa hàng</p>
            <Form {...shopForm}>
                <form
                    onSubmit={shopForm.handleSubmit(onSubmit)}
                    className="space-y-4 p-4 grid grid-cols-1"
                >
                    {error && (
                        <div className="py-2 bg-red-100 text-center text-md text-red-600">
                            {error}
                        </div>
                    )}
                    <FormField
                        control={shopForm.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>
                                    Tên cửa hàng{" "}
                                    <span className="text-red-600">*</span>
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        className="py-5"
                                        placeholder="Tên cửa hàng"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={shopForm.control}
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
                        control={shopForm.control}
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
