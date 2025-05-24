import { deleteCookie } from "hono/cookie"
import { Router } from "../../../server/app"

const router = Router()

const logout = router.post("/api/logout", async (c) => {
  deleteCookie(c, "token", {
    path: "/",
    httpOnly: true,
    secure: c.env.NODE_ENV === "production",
    sameSite: "lax",
  })
  return c.redirect("/", 302)
})

export default logout
