// Packages
import body from "body-parser";
import express from "express";
import morgan from "morgan";
import { config } from "dotenv";

// Routes
import globalRoutes from "../routes/global.routes";
import usersRoutes from "../routes/users.routes";

config()

const app = express()

app.use(body.json())
app.use(body.urlencoded({ extended: false }))
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
    app.use(morgan("dev"))
}

if (process.env.NODE_ENV === "production") {
    app.use(morgan("common", { skip: (_req, res) => res.statusCode < 400 }))
}

app.use(globalRoutes)
app.use(usersRoutes)

export default app;