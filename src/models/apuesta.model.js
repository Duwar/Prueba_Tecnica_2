import mongoose from "mongoose";

const ApuestaSchema = new mongoose.Schema({
    rouletteId: { type: mongoose.Schema.Types.ObjectId, ref: "Ruleta" },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario" },

    number: { type: Number, min: 0, max: 36 },
    color: { type: String, enum: ['rojo', 'negro'] },

    amount: { type: Number, max: 10000 },

    result: String,
    payout: Number
});

export const apuestaModel = mongoose.model("Apuesta", ApuestaSchema);