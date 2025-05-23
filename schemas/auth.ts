import { zValidator } from "@hono/zod-validator"
import { z } from "zod"

const loginSchema = z.object({
  email: z.string().email(),
})

const verifySchema = z.object({
  email: z.string().email(),
  otp: z
    .string()
    .length(6, "OTP must be 6 digits")
    .regex(/^\d+$/, "OTP must be a number"),
})

export type LoginSchema = z.infer<typeof loginSchema>
export type VerifySchema = z.infer<typeof verifySchema>

export const loginValidator = zValidator("json", loginSchema, (result, c) => {
  if (!result.success) {
    return c.json(
      { error: result.error.issues.map((issue) => issue.message)[0] },
      400
    )
  }
})
export const verifyValidator = zValidator("json", verifySchema, (result, c) => {
  if (!result.success) {
    return c.json(
      { error: result.error.issues.map((issue) => issue.message)[0] },
      400
    )
  }
})
