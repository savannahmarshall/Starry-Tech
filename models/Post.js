const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

// Initialize the Post model
Post.init(
    {
        // Define the id column
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        // Define the title column
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // Define the content column
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        // Define the user_id column
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'user', // for User model
                key: 'id',
            },
        },
        // // Define the created_at column 
        // created_at: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: DataTypes.NOW,
        // },
    },
    {
        sequelize, 
        timestamps: true, 
        underscored: true, 
        modelName: 'post', 
    }
);

module.exports = Post;