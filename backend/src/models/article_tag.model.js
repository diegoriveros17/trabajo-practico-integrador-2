import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const ArticleTagModel = sequelize.define(
  "ArticleTag",
  {
    article_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "articles",
        key: "id",
      },
    },
    tag_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "tags",
        key: "id",
      },
    },
  },
  {
    timestamps: true,
    paranoid: false,
  },
);
