//1. Importar dependencias y modulos necesarios

import dotenv from "dotenv";
import jsonwebtoken from "jsonwebtoken";

//2. Configurar la variable de entorno
dotenv.config();

const secretKey = process.env.SECRET_KEY

//3. Configurar el uso del jsonwebtoken

//3.1 Metodo para generar un JMT
// payload es información del usuario
export const generateToken = (payload)=>{
    return new Promise((resolve, reject)=>{
                jsonwebtoken.sign(payload, secretKey, {expiresIn:"1h"},(error, token)=>{
                    if(error){
                        reject(new Error ("Hubo un error al generar el JWT", error.message));
                    }else {
                        resolve(token);
                    }
                })
    });
}

//3.2 Metodo para verificar un JWT
// Token info encriptada
export const verifyToken = (token)=>{
    return new Promise((resolve, reject)=>{
        jsonwebtoken.verify(token, secretKey, (error, decoded)=>{
            if(error){
                reject(new Error("Hubo error al verificar el JWT", error.message));
            }else {
                resolve(decoded);
            }
        })
    });
}