import { matchedData } from "express-validator";
import { ArticleModel, TagModel, ArticleTagModel } from "../models/index.js";

export const addTagToArticle = async (req, res) => {
  try {
    const { article_id, tag_id } = matchedData(req, { locations: ["body"] });

    const existingTag = await ArticleTagModel.findOne({
      where: { article_id, tag_id },
    });

    if (existingTag) {
      return res.status(409).json({
        message: "El artículo ya tiene asignada esta etiqueta",
      });
    }

    const newTag = await ArticleTagModel.create({
      article_id,
      tag_id,
    });

    const articleWithTags = await ArticleModel.findByPk(article_id, {
      attributes: {
        exclude: ["id", "createdAt", "updatedAt", "deletedAt", "user_id"],
      },
      include: [
        {
          model: TagModel,
          as: "tags",
          through: { attributes: [] },
        },
      ],
    });

    return res.status(201).json({
      message: "Etiqueta agregada al artículo correctamente",
      articleTag: newTag,
      article: articleWithTags,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const removeTagFromArticle = async (req, res) => {
  try {
    const { articleTagId } = req.params;

    const tagArticle = await ArticleTagModel.findByPk(articleTagId);

    if (!tagArticle) {
      return res.status(404).json({
        message: "La relación entre el artículo y la etiqueta no existe",
      });
    }

    await association.destroy();

    return res.status(200).json({
      message: "Etiqueta eliminada del artículo correctamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
