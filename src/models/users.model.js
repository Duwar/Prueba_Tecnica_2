import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["admin", "user"], default: "user" },
    balance: { type: Number, default: 0 }
});

export const usuarioModel = mongoose.model("Usuario", UsuarioSchema);