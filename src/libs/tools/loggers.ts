export default new class Loggers {

    constructor() { }

    /**
     * Metodo para mostrar errores y extenciones de ellos
     */
    errors({ msg, error }: { msg: string; error?: Error | unknown; }): void {
        if (!error) return console.error({
            msg: msg,
            error: "Sin sintaxis expeficica para el error"
        })

        if (!(error instanceof Error)) return console.error({
            alert: "Ocurrió un error desconocido",
            msg: msg,
            details: error,
        })

        return console.error({
            msg: msg,
            error: error.message,
            details: error,
        })
    }
}
