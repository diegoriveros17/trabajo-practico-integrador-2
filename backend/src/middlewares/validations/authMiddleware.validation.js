import { verifyToken } from "../../helpers/jwt.helper.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies["token"];

    if (!token) {
      return res
        .status(401)
        .json({ message: `Debes iniciar sesion para poder continuar` });
    }

    const decodeToken = await verifyToken(token);

    req.userData = decodeToken;

    //console.log(req.userData)
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error}` });
  }
};
