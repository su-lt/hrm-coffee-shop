"use client"

import { useEffect } from "react"
import { useAuthContext } from "@/contexts/AuthContext"
import { ArrowLeftIcon } from "@radix-ui/react-icons"
import { useRouter, usePathname } from "next/navigation"

const Navbar = () => {
    const { username, checkNewUpdate } = useAuthContext()
    const router = useRouter()
    const pathname = usePathname()

    useEffect(() => {
        // get new update
        checkNewUpdate()
    }, [])

    return (
        <section
            className={`py-2 px-4 flex ${
                ["/dashboard"].indexOf(pathname) < 0
                    ? "justify-between"
                    : "justify-end"
            } bg-primary text-white md:justify-end`}
        >
            {["/dashboard"].indexOf(pathname) < 0 && (
                <div className="md:hidden">
                    <button
                        className="flex items-center gap-2"
                        onClick={() => router.back()}
                    >
                        <ArrowLeftIcon /> Quay lại
                    </button>
                </div>
            )}

            <div className="flex gap-2">
                Xin chào <p className="font-semibold">{username}</p>
            </div>
        </section>
    )
}

export default Navbar
