// Packages
import { Router } from "express";

// Controllers
import { selectUsers } from "../controllers/user.controllers";

const routes = Router()

routes.get("/users", selectUsers)

export default routes;