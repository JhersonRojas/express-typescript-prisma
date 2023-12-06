import { Request, Response, Router } from "express";
import { join } from "path";
import { cwd } from "process";

const routes = Router()
const clientRoute = join(cwd(), "public", "index.html")

routes.get("/", (_req: Request, res: Response) => {
    res.sendFile(clientRoute);
})

export default routes;