//this file sets up the main router for the application and mounts specific route files under different paths, 
// allowing the application to handle user, post, and comment-related HTTP requests.
const router = require('express').Router();

const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentRoutes = require('./comment-routes');

router.use('/user', userRoutes);
router.use('/post', postRoutes);
router.use('/comment', commentRoutes);

//export the router object so that it can be used by other files or modules in the application.
module.exports = router;
