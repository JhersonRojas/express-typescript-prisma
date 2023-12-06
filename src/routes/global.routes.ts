import { Response, Router } from "express";

const routes = Router()

routes.get("/", (_req, res: Response) => {
    res.status(200).send("Express + TypeScript + Prisma")
})

export default routes;