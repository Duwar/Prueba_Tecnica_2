import { ruletaModel } from "../models/ruleta.model.js";
import { apuestaModel } from "../models/apuesta.model.js";

export const placeBet = async (req, res) => {
    const { rouletteId } = req.params;
    const { number, color, amount } = req.body;

    const roulette = await ruletaModel.findById(rouletteId);
    if (!roulette || roulette.status !== 'open') {
        return res.status(400).json({ error: "La ruleta no está abierta" });
    }

    if (amount > 10000) {
        return res.status(400).json({ error: "Monto máximo es 10,000" });
    }

    if (!number && !color) {
        return res.status(400).json({ error: "Debe apostar a número o color" });
    }

    if (number && (number < 0 || number > 36)) {
        return res.status(400).json({ error: "Número inválido" });
    }

    const apuesta = await apuestaModel.create({
        rouletteId,
        userId: req.user.id,
        number,
        color,
        amount
    });

    res.json({ message: "Apuesta registrada", apuesta });
};
