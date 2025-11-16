import express from "express";
import {placeBet} from "../controllers/apuesta.controller.js";
import { auth } from "../middleware/auth.js";

export const apuestaRouter = express.Router();

apuestaRouter.post('/:rouletteId',auth("user"), placeBet);

