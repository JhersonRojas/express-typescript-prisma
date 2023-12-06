// Packages
import { randomUUID } from 'crypto';
import { Request, Response } from "express";

// interfaces
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import type { RequestBody, ResponseBody } from "../libs/interfaces/global";

// libs
import { ModelDisconnect, Users } from "../libs/prisma/prisma.config";
import loggers from "../libs/tools/loggers";

/**
 * @description Obtiene los usuarios
 */
export async function selectUsers(_req: Request, response: Response<ResponseBody>) {
    try {
        const users = await Users.findMany()

        if (!users || users.length === 0) return response.status(200).json({
            validated: false,
            error: "No hay usuarios disponibles para listar",
        })

        return response.status(200).json({
            validated: true,
            msg: "Usuarios obtenidos exitosamente",
            data: users
        })

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al obtener los usuarios",
            error
        })
        return response.status(500).json({
            validated: false,
            error: "Error al solicitar los usuarios"
        })

    } finally {
        await ModelDisconnect()

    }
}

/**
 * @description Obtiene un usuario especifico
 */
export async function selectUser(req: Request, response: Response<ResponseBody>) {
    try {
        const { id } = req.params

        const user = await Users.findUnique({
            where: {
                id
            }
        })

        if (!user) return response.status(200).json({
            validated: false,
            error: "Usuario no encontrado",
        })

        return response.status(200).json({
            validated: true,
            msg: "Usuario obtenido exitosamente",
            data: user
        })

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al obtener un usuario",
            error
        })
        return response.status(500).json({
            validated: false,
            error: "Error al solicitar el usuario"
        })

    } finally {
        await ModelDisconnect()

    }
}

/**
 * @description Crea un nuevo usuario
 */
export async function createUser(req: Request, response: Response<ResponseBody>) {
    try {
        const { data: { name, email, phone } }: RequestBody = req.body

        if (!name || !email) return response.status(401).json({
            validated: false,
            error: "Campos necesarios faltan para el ingreso del usuario",
        })

        const user = await Users.create({
            data: {
                id: randomUUID(),
                email,
                name,
                phone: phone ? Number(phone) : null
            }
        })

        if (!user) return response.status(204).json({
            validated: false,
            error: "No hay usuarios disponibles para listar",
        })

        return response.status(201).json({
            validated: true,
            msg: "Usuario creado exitosamente",
            data: user,
        })

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al crear el usuario",
            error
        })

        if (error instanceof PrismaClientKnownRequestError && error.code === "P2002")
            return response.status(500).json({
                validated: false,
                error: "Algún dato del usuario ya esta ingresado en el sistema"
            })

        return response.status(500).json({
            validated: false,
            error: "Error al crear el usuario"
        })

    } finally {
        await ModelDisconnect()

    }
}

/**
 * @description Actualiza un usuario existente
 */
export async function updateUser(req: Request, response: Response<ResponseBody>) {
    try {
        const { data: { id, name, email, phone } }: RequestBody = req.body

        if (!id || !name || !email) return response.status(400).json({
            validated: false,
            error: "Campos necesarios faltan para la actualización del usuario",
        })

        const user = await Users.update({
            where: {
                id
            },
            data: {
                name,
                email,
                phone: phone ? Number(phone) : null
            }
        })

        if (!user) return response.status(404).json({
            validated: false,
            error: "Usuario no encontrado",
        })

        return response.status(200).json({
            validated: true,
            msg: "Usuario actualizado exitosamente",
            data: user,
        })

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al actualizar el usuario",
            error
        })

        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
            return response.status(500).json({
                validated: false,
                error: "El usuario que intenta actualizar no existe en el sistema"
            })

        return response.status(500).json({
            validated: false,
            error: "Error al actualizar el usuario"
        })

    } finally {
        await ModelDisconnect()

    }
}

/**
 * @description Elimina un usuario existente
 */
export async function deleteUser(req: Request, response: Response<ResponseBody>) {
    try {
        const { data: { id } }: RequestBody = req.body

        if (!id) return response.status(400).json({
            validated: false,
            error: "Campos necesarios faltan para eliminar al usuario",
        })

        const user = await Users.delete({
            where: {
                id
            }
        })

        if (!user) return response.status(404).json({
            validated: false,
            error: "Usuario no encontrado",
        })

        return response.status(200).json({
            validated: true,
            msg: "Usuario eliminado exitosamente",
            data: user,
        })

    } catch (error) {
        loggers.errors({
            msg: "controllers/ Error al eliminar el usuario",
            error
        })

        if (error instanceof PrismaClientKnownRequestError && error.code === "P2025")
            return response.status(500).json({
                validated: false,
                error: "El usuario que intenta eliminar no existe en el sistema"
            })

        return response.status(500).json({
            validated: false,
            error: "Error al eliminar el usuario"
        })

    } finally {
        await ModelDisconnect()

    }
}
