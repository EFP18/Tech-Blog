const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// create associations between different models
User.hasMany(Post, {
  foreignKey: 'userId'
})

Post.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});


User.hasMany(Comment, {
  foreignKey: 'userId',
})

Comment.belongsTo(User, {
  foreignKey: 'userId',
  onDelete: 'CASCADE'
});


Post.hasMany(Comment, {
  foreignKey: 'postId', 
  onDelete: 'CASCADE'
})

Comment.belongsTo(Post, {
  foreignKey: 'postId',
});

module.exports = {
  User,
  Comment,
  Post
};