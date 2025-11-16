import { usuarioModel } from "../models/users.model.js";
import { ruletaModel } from"../models/ruleta.model.js";
import { apuestaModel } from"../models/apuesta.model.js";

exports.createRoulette = async (req, res) => {
    const roulette = await ruletaModel.create({});
    res.json({ id: roulette._id });
};

exports.openRoulette = async (req, res) => {
    const { id } = req.params;
    const roulette = await ruletaModel.findById(id);

    if (!roulette) return res.status(404).json({ error: "Ruleta no encontrada" });

    roulette.status = "open";
    await roulette.save();

    res.json({ message: "Ruleta abierta" });
};

exports.listRoulettes = async (req, res) => {
    const roulettes = await ruletaModel.find();
    res.json(roulettes);
};

exports.closeRoulette = async (req, res) => {
    const { rouletteId } = req.params;

    const roulette = await ruletaModel.findById(rouletteId);
    if (!roulette) return res.status(404).json({ message: 'Ruleta no encontrada' });

    roulette.status = "closed";
    await roulette.save();

    const winningNumber = Math.floor(Math.random() * 37);
    const winningColor = winningNumber % 2 === 0 ? "rojo" : "negro";

    const bets = await apuestaModel.find({ rouletteId });

    const results = [];

    for (const bet of bets) {
        let won = false;
        let payout = 0;

        if (bet.number !== undefined && bet.number === winningNumber) {
            won = true;
            payout = bet.amount * 5;
        }

        if (bet.color && bet.color === winningColor) {
            won = true;
            payout = bet.amount * 1.8;
        }

        bet.result = won ? "win" : "lose";
        bet.payout = payout;
        await bet.save();

        if (won) {
            const user = await usuarioModel.findById(bet.userId);
            user.balance += payout;
            await user.save();
        }

        results.push({
            userId: bet.userId,
            bet: bet.number ?? bet.color,
            result: bet.result,
            payout
        });
    }

    res.json({
        message: "Ruleta cerrada",
        winningNumber,
        winningColor,
        results
    });
};
