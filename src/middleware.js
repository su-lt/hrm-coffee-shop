import { NextResponse } from "next/server"
import { checkAuthentication } from "./app/utils/checkAuthentication"

export async function middleware(req) {
    console.log("gọi vào middleware")
    // check authentication - return error and result
    const { error, result } = await checkAuthentication()

    if (error)
        // Redirect to login page if not authenticated
        return NextResponse.redirect(new URL("/access/login", req.url))

    // get current path url
    const { pathname } = req.nextUrl
    // get user role
    const userRole = result.metadata?.role

    // check user role with admin
    if (pathname.startsWith("/dashboard/admin") && userRole !== "admin")
        return NextResponse.redirect(new URL("/access/unauthorized", req.url))

    // check user role with manager
    if (
        pathname.startsWith("/dashboard/manager") &&
        !["manager", "admin"].includes(userRole)
    )
        return NextResponse.redirect(new URL("/access/unauthorized", req.url))

    // Create a new response with headers user
    const response = NextResponse.next()
    response.headers.set("x-user-id", JSON.stringify(result.metadata))

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
        "/((?!api/auth|api/user/login|api/user/signup|access/login|access/signup|access/unauthorized|_next/static|_next/image|favicon.ico).*)",
    ],
}
