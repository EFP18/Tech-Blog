const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init(
  {
    title: DataTypes.STRING,
    body: DataTypes.STRING, 
    userId: DataTypes.INTEGER, 
    references: {
      model: 'user', 
      key: 'id'
    }
  },
  {
    sequelize
  }
);

module.exports = Post;
