import { usuarioModel } from "../models/users.model.js";
import bcryptjs from "bcryptjs";

// 1. Crear un usuario (POST)
export const postUsers = async (request, response) => {
    try {

        // crear el nuevo usuario con la contraseña encriptada
        const codedPassword = await bcryptjs.hash(request.body.password, 10);
        const newUser = new usuarioModel({
            ...request.body,
            password: codedPassword

        });

        await newUser.save();

        return response.status(201).json({
            "mensaje": "Usuario creado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al crear el usuario",
            "error": error.message || error
        });
    }
};

// 2. Obtener todos los usuarios (GET)
export const getAllUsers = async (request, response) => {
    try {
        const allUsers = await usuarioModel.find().populate({  select: "name" }).select('-password');
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": allUsers
        });

    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar los usuarios",
            "error": error.message || error
        });
    }
};

//2.1 Obtener un usuario por ID (GET)
export const getUserById = async (request, response) => {
    try {
        const idForSearch = request.params.id;
        const userById = await usuarioModel.findById(idForSearch).populate({ select: "name" }).select('-password');
        return response.status(200).json({
            "mensaje": "Petición Exitosa",
            "data": userById
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al mostrar el usuario",
            "error": error.message || error
        });
    }
};

// 3. Actualizar un usuario por ID (PUT)
export const putUserById = async (request, response) => {
    try {
        const idForUpdate = request.params.id;

        // Buscar usuario existente
        const usuario = await usuarioModel.findById(idForUpdate);
        if (!usuario) {
            return res.status(404).json({ mensaje: "Usuario no encontrado" });
        }

        // Eliminar codigo_usuario del body para que no se pueda modificar
        if (request.body.codigo_usuario) delete request.body.codigo_usuario;

        // Construir objeto actualizado conservando los campos previos
        const usuarioActualizado = {
            ...usuario.toObject(),
            ...Object.fromEntries(
                Object.entries(request.body).filter(([_, v]) => v !== '' && v != null)
            ),
        };

        // Encriptar contraseña si se envió
        if (request.body.password && request.body.password.trim() !== "") {
            usuarioActualizado.password = await bcryptjs.hash(request.body.password, 10);
        }

        await usuarioModel.findByIdAndUpdate(idForUpdate, usuarioActualizado, {
            new: true,
            runValidators: true,
        });

        return response.status(200).json({
            mensaje: "Usuario actualizado correctamente"
        });

    } catch (error) {
        return response.status(400).json({
            mensaje: "ocurrio un error al actualizar usuario",
            error: error.message || error
        });
    }
};

// 4. Eliminar un usuario por ID (DELETE)
export const deleteUserById = async (request, response) => {
    try {
        const idForDelete = request.params.id;
        await usuarioModel.findByIdAndDelete(idForDelete);
        return response.status(200).json({
            "mensaje": "Usuario eliminado correctamente"
        });
    } catch (error) {
        return response.status(400).json({
            "mensaje": "ocurrio un error al eliminar usuario",
            "error": error.message || error
        });
    }
};