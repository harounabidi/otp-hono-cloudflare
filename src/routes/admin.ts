import { verify } from "hono/jwt"
import { Router } from "../../server/app"
import Admin from "../pages/admin"
import { getCookie } from "hono/cookie"

const admin = Router().get("/admin", async (c) => {
  const token = getCookie(c, "token")

  if (!token) {
    return c.redirect("/")
  }

  const payload = await verify(token, c.env.JWT_SECRET)

  const email =
    typeof payload === "object" && payload !== null && "email" in payload
      ? String(payload.email)
      : undefined

  return c.html(Admin({ email }))
})

export default admin
