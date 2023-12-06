// Packages
import body from "body-parser";
import express from "express";
import morgan from "morgan";
import { config } from "dotenv";

// Routes
import globalRoutes from "../routes/global.routes";

config()

const app = express()

app.use(body.json())
app.use(body.urlencoded({ extended: false }))

if (process.env.NODE_ENV === "dev") {
    app.use(morgan("dev"))
}

if (process.env.NODE_ENV === "prod") {
    app.use(morgan("common", { skip: (_req, res) => res.statusCode < 400 }))
}

app.use(globalRoutes)

export default app;