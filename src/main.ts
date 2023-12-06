import app from "./libs/modules.config";

const SERVER_PORT = process.env.PORT;

async function Main() {
    try {

        app.listen(SERVER_PORT)

        console.log(`⚡️ { servidor }: Server is running at http://localhost:${SERVER_PORT}`)

    } catch (error) {
        console.error({
            error: "No se ha iniciado el servidor",
            details: error
        })
    }
}

Main()
