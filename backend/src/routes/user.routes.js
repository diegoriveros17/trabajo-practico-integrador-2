import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getUserById,
  insertUser,
  updateUser,
} from "../controllers/user.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/validations/authMiddleware.validation.js";
import { adminMiddleware } from "../middlewares/validations/adminMiddleware.validation.js";
import {
  createUserValidation,
  updateUserValidation,
  validateUserId,
} from "../middlewares/validations/userMiddleware.validation.js";
import { createProfileValidation } from "../middlewares/validations/profile.Middleware.validation.js";

export const userRouter = Router();

userRouter.get("/users", authMiddleware, adminMiddleware, getAllUsers); // Listar todos los usuarios con sus perfiles. (solo admin)

userRouter.get(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  validate,
  getUserById,
); //Obtener usuario específico con perfil y artículos. (solo admin)

userRouter.post(
  "/users",
  authMiddleware,
  adminMiddleware,
  createUserValidation,
  createProfileValidation,
  validate,
  insertUser,
); //Crear un usuario con su perfil. (solo admin)

userRouter.put(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  updateUserValidation,
  validate,
  updateUser,
); //Actualizar usuario (solo admin)

userRouter.delete(
  "/users/:id",
  authMiddleware,
  adminMiddleware,
  validateUserId,
  validate,
  deleteUser,
); //Eliminación  de usuario (solo admin).
