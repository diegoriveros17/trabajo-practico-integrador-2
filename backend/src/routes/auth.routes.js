import { Router } from "express";
import { getProfile, login, logout, register, updateProfile } from "../controllers/auth.controller.js";
import { validate } from "../middlewares/validate.js";
import {
  createUserValidation,
  loginUserValidation,
} from "../middlewares/validations/userMiddleware.validation.js";
import { authMiddleware } from "../middlewares/validations/authMiddleware.validation.js";
import { updateProfileValidation } from "../middlewares/validations/profile.Middleware.validation.js";

export const authRouter = Router();

authRouter.post("/login", loginUserValidation, validate, login); // -> Controller para comprobar las credenciaaes

authRouter.post("/register", createUserValidation, validate, register); //-> Controller para registrar un usuario

authRouter.get("/logout", logout); //-> controller para cerrar sesion

authRouter.get("/profile", authMiddleware, getProfile);

// PUT /api/auth/profile: Actualizar perfil del usuario autenticado. (usuario autenticado)
authRouter.put(
  "/auth/profile",
  authMiddleware,
  updateProfileValidation,
  validate,
  updateProfile,
);