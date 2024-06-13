import type { Metadata } from "next"
import { Quicksand } from "next/font/google"
import { Toaster } from "@/components/ui/toaster"
import AppProviders from "../contexts"
import "./globals.css"

const font = Quicksand({ subsets: ["vietnamese"] })

export const metadata: Metadata = {
    title: "Room44 Caffe",
    description: "HRM - internal application",
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <body className={font.className}>
                <Toaster />
                <AppProviders>{children}</AppProviders>
            </body>
        </html>
    )
}
