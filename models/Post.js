// const { Model, DataTypes } = require('sequelize');
// const sequelize = require('../config/connection');

// class Post extends Model {}

// Post.init({
//   id: {
//     type: DataTypes.INTEGER,
//     autoIncrement: true,
//     primaryKey: true,
//   },
//   title: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   content: {
//     type: DataTypes.TEXT,
//     allowNull: true,  // Allow null values
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     references: {
//       model: 'user',
//       key: 'id',
//     },
//   },
//   created_at: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
//   updated_at: {
//     type: DataTypes.DATE,
//     allowNull: false,
//     defaultValue: DataTypes.NOW,
//   },
//   published: { 
//     type: DataTypes.BOOLEAN,
//     allowNull: false,
//     defaultValue: false,
//   },
// }, {
//   sequelize,
//   modelName: 'post',
// });

// module.exports = Post;