import { UserModel } from "./user.model.js";
import { ProfileModel } from "./profile.model.js";
import { ArticleModel } from "./article.model.js";
import { TagModel } from "./tag.model.js";
import { ArticleTagModel } from "./article_tag.model.js";

// Relación 1 a 1  User <-> Profile
UserModel.hasOne(ProfileModel, {
  foreignKey: "user_id",
  as: "profile",
  onDelete: "CASCADE",
});

ProfileModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "user",
});

// Relación 1 a muchos : User -> Article
UserModel.hasMany(ArticleModel, {
  foreignKey: "user_id",
  as: "articles",
  onDelete: "CASCADE",
});

ArticleModel.belongsTo(UserModel, {
  foreignKey: "user_id",
  as: "author",
});

// Relación muchos a muchos : Article <-> Tag a través de ArticleTag

ArticleModel.belongsToMany(TagModel, {
  through: ArticleTagModel,
  foreignKey: "article_id",
  otherKey: "tag_id",
  as: "tags",
  onDelete: "CASCADE",
});

TagModel.belongsToMany(ArticleModel, {
  through: ArticleTagModel,
  foreignKey: "tag_id",
  otherKey: "article_id",
  as: "articles",
  onDelete: "CASCADE",
});

export { UserModel, ProfileModel, ArticleModel, TagModel, ArticleTagModel };
