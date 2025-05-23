import { Router } from "../../lib/app"
import Login from "../pages/login"

const login = Router().get("/login", (c) => {
  return c.html(Login())
})

export default login
