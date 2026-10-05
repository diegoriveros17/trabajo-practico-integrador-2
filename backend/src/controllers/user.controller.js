import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { ProfileModel } from "../models/profile.model.js";
import { hashPassword } from "../helpers/bcrypt.helper.js";
import { Op } from "sequelize";
import { ArticleModel } from "../models/article.model.js";

export const getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.findAll({
      attributes: { exclude: ["password", "id", "createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: ProfileModel,
          as: "profile",
          attributes: { exclude: ["id", "user_id", "createdAt", "updatedAt"] },
        },
      ],
    });

    return res.status(200).json({
      message: "Listado de usuarios obtenido correctamente",
      users,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });

    const user = await UserModel.findByPk(id, {
      attributes: { exclude: ["password", "id", "createdAt", "updatedAt", "deletedAt"] },
      include: [
        {
          model: ProfileModel,
          as: "profile",
          attributes: { exclude: ["id", "user_id", "createdAt", "updatedAt"] },
        },
        {
          model: ArticleModel,
          as: "articles",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "El usuario que intenta consultar no existe",
      });
    }

    return res.status(200).json({
      message: "Usuario obtenido correctamente",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor al obtener usuario: ${error}`,
    });
  }
};

export const insertUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
      user_id,
    } = matchedData(req, { locations: ["body"] });

    const passwordHashed = await hashPassword(password);

    const userExist = await UserModel.findOne({
      where: {
        [Op.or]: [{ username: username }, { email: email }],
      },
    });

    if (userExist) {
      return res.status(409).json({
        message: `El nombre de usuario o email ya se encuentra en uso`,
      });
    }

    const newUser = await UserModel.create({
      username,
      email,
      password: passwordHashed,
      role,
    });

    await ProfileModel.create({
      first_name,
      last_name,
      biography,
      avatar_url,
      birth_date,
      user_id: newUser.id,
    });
    return res
      .status(201)
      .json({ message: `Usuario creado con su perfil correctamente` });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor ${error}`,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const userData = matchedData(req, {
      locations: ["body"],
    });

    const { id } = matchedData(req, {
      locations: ["params"],
    });

    const userExist = await UserModel.findByPk(id);

    if (userData.password) {
      userData.password = await hashPassword(userData.password);
    }

    if (!userExist) {
      return res
        .status(404)
        .json({ message: "El usuario que intenta modificar no existe" });
    }
    const user = await userExist.update(userData);
    return res.status(200).json({
      message: "Usuario modificado",
    });
  } catch (error) {
    res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = matchedData(req, { locations: ["params"] });
    const user = await UserModel.findByPk(id);
    if (!user) {
      return res.status(404).json({
        message: "El usuario que intenta eliminar no existe",
      });
    }

    await user.destroy();

    return res.status(200).json({
      message: "Usuario eliminado",
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};
