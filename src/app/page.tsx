"use client"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function Home() {
    const router = useRouter()

    return (
        <main className="container">
            <div className="flex gap-10">
                <div className="">
                    <Link href="/login">Đăng nhập</Link>
                </div>
                <div className="">
                    <Link href="/register">Đăng ký</Link>
                </div>
            </div>
            <button
                onClick={() => {
                    router.push("/dashboard")
                    router.refresh()
                }}
            >
                Dashboard
            </button>
        </main>
    )
}
