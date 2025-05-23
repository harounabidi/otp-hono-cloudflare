import App from "../lib/app"
import index from "./routes"
import send from "./routes/api/send-otp"
import verify from "./routes/api/verify-otp"
import login from "./routes/login"
import { serveStatic } from "hono/cloudflare-pages"

const app = App()

const routes = [send, verify, login, index]

routes.forEach((route) => {
  app.route("/", route)
})

app.use("/*", serveStatic())

export default app
