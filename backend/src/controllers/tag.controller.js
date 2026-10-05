import { matchedData } from "express-validator";
import { TagModel, ArticleModel } from "../models/index.js";

export const createTag = async (req, res) => {
  try {
    const { name } = matchedData(req, { locations: ["body"] });

    const tag = await TagModel.create({ name });

    return res.status(201).json({
      message: "Etiqueta creada exitosamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getAllTags = async (req, res) => {
  try {
    const tags = await TagModel.findAll();

    return res.status(200).json({
      message: "Listado de etiquetas obtenido exitosamente",
      tags,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getTagById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const tag = await TagModel.findByPk(id, {
      include: [
        {
          model: ArticleModel,
          as: "articles",
          through: { attributes: [] },
        },
      ],
    });

    if (!tag) {
      return res.status(404).json({
        message: "La etiqueta solicitada no existe",
      });
    }

    return res.status(200).json({
      message: "Etiqueta obtenida exitosamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const updateTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const { name } = matchedData(req, { locations: ["body"] });

    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({
        message: "La etiqueta que intenta actualizar no existe",
      });
    }

    await tag.update({ name });

    return res.status(200).json({
      message: "Etiqueta actualizada exitosamente",
      tag,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteTag = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const tag = await TagModel.findByPk(id);
    if (!tag) {
      return res.status(404).json({
        message: "La etiqueta que intenta eliminar no existe",
      });
    }

    await tag.destroy();

    return res.status(200).json({
      message: "Etiqueta eliminada exitosamente",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
