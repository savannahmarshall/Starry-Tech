const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: true,  
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user', 
        key: 'id',
      },
    },
    published: { 
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: 'post',
    timestamps: true,
    freezeTableName: true,
    underscored: true, 
  }
);

module.exports = Post;