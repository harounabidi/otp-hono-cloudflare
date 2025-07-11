import { sign } from "hono/jwt"
import { Router } from "../../../server/app"
import {
  LONG_COOL_DOWN_TIME,
  MAX_RETRY_COUNT,
  OTP_EXPIRATION_TIME,
} from "../../../utils/constants"
import { compare } from "../../../utils/hash"
import { get, set } from "../../../utils/kv"
import { cooldown } from "../../../utils/mail"
import { verifyValidator } from "../../../schemas/auth"
import { setCookie } from "hono/cookie"

const router = Router()

const verify = router.post("/api/verify", verifyValidator, async (c) => {
  const { email, otp } = await c.req.json()
  const hashedOtp = await get(c.env.KV, `otp:${email}`)

  if (!hashedOtp) return c.json({ error: "OTP expired or not found" }, 400)

  const retryCount = Number(await get(c.env.KV, `otp_retry_count:${email}`))

  if (retryCount >= MAX_RETRY_COUNT) {
    return c.json({ error: "Too many attempts." }, 429)
  }

  const match = await compare(otp, hashedOtp)

  if (!match) {
    await set(
      c.env.KV,
      `otp_retry_count:${email}`,
      String(retryCount + 1),
      OTP_EXPIRATION_TIME
    )

    if (retryCount + 1 >= MAX_RETRY_COUNT) {
      await cooldown(c.env.KV, email, LONG_COOL_DOWN_TIME)
    }

    return c.json({ error: "Invalid OTP" }, 400)
  }

  const now = Math.floor(Date.now() / 1000)

  const token = await sign(
    {
      email,
      iat: now,
      exp: now + 60 * 60,
    },
    c.env.JWT_SECRET
  )

  setCookie(c, "token", token, {
    httpOnly: true,
    secure: c.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60,
  })

  return c.json({ success: true, token })
})

export default verify
