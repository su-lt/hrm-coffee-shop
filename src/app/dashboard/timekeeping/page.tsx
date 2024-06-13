"use client"

import { useEffect, useState } from "react"
import { formatDate, formatTime, resolveResponse } from "../../helper"
import { useAuthContext } from "@/contexts/AuthContext"
import Link from "next/link"

const Timekeeping = () => {
    // use state
    const [timeString, setTimeString] = useState("")
    const [dateString, setDateString] = useState("")
    const [checkInTime, setCheckInTime] = useState<Date | null>(null)
    const [checkOutTime, setCheckOutTime] = useState<Date | null>(null)
    const [errorMessage, setError] = useState("")
    const [isLoading, setLoading] = useState(false)
    // get user in auth context
    const { userId } = useAuthContext()
    // get server url
    const baseUrl = process.env.NEXT_PUBLIC_API_ENDPOINT

    const checkIn = async (position: GeolocationPosition) => {
        const latitude = position.coords.latitude.toString()
        const longitude = position.coords.longitude.toString()

        const response = await fetch(`${baseUrl}/api/user/checkin/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                location: {
                    latitude,
                    longitude,
                },
            }),
        })
        const { error, result } = await resolveResponse(response)
        // stop loading from server
        setLoading(false)

        // checkin successfull
        if (!error) {
            // set check in time
            setCheckInTime(new Date(result.metadata.checkInTime))
            // clear error if existing
            setError("")
            return
        }

        // get error
        setError(result.metadata)
    }

    const checkOut = async (position: GeolocationPosition) => {
        const latitude = position.coords.latitude.toString()
        const longitude = position.coords.longitude.toString()

        const response = await fetch(`${baseUrl}/api/user/checkout/`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                location: {
                    latitude,
                    longitude,
                },
            }),
        })
        const { error, result } = await resolveResponse(response)
        // stop loading from server
        setLoading(false)

        // checkin successfull
        if (!error) {
            // set check in time
            setCheckOutTime(new Date(result.metadata.checkOutTime))
            // clear error if existing
            setError("")
            return
        }

        // get error
        setError(result.metadata)
    }

    const handleError = (error: GeolocationPositionError) => {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                setError(" User denied the request for Geolocation.")
                break
            case error.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.")
                break
            case error.TIMEOUT:
                setError("The request to get user location timed out.")
                break
            default:
                setError("An unknown error occurred.")
                break
        }
    }

    const handleClick = () => {
        if (navigator.geolocation) {
            setLoading(true)
            checkInTime
                ? navigator.geolocation.getCurrentPosition(
                      checkOut,
                      handleError
                  )
                : navigator.geolocation.getCurrentPosition(checkIn, handleError)
        } else setError("Geolocation is not supported by this browser.")
    }

    // get workday user by id
    useEffect(() => {
        if (userId)
            (async () => {
                const response = await fetch(
                    `${baseUrl}/api/workday/${userId}/`
                )
                const { error, result } = await resolveResponse(response)

                // checkin successfull
                if (!error) {
                    // set check in time
                    setCheckInTime(new Date(result.metadata.checkInTime))
                    // set check out time
                    if (result.metadata?.checkOutTime)
                        setCheckOutTime(new Date(result.metadata.checkOutTime))
                    // clear error if existing
                    setError("")
                }
            })()
    }, [userId])

    // create a clock
    useEffect(() => {
        const now = new Date()
        // init value
        setTimeString(formatTime(now))
        // set timer interval
        const timeId = setInterval(() => {
            setTimeString(formatTime(now))
        }, 1000)

        // set date dd/mm/YYYY
        setDateString(formatDate(new Date()))

        return () => {
            // clear up interval
            clearInterval(timeId)
        }
    }, [])

    return (
        <section className="px-2">
            <div className="text-center">
                <p className="pt-5">Chi nhánh làm việc</p>
                <span>Room 44 - Lê Văn Sỹ</span>
                <div className="pt-4 font-semibold text-5xl">{timeString}</div>
                <div className="pb-4 text-sm">{dateString}</div>
                <div>
                    {errorMessage && (
                        <div className="p-2 mb-2 bg-red-100 text-red-600">
                            {errorMessage}
                        </div>
                    )}

                    <button className="border px-4 py-2" onClick={handleClick}>
                        {checkInTime ? "Check Out" : "Check In"}
                    </button>

                    {isLoading && <div>Loading ...</div>}
                </div>

                <div className="grid grid-flow-col">
                    {/* show check in time */}
                    {checkInTime ? (
                        <div>
                            <div>{formatTime(checkInTime)}</div>
                            <div>{formatDate(checkInTime)}</div>
                        </div>
                    ) : (
                        <div>--</div>
                    )}

                    {/* show check out time */}
                    {checkOutTime ? (
                        <div>
                            <div>{formatTime(checkOutTime)}</div>
                            <div>{formatDate(checkOutTime)}</div>
                        </div>
                    ) : (
                        <div>--</div>
                    )}
                </div>
            </div>
            <div className="text-center pt-5">
                <Link href="/dashboard">trang chu</Link>
            </div>
        </section>
    )
}

export default Timekeeping
