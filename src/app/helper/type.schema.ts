import { z } from "zod"
import { Types } from "mongoose"

// define mongodb object id
const objectIdSchema = (mess: string) =>
    z.string().refine((val) => Types.ObjectId.isValid(val), {
        message: mess,
    })

// sign-up schema
export const registerSchema = z
    .object({
        fullname: z.string().min(1, {
            message: "Điền đầy đủ họ tên",
        }),
        phone: z
            .string()
            .min(10, {
                message: "Số điện thoại không hợp lệ",
            })
            .max(11, { message: "Số điện thoại không hợp lệ" })
            .startsWith("0", {
                message: "Số điện thoại không hợp lệ",
            }),
        email: z.string().email({
            message: "Email không đúng định dạng",
        }),
        password: z.string().min(6, {
            message: "Mật khẩu phải nhiều hơn 6 ký tự",
        }),
        confirmPassword: z.string(),
        branch: objectIdSchema("Chọn chi nhánh làm việc"),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không giống nhau",
        path: ["confirmPassword"],
    })
// sign-up type
export type registerType = z.infer<typeof registerSchema>

// login data
export const loginSchema = z.object({
    email: z.string().email({
        message: "Email không đúng định dạng",
    }),
    password: z.string().min(6, { message: "Mật khẩu phải nhiều hơn 6 ký tự" }),
})
// login type
export type loginType = z.infer<typeof loginSchema>

// create branch
export const branchSchema = z.object({
    _id: objectIdSchema("").optional(),
    name: z.string().min(1, { message: "Điền tên chi nhánh" }),
    address: z.string().min(1, { message: "Điền địa chỉ chi nhánh" }),
    location: z.object({
        latitude: z.preprocess(
            (val: any) => {
                if (val === "" || isNaN(val)) return "invalid"
                return val
            },
            z
                .string()
                .refine((val) => val !== "invalid", {
                    message: "Giá trị phải là số",
                })
                .refine((val) => Math.abs(Number(val)) <= 90, {
                    message: "Giá trị vĩ độ không hợp lệ",
                })
        ),
        longitude: z.preprocess(
            (val: any) => {
                if (val === "" || isNaN(val)) return "invalid"
                return val
            },
            z
                .string()
                .refine((val) => val !== "invalid", {
                    message: "Giá trị phải là số",
                })
                .refine((val) => Math.abs(Number(val)) <= 180, {
                    message: "Giá trị kinh độ không hợp lệ",
                })
        ),
    }),
})
// brand type
export type branchType = z.infer<typeof branchSchema>

// create branch
export const checkInSchema = z.object({
    location: z.object({
        latitude: z.string(),
        longitude: z.string(),
    }),
})

// user type
export type userType = {
    _id: string
    fullname: string
    email: string
    role: string
    status: string
}

// profile schema
export const profileSchema = z.object({
    fullname: z.string().min(1, {
        message: "Điền đầy đủ họ tên",
    }),
    phone: z
        .string()
        .min(10, {
            message: "Số điện thoại không hợp lệ",
        })
        .max(11, { message: "Số điện thoại không hợp lệ" })
        .startsWith("0", {
            message: "Số điện thoại không hợp lệ",
        }),
    email: z.string().email({
        message: "Email không đúng định dạng",
    }),
})
// profile type
export type profileType = z.infer<typeof profileSchema>

// update password schema
export const updatePasswordSchema = z
    .object({
        currentPassword: z.string().min(6, {
            message: "Mật khẩu phải nhiều hơn 6 ký tự",
        }),
        password: z.string().min(6, {
            message: "Mật khẩu phải nhiều hơn 6 ký tự",
        }),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Mật khẩu không giống nhau",
        path: ["confirmPassword"],
    })
// password type
export type passwordType = z.infer<typeof updatePasswordSchema>

// shop schema
export const shopSchema = z.object({
    name: z.string().min(1, {
        message: "Điền tên cửa hàng",
    }),
    phone: z
        .string()
        .min(10, {
            message: "Số điện thoại không hợp lệ",
        })
        .max(11, { message: "Số điện thoại không hợp lệ" })
        .startsWith("0", {
            message: "Số điện thoại không hợp lệ",
        }),
    email: z.string().email({
        message: "Email không đúng định dạng",
    }),
})
// profile type
export type shopType = z.infer<typeof shopSchema>

export const roleSchema = z.object({
    _id: objectIdSchema("invalid id"),
    role: z
        .string()
        .refine((val) => ["admin", "manager", "employee"].includes(val), {
            message: "Giá trị không phù hợp",
        }),
})
export type roleType = z.infer<typeof roleSchema>
