import { verifyToken } from "../config/jwt.js";

export const auth = (reqRole)=>{
    return async (request, response, next) =>{

        // 1. Verificar si si se envia un token en la cabecera de la petición
        const token = request.headers["authorization"];
        console.log("El token recibido en la cabecera de la petición " + token);

        if(!token){
            return response.status(401).json({
                "mensaje":"No se encontro token, permiso denegado"
            });
        }

        //2. Verificar que el token sea permitido (JWT)
        const allowedToken = token.split(" ")[1];
        console.log("Token después de separarlo del Bearer: " + allowedToken)

        try {
            const decoded = await verifyToken(allowedToken);
            console.log("información decodificación del token " , decoded);
         
         //3. Verificar especificamente si el rol es adminsitardor
         if(reqRole === "admin" && decoded.admin === false){
            return response.status(401).json({
                "mensaje" : "Acesso no permitido, se requiere perfil de administrador"
            });
         }   
        } catch (error) {
            return response.status(401).json({
                "mensaje" : "Fallo la autenticación: Token no permitido"
            })
        }
        
//Indica que debe continuar con el siguiente proceso

        next();
    }

}