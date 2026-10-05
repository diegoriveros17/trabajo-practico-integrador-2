import { body, param } from "express-validator";
import { UserModel } from "../../models";

export const loginUserValidation = [
  body("username").notEmpty().withMessage("El username no puede ser vacio"),
  body("password").notEmpty().withMessage("La password no puede estar vacia"),
];

export const createUserValidation = [
  body("username")
    .trim()
    .notEmpty()
    .withMessage("El nombre de usuario es obligatorio")
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El nombre de usuario solo puede contener caracteres alfanuméricos")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username } });
      if (user) {
        throw new Error("El nombre de usuario ya se encuentra en uso");
      }
      return true;
    }),
  body("email")
    .trim()
    .notEmpty()
    .withMessage("El correo electrónico es obligatorio")
    .isEmail()
    .withMessage("El correo electrónico no es válido")
    .isLength({ max: 100 })
    .withMessage("El correo electrónico no puede exceder los 100 caracteres")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        throw new Error("El correo electrónico ya se encuentra registrado");
      }
      return true;
    }),
  body("password")
    .notEmpty()
    .withMessage("La contraseña es obligatoria")
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      "La contraseña debe tener mínimo 8 caracteres y contener al menos una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
  body("first_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El nombre debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El nombre solo debe contener letras"),
  body("last_name")
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage("El apellido debe tener entre 2 y 50 caracteres")
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage("El apellido solo debe contener letras"),
];

export const updateUserValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
  body("username")
    .optional()
    .trim()
    .isLength({ min: 3, max: 20 })
    .withMessage("El nombre de usuario debe tener entre 3 y 20 caracteres")
    .matches(/^[a-zA-Z0-9]+$/)
    .withMessage("El nombre de usuario solo puede contener caracteres alfanuméricos")
    .custom(async (username) => {
      const user = await UserModel.findOne({ where: { username } });
      if (user) {
        throw new Error("El nombre de usuario ya está en uso");
      }
      return true;
    }),
  body("email")
    .optional()
    .trim()
    .isEmail()
    .withMessage("Debe proporcionar un formato de correo electrónico válido")
    .isLength({ max: 100 })
    .withMessage("El correo no puede superar los 100 caracteres")
    .custom(async (email) => {
      const user = await UserModel.findOne({ where: { email } });
      if (user) {
        throw new Error("El correo electrónico ya está en uso");
      }
      return true;
    }),
  body("password")
    .optional()
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/)
    .withMessage(
      "La contraseña debe tener mínimo 8 caracteres y contener al menos una mayúscula, una minúscula y un número",
    ),
  body("role")
    .optional()
    .isIn(["user", "admin"])
    .withMessage("El rol solo puede ser 'user' o 'admin'"),
];

export const validateUserId = [
  param("id")
    .notEmpty()
    .withMessage("El parámetro id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id debe ser un número entero positivo")
    .custom(async (id) => {
      const user = await UserModel.findByPk(id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }
      return true;
    }),
];
