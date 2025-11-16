import express from 'express';
import { postUsers, getAllUsers, putUserById, deleteUserById, getUserById } from '../controllers/user.controller.js';

// 2. configurar el router
export const userRouter = express.Router();

// 3. definir las rutas
userRouter.post("/crear", postUsers);
userRouter.get("/mostrar", getAllUsers);
userRouter.get("/mostrar/:id", getUserById);
userRouter.put("/actualizar/:id", putUserById);
userRouter.delete("/eliminar/:id", deleteUserById);