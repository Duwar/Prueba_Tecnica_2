import { usuarioModel } from "../models/users.model.js";
import { generateToken } from "../config/jwt.js";
import bcryptjs from "bcryptjs";

export const login = async (request, response) => {
 try {

    const {userLogin, passwordLogin} = request.body;

    const userFound = await usuarioModel.findOne({
        email: userLogin

    });

    console.log("usuario encontrado:", userFound);

    if(!userFound){
        return response.status(404).json({
            "mensaje": "usuario no encontrado, registrate por favor "   
        });
    }

    const validPassword = await bcryptjs.compare(passwordLogin, userFound.password);
 
      if(!validPassword){
        return response.status(401).json({
            "mensaje": "contraseña Incorrecta "
        });
    }

    // generacion de token  
    const payload = {
        id: userFound._id,
        user: userFound.email
    }

    if(userFound.role === "admin"){
        payload.admin = true;
    } else {
        payload.admin = false;
    }

    const token = await generateToken(payload);
    console.log("payload : ", payload);
    console.log("token", token);

    return response.status(200).json({
        "mensaje" : "Login exitoso!!",
        "token" : token,
        _id: userFound._id,
        role: userFound.role
    })

 } catch (error){ 
    return response.status(401).json({
      "mensaje": "Error en el inicio de sesión ",
      "error": error.message || error
    });


 }
}