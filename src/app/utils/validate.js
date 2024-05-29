import { z } from "zod"
import { ObjectId } from "bson"

// define mongodb object id
const objectIdSchema = z.string().refine((val) => ObjectId.isValid(val), {
    message: "Invalid ObjectId",
})

// sign-up data
export const signupSchema = z.object({
    fullname: z.string(),
    phone: z.string().startsWith("0").min(10).max(11),
    email: z.string().email(),
    password: z.string(),
    branch: objectIdSchema,
})

// login data
export const loginSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

// create branch
export const branchSchema = z.object({
    name: z.string(),
    address: z.string(),
    location: z.object({
        latitude: z.string(),
        longitude: z.string(),
    }),
})

// create branch
export const checkInSchema = z.object({
    location: z.object({
        latitude: z.string(),
        longitude: z.string(),
    }),
})
