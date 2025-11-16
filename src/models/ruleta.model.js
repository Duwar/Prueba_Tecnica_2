import mongoose from "mongoose";

const ruletaSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "closed"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    // Campos nuevos para guardar el resultado ganador
    winningNumber: {
        type: Number,
        min: 0,
        max: 36
    },
    winningColor: {
        type: String,
        enum: ["rojo", "negro"]
    }
});

export const ruletaModel = mongoose.model("Ruleta", ruletaSchema);
