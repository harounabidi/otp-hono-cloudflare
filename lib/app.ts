import { Hono } from "hono"
import { Env } from "../types/env"
import { middleware } from "./middleware"

export function Router() {
  return new Hono<{ Bindings: Env }>({
    strict: false,
  })
}

export default function App() {
  const app = Router()

  app.use("/*", middleware)

  app.get("/favicon.ico", (c) => {
    return c.redirect("https://hono.dev/favicon.ico")
  })

  return app
}
