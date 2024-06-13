import { AuthContextProvider } from "./AuthContext"
import { BranchContextProvider } from "./BranchContext"
import { ProfileContextProvider } from "./ProfileContext"
import { ShopContextProvider } from "./ShopContext"

const AppProviders = ({
    children,
}: Readonly<{
    children: React.ReactNode
}>) => {
    return (
        <AuthContextProvider>
            <ProfileContextProvider>
                <ShopContextProvider>
                    <BranchContextProvider>{children}</BranchContextProvider>
                </ShopContextProvider>
            </ProfileContextProvider>
        </AuthContextProvider>
    )
}

export default AppProviders
