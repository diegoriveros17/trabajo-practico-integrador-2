import { matchedData } from "express-validator";
import { UserModel } from "../models/user.model.js";
import { hashPassword, comparePassword } from "../helpers/bcrypt.helper.js";
import { generateToken } from "../helpers/jwt.helper.js";
import { Op } from "sequelize";
import { ProfileModel } from "../models/profile.model.js";

export const login = async (req, res) => {
  try {
    const { username, password } = matchedData(req, { locations: ["body"] });

    //comprobar si el usuario existe
    const userExist = await UserModel.findOne({ where: { username } });

    if (!userExist) {
      return res
        .status(401)
        .json({ message: "Usuario o contreña incorrectos" });
    }

    //comprobar si la contraseña que ingresa el usuario coincide con la de la bd
    const validPassword = await comparePassword(password, userExist.password);

    if (!validPassword) {
      return res
        .status(401)
        .json({ message: "Usuario o contreña incorrectos" });
    }

    const token = await generateToken({
      idUser: userExist,
    });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60, // 1 hora
    });

    return res
      .status(200)
      .json({ message: `Bienvenido, ${userExist.username}` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error} ` });
  }
};

export const register = async (req, res) => {
  try {
    const { username, email, password, first_name, last_name } = matchedData(
      req,
      {
        locations: ["body"],
      },
    );

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
    });

    await ProfileModel.create({
      first_name,
      last_name,
      user_id: newUser.id,
    });

    return res
      .status(201)
      .json({ message: `Usuario registrado correctamente` });
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error}` });
  }
};

export const logout = async (req, res) => {
  res.clearCookie("token"); //Eliminar cookie del navegador
  return res.json({ message: `Has cerrado sesion` });
};

export const getProfile = async (req, res) => {
  try {
    const userId = req.userData.idUser.id;

    const user = await UserModel.findByPk(userId, {
      attributes: { exclude: ["password"] },
      include: [
        {
          model: ProfileModel,
          as: "profile",
        },
      ],
    });

    if (!user) {
      return res.status(404).json({
        message: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      message: "Perfil obtenido",
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error}`,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userData.idUser.id;
    const profileData = matchedData(req, { locations: ["body"] });

    let profile = await ProfileModel.findOne({ where: { user_id: userId } });

    if (!profile) {
      profile = await ProfileModel.create({
        ...profileData,
        user_id: userId,
      });
    } else {
      await profile.update(profileData);
    }

    return res.status(200).json({
      message: "Perfil actualizado correctamente",
      profile,
    });
  } catch (error) {
    return res.status(500).json({
      message: `Error interno del servidor: ${error.message}`,
    });
  }
};
