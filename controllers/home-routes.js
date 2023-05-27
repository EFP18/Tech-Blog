const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth')

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Find all Posts and associated Users
    const dbPosts = await Post.findAll({
      // include: [
      //   {
      //     model: User, 
      //     attributes: ['username']
      //   },
      // ]
    }); 
    console.log(dbPosts)
    // Serialize data 
    const posts = dbPosts.map((post) => 
      post.get({ plain: true })
    );
    console.log(posts);
    // Render the 'all-posts' template with the posts data
    res.render('all-posts', {
      layout: 'main', 
      posts
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', withAuth, async (req, res) => {

    try {
      // Find a single Post by primary key and include associated User and Comments (Comment will also need to include a User)
      // a post has many comments, and each post has one user
      const dbPosts = await Post.findByPk(res.params.id, {
        include: [
          {
            model: Comment,
            include: [
              {
                model: User
              }
            ]
          }
        ]
      })
      // Serialize data (use .get() method, or use raw: true, nest: true in query options)
      const post = dbPosts.map((post) => {
        post.get({ plain: true })
      });
      
      // Render the 'single-post' template with the post data
      res.render('single-post', {
        layout: 'main', 
        post
      })
    } catch (err) {
      res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;
