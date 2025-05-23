import { Context } from "hono"
import { get, set } from "./kv"
import { Env } from "../types/env"

export async function mail({
  url,
  token,
  from,
  email,
  subject,
  body,
  name,
}: {
  url: string
  token: string
  from: string
  email: string
  subject: string
  body: string
  name: string
}) {
  await fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      from: { address: from },
      to: [{ email_address: { address: email, name: name } }],
      subject: subject,
      htmlbody: body,
    }),
  })
}

export async function cooldown(kv: KVNamespace, email: string, time: number) {
  const now = Math.floor(Date.now() / 1000)

  await set(kv, `otp_cooldown:${email}`, (now + time).toString(), time)
}

export async function isOnCooldown(
  c: Context<{ Bindings: Env }>,
  email: string
) {
  const now = Math.floor(Date.now() / 1000)
  const cooldownTime = await get(c.env.KV, `otp_cooldown:${email}`)

  if (now < Number(cooldownTime)) {
    const timeLeft = Number(cooldownTime) - now
    const minutesLeft = Math.floor(timeLeft / 60)
    const secondsLeft = timeLeft % 60

    return c.json(
      {
        error: `Too many attempts. Please wait ${minutesLeft} minutes and ${secondsLeft} seconds.`,
      },
      429
    )
  }
}
