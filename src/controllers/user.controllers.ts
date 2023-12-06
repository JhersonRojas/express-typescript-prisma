// Packages
import { Request, Response } from "express";

// interfaces
import type { ResponseBody } from "../libs/interfaces/global";

// libs
import { Users } from "../libs/prisma/prisma.config";
import loggers from "../libs/tools/loggers";

/**
 * Obtiene los usuarios del sistema
 * 
 */
export async function selectUsers(_req: Request, response: Response<ResponseBody>) {
    try {

        const users = await Users.findMany()

        if (!users || users.length === 0) return response.status(204).json({
            error: "No hay usuarios disponibles para listar",
        });

        return response.status(200).json({
            msg: "Listado de usuarios",
            data: users
        });

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al obtener los usuarios",
            error
        })
        return response.status(500).json({
            error: "Error al solicitar los usuarios"
        })
    }
}
