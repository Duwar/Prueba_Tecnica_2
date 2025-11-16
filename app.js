import express from "express"
import dotenv from "dotenv";
import cors from "cors";
import { fileURLToPath } from "url"; // modulo de node
import path from "path"; // modulo de node
import { conexionMongo } from "./src/config/db.js";
import { userRouter } from './src/routes/usuario.routes.js';
import { loginRouter } from "./src/routes/login.routes.js";

const app = express();
dotenv.config();
const port = process.env.PORT;
conexionMongo (); // Esto hace la conexión con db
const _filename = fileURLToPath(import.meta.url); // _filename = backend/app.js
const _dirname = path.dirname(_filename); // _dirname = backend

// funcionalidades que necesite agregar
app.get("/",(req,res)=>{
res.send("El servidor funciona!")
});


app.use(cors()); // habilitar CORS
app.use(express.json()); //es para usar formato json
app.use('/users', userRouter);
app.use('/apuestas', userRouter);
app.use('/ruletas', userRouter);
app.use('/uploads', express.static(path.join(_dirname, "src/uploads")));
app.use("/login", loginRouter);

//levantar el servicio
app.listen(port, ()=>{
    console.log(`El servidor esta ejecutandose en http://localhost:${port}`)
});