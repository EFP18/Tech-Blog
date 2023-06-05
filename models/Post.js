const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    id: {type: DataTypes.INTEGER, 
      autoIncrement: true, 
      allowNull: false, 
      primaryKey: true
    },
    title: DataTypes.STRING,
    body: DataTypes.STRING, 
    userId: { type: DataTypes.INTEGER, 
      references: {
        model: 'user', 
        key: 'id'
      }
    }
  },
  {
    sequelize, 
    modelName: 'post'
  }
);

module.exports = Post;
