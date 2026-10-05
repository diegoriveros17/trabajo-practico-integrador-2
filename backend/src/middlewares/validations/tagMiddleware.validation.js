import { body, param } from "express-validator";
import { TagModel } from "../../models/index.js";

export const validateTagId = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la etiqueta es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El ID de la etiqueta debe ser un número entero positivo"),
];

export const createTagValidation = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta es obligatorio")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres")
    .custom(async (name) => {
      const tag = await TagModel.findOne({ where: { name } });
      if (tag) {
        throw new Error("Ya existe una etiqueta con este nombre");
      }
      return true;
    }),
];

export const updateTagValidation = [
  param("id")
    .notEmpty()
    .withMessage("El ID de la etiqueta es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El ID de la etiqueta debe ser un número entero positivo"),
  body("name")
    .trim()
    .notEmpty()
    .withMessage("El nombre de la etiqueta no puede estar vacío")
    .isLength({ min: 2, max: 30 })
    .withMessage("El nombre de la etiqueta debe tener entre 2 y 30 caracteres"),
];
