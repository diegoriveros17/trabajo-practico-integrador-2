import { body, param } from "express-validator";
import { ArticleModel, TagModel, UserModel } from "../../models/index.js";

export const validateArticleId = [
  param("id")
    .notEmpty()
    .withMessage("El ID del artículo es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El ID del artículo debe ser un número entero positivo")
    .custom(async (id) => {
      const article = await ArticleModel.findByPk(id);
      if (!article) {
        throw new Error("El artículo especificado no existe");
      }
      return true;
    }),
];

export const createArticleValidation = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("El título es obligatorio")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título puede tener entre 3 y 200 caracteres"),
  body("content")
    .trim()
    .notEmpty()
    .withMessage("El contenido es obligatorio")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
  body("user_id")
    .optional()
    .isInt({ min: 1 })
    .withMessage("El valor de user_id debe ser un número entero positivo")
    .custom(async (user_id) => {

      const user = await UserModel.findByPk(user_id);
      if (!user) {
        throw new Error("El usuario especificado no existe");
      }

      const userData = req.user.idUser;
      if (userData.role !== "admin" && user_id !== userData.id) {
        throw new Error("El usuario no coincide con el usuario autenticado");
      }
      return true;
    }),
];

export const updateArticleValidation = [
  param("id")
    .notEmpty()
    .withMessage("El id del artículo es obligatorio")
    .isInt({ min: 1 })
    .withMessage("El id del artículo debe ser un número entero positivo")
    .custom(async (value) => {
      const article = await ArticleModel.findByPk(value);
      if (!article) {
        throw new Error("El artículo especificado no existe");
      }
      return true;
    }),
  body("title")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El título no puede estar vacío")
    .isLength({ min: 3, max: 200 })
    .withMessage("El título debe tener entre 3 y 200 caracteres"),
  body("content")
    .optional()
    .trim()
    .notEmpty()
    .withMessage("El contenido no puede estar vacío")
    .isLength({ min: 50 })
    .withMessage("El contenido debe tener al menos 50 caracteres"),
  body("excerpt")
    .optional()
    .trim()
    .isLength({ max: 500 })
    .withMessage("Excerpt no puede superar los 500 caracteres"),
  body("status")
    .optional()
    .isIn(["published", "archived"])
    .withMessage("El estado solo puede ser 'published' o 'archived'"),
];

// Article-Tag
export const createArticleTagValidation = [
  body("article_id")
    .notEmpty()
    .withMessage("El article_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("article_id debe ser un número entero positivo")
    .custom(async (article_id) => {
      const article = await ArticleModel.findByPk(article_id);
      if (!article) {
        throw new Error("El artículo especificado no existe");
      }
      return true;
    }),
  body("tag_id")
    .notEmpty()
    .withMessage("El tag_id es obligatorio")
    .isInt({ min: 1 })
    .withMessage("tag_id debe ser un número entero positivo")
    .custom(async (tag_id) => {
      const tag = await TagModel.findByPk(tag_id);
      if (!tag) {
        throw new Error("La etiqueta especificada no existe");
      }
      return true;
    }),
];

export const validateArticleTagId = [
  param("articleTagId")
    .notEmpty()
    .withMessage("El articleTagId es obligatorio")
    .isInt({ min:})
    .withMessage("El articleTagId debe ser un número entero positivo"),
];
