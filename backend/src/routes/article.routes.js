import { Router } from "express";
import {
  createArticle,
  deleteArticle,
  getArticleById,
  getMyArticleById,
  getMyPublishedArticles,
  getPublishedArticles,
  updateArticle,
} from "../controllers/article.controller.js";
import {
  addTagToArticle,
  removeTagFromArticle,
} from "../controllers/articles_tags.controller.js";
import { validate } from "../middlewares/validate.js";
import { authMiddleware } from "../middlewares/validations/authMiddleware.validation.js";
import {
  ownerOrAdminArticleMiddleware,
  articleAuthorOnlyMiddleware,
  articleTagAuthorOnlyMiddleware,
} from "../middlewares/validations/ownerMiddleware.validation.js";
import {
  createArticleValidation,
  updateArticleValidation,
  validateArticleId,
  createArticleTagValidation,
  validateArticleTagId,
} from "../middlewares/validations/articleMiddleware.validation.js";

export const articleRouter = Router();

// Crear artículo. (usuario autenticado)
articleRouter.post(
  "/articles",
  authMiddleware,
  createArticleValidation,
  validate,
  createArticle,
);

// Listar artículos publicados. (usuario autenticado)
articleRouter.get("/articles", authMiddleware, getPublishedArticles);

// Listar artículos publicados del usuario logueado. (usuario autenticado)
articleRouter.get("/articles/user", authMiddleware, getMyPublishedArticles);

// Obtener artículo del usuario logueado por su id. (usuario autenticado)
articleRouter.get(
  "/articles/user/:id",
  authMiddleware,
  validateArticleId,
  validate,
  getMyArticleById,
);

// Obtener artículo por su id. (usuario autenticado)
articleRouter.get(
  "/articles/:id",
  authMiddleware,
  validateArticleId,
  validate,
  getArticleById,
);

// Actualizar artículo (solo autor o admin)
articleRouter.put(
  "/articles/:id",
  authMiddleware,
  validateArticleId,
  validate,
  ownerOrAdminArticleMiddleware,
  updateArticleValidation,
  validate,
  updateArticle,
);

// Eliminación en cascada (solo autor o admin)
articleRouter.delete(
  "/articles/:id",
  authMiddleware,
  validateArticleId,
  validate,
  ownerOrAdminArticleMiddleware,
  deleteArticle,
);

// Articles Tags:
// Agregar etiqueta a artículo. (solo autor)
articleRouter.post(
  "/articles-tags",
  authMiddleware,
  createArticleTagValidation,
  validate,
  articleAuthorOnlyMiddleware,
  addTagToArticle,
);

// Remover etiqueta de artículo. (solo autor)
articleRouter.delete(
  "/articles-tags/:articleTagId",
  authMiddleware,
  validateArticleTagId,
  validate,
  articleTagAuthorOnlyMiddleware,
  removeTagFromArticle,
);
