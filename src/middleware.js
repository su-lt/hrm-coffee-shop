import { NextResponse } from "next/server"
import { checkAuthentication } from "./app/utils/checkAuthentication"

export async function middleware(req) {
    console.log("gọi middleware")

    // get current path url
    const { pathname } = req.nextUrl

    // check authentication - return error and result
    const { error, result } = await checkAuthentication()
    if (error) {
        const loginUrl = new URL(`/login`, req.url)
        loginUrl.searchParams.set("redirect", pathname)

        const response = NextResponse.redirect(loginUrl)
        // Clear cookies by setting their expiration to the past
        response.cookies.set("i", "", { expires: new Date(0) })
        response.cookies.set("t", "", { expires: new Date(0) })
        response.cookies.set("u", "", { expires: new Date(0) })

        // Redirect to login page if not authenticated
        return response
    }

    // get user role
    const userRole = result?.metadata?.role

    // check user role with admin
    if (pathname.startsWith("/dashboard/admin") && userRole !== "admin")
        return NextResponse.redirect(new URL("/unauthorized", req.url))

    // check user role with manager
    if (
        pathname.startsWith("/dashboard/manager") &&
        !["manager", "admin"].includes(userRole)
    )
        return NextResponse.redirect(new URL("/unauthorized", req.url))

    // set cookies
    const response = NextResponse.next()
    response.cookies.set("u", JSON.stringify(result.metadata), {
        sameSite: true,
    })

    return response
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api login/signup (exclude this specific API route)
         * - page login/signup/unauthorized (exclude this specific page route)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        "/((?!api/auth|api/user/login|api/user/register|api/shop/branch|login|register|unauthorized|_next/static|_next/image|favicon.ico|$).*)",
    ],
}
