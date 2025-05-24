import { Hono } from "hono"
import { Env } from "../types/env"
import { middleware } from "./middleware"
import { csrf } from "hono/csrf"
import NotFound from "../src/pages/not-found"

export function Router() {
  return new Hono<{ Bindings: Env }>({
    strict: false,
  })
}

export default function App() {
  const app = Router()

  app.use("/*", csrf())

  app.use("/admin/*", middleware)

  app.get("/favicon.ico", (c) => {
    return c.redirect("https://hono.dev/favicon.ico")
  })

  app.notFound((c) => {
    return c.html(NotFound(), 404)
  })

  return app
}
