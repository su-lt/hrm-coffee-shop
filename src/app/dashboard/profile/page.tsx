"use client"

import { useProfileContext } from "@/contexts/ProfileContext"
import ProfileForm from "./profileForm"
import UpdatePassForm from "./updatePassForm"
import { useEffect } from "react"

const page = () => {
    // load profile context
    const { getProfile, loading } = useProfileContext()

    useEffect(() => {
        // get user profile
        getProfile()
    }, [])

    return (
        <section>
            {loading && <div>Loading ...</div>}
            {!loading && <ProfileForm />}
            {!loading && <UpdatePassForm />}
        </section>
    )
}

export default page
