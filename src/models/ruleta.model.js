import mongoose from "mongoose";

const RuletaSchema = new mongoose.Schema({
    status: { type: String, enum: ['open', 'closed'], default: 'closed' },
    createdAt: { type: Date, default: Date.now }
});


export const ruletaModel = mongoose.model("Ruleta", RuletaSchema);