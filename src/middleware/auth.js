import { verifyToken } from "../config/jwt.js";

export const auth = (allowedRoles) => {
  return async (req, res, next) => {
    try {
      // 1. Verificar que exista token
      const tokenHeader = req.headers["authorization"];
      if (!tokenHeader) {
        return res.status(401).json({ mensaje: "No se encontró token, permiso denegado" });
      }

      // 2. Extraer token del formato "Bearer <token>"
      const token = tokenHeader.split(" ")[1];
      if (!token) {
        return res.status(401).json({ mensaje: "Token mal formado" });
      }

      // 3. Decodificar token
      const decoded = await verifyToken(token);
      req.user = decoded; // guardamos info del usuario en request

      // 4. Normalizar allowedRoles a array
      if (typeof allowedRoles === "string") allowedRoles = [allowedRoles];

      // 5. Verificar rol del usuario
      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ mensaje: "Acceso no permitido para tu rol" });
      }

      // 6. Continuar con la siguiente función
      next();
    } catch (error) {
      console.error("Error en auth middleware:", error);
      return res.status(401).json({ mensaje: "Fallo la autenticación", error: error.message || error });
    }
  };
};
