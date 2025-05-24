import { Context, Next } from "hono"
import { jwt, sign, verify } from "hono/jwt"
import { getCookie, setCookie } from "hono/cookie"
import { Env } from "../types/env"

export async function middleware(c: Context<{ Bindings: Env }>, next: Next) {
  const token = getCookie(c, "token")
  if (token) {
    try {
      await verify(token, c.env.JWT_SECRET)

      // refresh the token if it's close to expiration
      const payload = await verify(token, c.env.JWT_SECRET)

      if (!payload || typeof payload.exp !== "number") {
        return c.redirect("/")
      }

      const now = Math.floor(Date.now() / 1000)

      if (payload.exp - now < 300) {
        const newToken = await sign(
          {
            email: payload.email,
            iat: now,
            exp: now + 60 * 60, // 1 hour
          },
          c.env.JWT_SECRET
        )
        setCookie(c, "token", newToken, {
          httpOnly: true,
          secure: c.env.NODE_ENV === "production",
          sameSite: "lax",
          maxAge: 60 * 60,
        })
      }
      if (c.req.path === "/") return c.redirect("/admin")
    } catch (e) {
      console.error("Token verification failed:", e)
    }
  }
  try {
    await jwt({
      secret: c.env.JWT_SECRET,
      cookie: "token",
    })(c, next)
  } catch (e) {
    return c.redirect("/")
  }
}
