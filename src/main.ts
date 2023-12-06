// libs
import { app, READY_MESSAGE, SERVER_MODE, SERVER_PORT } from "./libs/modules.config";
import loggers from "./libs/tools/loggers";

async function Main() {
    try {

        if (!SERVER_PORT)
            throw new Error("No se ha obtenido el puerto del servidor")

        if (!SERVER_MODE)
            throw new Error("No se ha obtenido el modo del servidor")

        app.listen(SERVER_PORT, () => {
            console.log(READY_MESSAGE)
        })

    } catch (error) {
        loggers.errors({
            msg: "No se ha iniciado el servidor",
            error
        })
    }
}

Main()
