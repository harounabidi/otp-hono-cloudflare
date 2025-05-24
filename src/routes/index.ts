import { Router } from "../../server/app"
import Home from "../pages/home"

const index = Router().get("/", (c) => {
  return c.html(Home())
})

export default index
