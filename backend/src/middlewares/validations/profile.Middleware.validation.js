import { body, param } from "express-validator";

export const createProfileValidation = [
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
  body("user_id")
    .notEmpty()
    .withMessage("El id no puede ser vacio")
    .isInt()
    .withMessage("El id debe ser un numero entero positivo")
    .custom(async (user_id) => {

      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }

      return true;
    })
];

export const updateProfileValidation = [
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
  body("biography")
    .optional()
    .isLength({ max: 500 })
    .withMessage("La biografía no puede superar los 500 caracteres"),
  body("avatar_url")
    .optional()
    .isURL()
    .withMessage("avatar_url debe tener un formato de URL válido"),
  body("birth_date")
    .optional()
    .isISO8601()
    .withMessage("birth_date debe ser una fecha válida en formato AAAA-MM-DD"),
];