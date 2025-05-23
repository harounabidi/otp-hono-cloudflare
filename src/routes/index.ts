import { Router } from "../../lib/app"
import Home from "../pages/home"

const index = Router().get("/", (c) => {
  return c.html(Home())
})

export default index
