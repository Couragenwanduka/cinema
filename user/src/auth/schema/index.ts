import Joi from "joi";

export const signUpSchema = Joi.object({
    firstName: Joi.string().min(2).max(50).required().messages({
        "string.min": "First name should be at least 2 characters long",
        "string.max": "First name should not exceed 50 characters",
        "any.required": "First name is required",
    }),
    lastName: Joi.string().min(2).max(50).required().messages({
        "string.min": "Last name should be at least 2 characters long",
        "string.max": "Last name should not exceed 50 characters",
        "any.required": "Last name is required",
    }),
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(100).required().messages({
        "string.min": "Password should be at least 8 characters long",
        "string.max": "Password should not exceed 100 characters",
        "any.required": "Password is required",
    }),
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Invalid email format",
        "any.required": "Email is required",
    }),
    password: Joi.string().min(8).max(100).required().messages({
        "string.min": "Password should be at least 8 characters long",
        "string.max": "Password should not exceed 100 characters",
        "any.required": "Password is required",
    }),
})