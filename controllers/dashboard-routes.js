const router = require('express').Router();
const { Post } = require('../models/');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    // GET all Posts for a logged in user 
    const dbPosts = await Post.findAll({
      // use the req.session.userId
      where: { userId: req.session.userId },
      order: [['id', 'desc']],

      // include: [
      //   {
      //     model: Post, 
      //     attributes: ['username']
      //   },
      // ]
    });

    // Serialize data 
    const posts = dbPosts.map((post) => 
      post.get({ plain: true }));

    // Render the 'all-posts-admin' template in the 'dashboard' layout with the posts data
    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
      loggedIn: req.session.loggedIn
    })

  } catch (err) {
    res.redirect('login');
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
    loggedIn: req.session.loggedIn
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try{
    const dbPost = await Post.findByPk(req.params.id);

    if (dbPost) {
      const post = dbPost.get({ plain: true});
      res.render('edit-post', {
        layout: 'dashboard',
        post
      });
    }
  } catch(err) {
    res.status(404).end();

  };
});
router.get("/edit/:id", withAuth, (req, res) => {
  Post.findByPk(req.params.id)
    .then(dbPostData => {
      if (dbPostData) {
        const post = dbPostData.get({ plain: true });
        
        res.render("edit-post", {
          layout: "dashboard",
          post
        });
      } else {
        res.status(404).end();
      }
    })
    .catch(err => {
      res.status(500).json(err);
    });
});


router.get('/edit/:id', withAuth, async (req, res) => {
  // If the user is not logged in, redirect the user to the login page
  // if the user is logged in, allow them to view a post by id
    try { 
  
    // Find a Post by primary key
    const dbPosts = await Post.findByPk(req.params.id, { 
      include: [
        {
          model: Post, 
          attributes: ['username']
        }
      ]
    })
    // Serialize data (use .get() method, or use raw: true, nest: true in query options)
    // check that a post with that id exists
    if (dbPosts) {
      const post = dbPosts.get({ plain: true});
    }

    // Render the 'edit-post' template in the 'dashboard' layout with the post data
    res.render('edit-post', {
      layout: 'dashboard', 
      post,
      loggedIn: req.session.loggedIn
    })

    } catch (err) {
      res.redirect('login');
    }
});


module.exports = router;
