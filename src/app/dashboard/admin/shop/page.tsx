"use client"

import { useEffect } from "react"
import { useShopContext } from "@/contexts/ShopContext"
import ShopForm from "./shopForm"

const Shop = () => {
    // load shop context
    const { loading, getShop } = useShopContext()

    useEffect(() => {
        // get shop
        getShop()
    }, [])

    return (
        <section>
            {loading && <div>Loading ...</div>}
            {!loading && <ShopForm />}
        </section>
    )
}

export default Shop
