import { config } from 'dotenv'
import express, { Express, Request, Response } from 'express'

config()

async function Main() {
    try {

        const app: Express = express()
        const port = process.env.PORT

        app.get('/', (req: Request, res: Response) => {
            res.send('Express + TypeScript + Prisma')
        })

        app.listen(port)

        console.log(`⚡️ { servidor }: Server is running at http://localhost:${port}`)

    } catch (error) {
        console.error({
            error: "No se ha iniciado el servidor",
            details: error
        })
    }
}

Main()
