import { ArticleModel, ArticleTagModel } from "../../models/index.js";

// validar que el usuario autenticado sea el autor del artículo o admin
export const ownerOrAdminArticleMiddleware = async (req, res, next) => {
  try {
    const articleId = req.params.id;
    const userId = req.userData.idUser.id;
    const userRole = req.userData.idUser.role;

    const article = await ArticleModel.findByPk(articleId);
    if (!article) {
      return res.status(404).json({
        message: "El artículo solicitado no existe",
      });
    }

    // Permitir si es admin o si es el autor
    if (userRole === "admin" || article.user_id === userId) {
      req.article = article;
      return next();
    }

    return res.status(403).json({
      message:
        "Acceso denegado: Solo el autor o un administrador pueden modificar o eliminar este artículo",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

// verificar que solo el autor pueda gestionar tags de su artículo
export const articleAuthorOnlyMiddleware = async (req, res, next) => {
  try {
    const articleId = req.body.article_id;
    const userId = req.userData.idUser.id;

    const article = await ArticleModel.findByPk(articleId);
    if (!article) {
      return res.status(404).json({
        message: "El artículo indicado no existe",
      });
    }

    if (article.user_id !== userId) {
      return res.status(403).json({
        message:
          "Acceso denegado: Solo el autor del artículo puede gestionar sus etiquetas",
      });
    }

    req.article = article;
    next();
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

// remover etiqueta verificando autoría del artículo
export const articleTagAuthorOnlyMiddleware = async (req, res, next) => {
  try {
    const { articleTagId } = req.params;
    const userId = req.userData.idUser.id;

    const articleTag = await ArticleTagModel.findByPk(articleTagId, {
      include: ["article"],
    });

    if (!articleTag) {
      return res.status(404).json({
        message: "La asociación de etiqueta y artículo no existe",
      });
    }

    if (articleTag.article?.user_id !== userId) {
      return res.status(403).json({
        message:
          "Acceso denegado: Solo el autor del artículo puede remover sus etiquetas",
      });
    }

    req.articleTag = articleTag;
    next();
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
