import { NextRequest, NextResponse } from "next/server"

export default class ResponseHandler {
    // success
    static Success(metadata) {
        return NextResponse.json(
            { message: "success", metadata },
            { status: 200 }
        )
    }

    // reject request
    static Forbidden(metadata) {
        return NextResponse.json(
            { message: "error", metadata },
            { status: 403 }
        )
    }

    // bad request
    static BadRequest(metadata) {
        return NextResponse.json(
            { message: "error", metadata },
            { status: 400 }
        )
    }

    // not found
    static NotFound(metadata) {
        return NextResponse.json(
            { message: "error", metadata },
            { status: 404 }
        )
    }

    // Internal Server Error
    static ServerError(metadata = "Server Error") {
        return NextResponse.json(
            { message: "error", metadata },
            { status: 500 }
        )
    }
}
