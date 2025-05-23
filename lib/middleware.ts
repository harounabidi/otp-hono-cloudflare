import { Context, Next } from "hono"
import { verify } from "hono/jwt"
import { Env } from "../types/env"

export async function middleware(c: Context<{ Bindings: Env }>, next: Next) {
  if (c.req.path === "/login") {
    const auth = c.req.header("Authorization")
    let token = auth ? auth.replace("Bearer ", "") : undefined
    if (!token) {
      // Try to get token from cookie
      const cookieHeader = c.req.header("Cookie")
      if (cookieHeader) {
        const match = cookieHeader.match(/(?:^|; )token=([^;]+)/)
        if (match) token = decodeURIComponent(match[1])
      }
    }
    if (token) {
      try {
        await verify(token, c.env.JWT_SECRET)
        return c.redirect("/")
      } catch {
        // Invalid token, continue to /login
      }
    }
    return await next()
  }
  if (c.req.path.startsWith("/api/")) {
    return await next()
  }
  let auth = c.req.header("Authorization")
  let token = auth ? auth.replace("Bearer ", "") : undefined
  if (!token) {
    // Try to get token from cookie
    const cookieHeader = c.req.header("Cookie")
    if (cookieHeader) {
      const match = cookieHeader.match(/(?:^|; )token=([^;]+)/)
      if (match) token = decodeURIComponent(match[1])
    }
  }
  if (!token) return c.redirect("/login")
  try {
    const payload = await verify(token, c.env.JWT_SECRET)
    c.set("jwtPayload", payload)
    await next()
  } catch {
    return c.redirect("/login")
  }
}
