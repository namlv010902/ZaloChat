import { object, string } from "yup";

const loginSchema = object({
    email: string().required("Email is required"),
    password: string().required("Password is required").min(6, "Password must be at least 6 characters"),
})

export {loginSchema}