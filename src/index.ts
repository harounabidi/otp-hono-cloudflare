import App from "../server/app"
import index from "./routes"
import logout from "./routes/api/logout"
import send from "./routes/api/send-otp"
import verify from "./routes/api/verify-otp"
import { serveStatic } from "hono/cloudflare-pages"
import admin from "./routes/admin"

const app = App()

const routes = [send, verify, logout, index, admin]

routes.forEach((route) => {
  app.route("/", route)
})

app.use("/*", serveStatic())

export default app
