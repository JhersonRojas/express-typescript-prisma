// Packages
import { Router } from "express";

// Controllers
import { createUser, deleteUser, selectUser, selectUsers, updateUser } from "../controllers/user.controllers";

const routes = Router()

routes.get("/users", selectUsers)
routes.get("/users/:id", selectUser)

routes.post("/users", createUser)
routes.put("/users", updateUser)
routes.delete("/users", deleteUser)

export default routes;