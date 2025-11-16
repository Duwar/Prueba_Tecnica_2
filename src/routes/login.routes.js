import express from "express";
import { login } from "../services/login.js";


export const loginRouter = express.Router();

//3. Ruta para el POST 
loginRouter.post("/", login);

