import express from "express";
import { auth } from "../middleware/auth.js";
import {createRoulette, openRoulette, closeRoulette, listRoulettes} from "../controllers/ruleta.controller.js";

export const ruletasRouter = express.Router();

ruletasRouter.post('/crear', auth("admin"), createRoulette);
ruletasRouter.put('/open/:id', auth("admin"), openRoulette);
ruletasRouter.put('/close/:rouletteId', auth("admin"), closeRoulette);
ruletasRouter.get('/', listRoulettes);

