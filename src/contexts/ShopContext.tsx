"use client"
import { createContext, useContext, useState } from "react"
import { shopType } from "@/app/helper/type.schema"

const ShopContext = createContext<any>(null)

export function ShopContextProvider({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const [shop, setShop] = useState<shopType | null>(null)
    const [loading, setLoading] = useState(true)

    // get profile
    const getShop = () => {
        fetch("http://localhost:3000/api/shop/")
            .then((res) => res.json())
            .then((data) => {
                setLoading(false)
                setShop(data.metadata)
            })
            .catch((err) => console.log(err))
    }

    return (
        <ShopContext.Provider value={{ shop, loading, getShop, setShop }}>
            {children}
        </ShopContext.Provider>
    )
}

export function useShopContext() {
    return useContext(ShopContext)
}
