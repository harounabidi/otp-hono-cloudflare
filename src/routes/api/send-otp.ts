import { Router } from "../../../lib/app"
import template from "../../../templates/mail"
import {
  MAX_SEND_COUNT,
  OTP_EXPIRATION_TIME,
  SHORT_COOL_DOWN_TIME,
} from "../../../utils/constants"
import { hash } from "../../../utils/hash"
import { get, set } from "../../../utils/kv"
import { cooldown, isOnCooldown, mail } from "../../../utils/mail"
import { randomInt } from "../../../utils/random"
import { loginValidator } from "../../../schemas/auth"

const router = Router()

const send = router.post("/api/login", loginValidator, async (c) => {
  const { email } = await c.req.json()

  await isOnCooldown(c, email)

  const otp = randomInt()

  const hashedOtp = await hash(otp)

  await set(c.env.KV, `otp:${email}`, hashedOtp, OTP_EXPIRATION_TIME)

  await cooldown(c.env.KV, email, SHORT_COOL_DOWN_TIME)

  const sendCount = Number(await get(c.env.KV, `otp_send_count:${email}`))

  if (sendCount >= MAX_SEND_COUNT) {
    return c.json({ error: "Too many attempts." }, 429)
  }

  await set(
    c.env.KV,
    `otp_send_count:${email}`,
    String(sendCount + 1),
    SHORT_COOL_DOWN_TIME
  )

  await mail({
    url: c.env.NEXT_PUBLIC_ZEPTOMAIL_API_URL,
    token: c.env.NEXT_PUBLIC_ZEPTOMAIL_TOKEN,
    from: c.env.NEXT_PUBLIC_ZEPTOMAIL_FROM,
    email,
    subject: "Your OTP Code",
    body: template(otp),
    name: "Haroon Abidi",
  })

  return c.json({ success: true })
})

export default send
