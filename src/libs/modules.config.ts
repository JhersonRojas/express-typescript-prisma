// Packages
import body from "body-parser";
import express from "express";
import morgan from "morgan";
import { config } from "dotenv";

// Routes
import globalRoutes from "../routes/global.routes";
import usersRoutes from "../routes/users.routes";

config()

export const app = express()

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

export const SERVER_PORT = process.env.PORT
export const SERVER_MODE = process.env.NODE_ENV

export const READY_MESSAGE = ` 
\x1b[32m ⚡️ \x1b[32m { Server }: \x1b[90m Mode\x1b[90m\x1b[32m ${SERVER_MODE} \x1b[32m
\x1b[32m ⚡️ \x1b[32m { Server }: \x1b[90m Running at\x1b[90m\x1b[32m http://localhost:${SERVER_PORT} \x1b[32m
`