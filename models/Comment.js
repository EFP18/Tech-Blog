const { Sequelize, Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Comment extends Model {}

Comment.init(
  {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    postId: {
      type: DataTypes.INTEGER, 
      references: {
        model: 'post',
        key: 'id'
      }
    }
  },
  {
    sequelize
  }
);

module.exports = Comment;
