import jwt from "jsonwebtoken";

//Generar Token
export const generateToken = async (payload) => {
  try {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", //Token válido por 1 hora
      //   expiresIn: process.env.JWT_EXPIRES //Alternativa desde .env
    });
  } catch (error) {
    throw new Error(`Error generando el Token, ${error.message} `);
  }
};

//Validar el Token JWT
export const verifyToken = async (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error(`Error verificando el Token, ${error.message} `);
  }
};
