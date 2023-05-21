const router = require('express').Router();
const { Post, Comment, User } = require('../models/');

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Find all Posts and associated Users
    const dbPosts = await Post.findAll({
      include: [
        {
          model: User, 
          attributes: ['username']
        },
      ]
    }); 
    // Serialize data 
    const posts = dbPosts.map((post) => {
      post.get({ plain: true })
    });
    // Render the 'all-posts' template with the posts data
    res.render('all-posts', {
      layout: 'home', 
      posts
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// get single post
router.get('/post/:id', async (req, res) => {
  if (!req.session.loggedIn) {
      res.redirect('/login');
  } else {
    try {
      // TODO: 1. Find a single Post by primary key and include associated User and Comments (Comment will also need to include a User)
      const dbPosts = await Post.findByPk(res.params.id, {
        include: [
          {
            model: User, Comment
          }
        ]
      })
      // Serialize data (use .get() method, or use raw: true, nest: true in query options)
      const post = dbPosts.map((post) => {
        post.get({ plain: true })
      });
      
      // Render the 'single-post' template with the post data
      res.render('single-post', {
        layout: 'home', 
        post
      })
    } catch (err) {
      res.status(500).json(err);
    }
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
