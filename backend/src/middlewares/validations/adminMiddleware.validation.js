export const adminMiddleware = async (req, res, next) => {
  try {
    const { role } = req.userData.idUser;

    if (role !== "admin") {
      return res.status(403).json({
        message: `Acceso Denegado: Se requiere permisos de Administrador`,
      });
    }

    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: `Error interno del servidor ${error}` });
  }
};
