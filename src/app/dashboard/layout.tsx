import Navbar from "@/app/components/navbar"

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <main>
            <Navbar />
            {children}
        </main>
    )
}
