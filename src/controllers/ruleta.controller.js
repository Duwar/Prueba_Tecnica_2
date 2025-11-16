import { usuarioModel } from "../models/users.model.js";
import { ruletaModel } from "../models/ruleta.model.js";
import { apuestaModel } from "../models/apuesta.model.js";

export const createRoulette = async (req, res) => {
    const roulette = await ruletaModel.create({});
    res.json({ id: roulette._id });
};

export const openRoulette = async (req, res) => {
    const { id } = req.params;
    const roulette = await ruletaModel.findById(id);

    if (!roulette) return res.status(404).json({ error: "Ruleta no encontrada" });

    roulette.status = "open";
    await roulette.save();

    res.json({ message: "Ruleta abierta" });
};

export const listRoulettes = async (req, res) => {
    const roulettes = await ruletaModel.find();
    res.json(roulettes);
};

export const resultadoRoulettes = async (req, res) => {
    const { rouletteId } = req.params;
    const roulette = await ruletaModel.findById(rouletteId);

    if (!roulette) {
        return res.status(404).json({ mensaje: "Ruleta no encontrada" });
    }

    const apuestas = await apuestaModel.find({ rouletteId }).populate('userId', 'name email');

    res.json({
        roulette,
        apuestas,
        winningNumber: roulette.winningNumber,
        winningColor: roulette.winningColor
    });
};


export const closeRoulette = async (req, res) => {
    const { rouletteId } = req.params;

    const roulette = await ruletaModel.findById(rouletteId);
    if (!roulette) return res.status(404).json({ message: 'Ruleta no encontrada' });

    roulette.status = "closed";

    // Guardamos el número y color ganador en la ruleta
    roulette.winningNumber = Math.floor(Math.random() * 37);
    roulette.winningColor = roulette.winningNumber % 2 === 0 ? "rojo" : "negro";

    await roulette.save();

    const bets = await apuestaModel.find({ rouletteId });
    const results = [];

    for (const bet of bets) {
        let won = false;
        let payout = 0;

        if (bet.number !== undefined && bet.number === roulette.winningNumber) {
            won = true;
            payout = bet.amount * 5;
        }

        if (bet.color && bet.color === roulette.winningColor) {
            won = true;
            payout = bet.amount * 1.8;
        }

        bet.result = won ? "win" : "lose";
        bet.payout = payout;
        await bet.save();

        results.push({
            userId: bet.userId,
            bet: bet.number ?? bet.color,
            result: bet.result,
            payout
        });
    }

    res.json({
        message: "Ruleta cerrada",
        winningNumber: roulette.winningNumber,
        winningColor: roulette.winningColor,
        results
    });
};

