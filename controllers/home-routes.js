const router = require('express').Router();
const { Post, Comment, User } = require('../models/');
const withAuth = require('../utils/auth')

// get all posts for homepage
router.get('/', async (req, res) => {
  try {
    // Find all Posts and associated Users
    const dbPosts = await Post.findAll({
      // include: [User]
      include: [
        {
          model: User, 
          attributes: ['username']
        },
      ],
      order: [['id', 'desc']],

    }); 

    // Serialize data 
    const posts = dbPosts.map((post) => 
      post.get({ plain: true })
    );

    // Render the 'all-posts' template with the posts data
    res.render('all-posts', {
      posts, 
      loggedIn: req.session.loggedIn 
    })
  } catch (err) {
    res.status(500).json(err);
  }
});

// router.get("/post/:id", (req, res) => {
//   Post.findByPk(req.params.id, {
//     include: [
//       User,
//       {
//         model: Comment,
//         include: [User],
//       },
//     ],
//   })
//     .then((dbPostData) => {
//       if (dbPostData) {
//         const post = dbPostData.get({ plain: true });

//         res.render("single-post", { 
//           post });
//       } else {
//         res.status(404).end();
//       }
//     })
//     .catch((err) => {
//       res.status(500).json(err);
//     });
// });

// GET single post
router.get('/post/:id', withAuth, async (req, res) => {

    try {
      // Find a single Post by primary key and include associated User and Comments (Comment will also need to include a User)
      // a post has many comments, and each post has one user
      const dbPosts = await Post.findByPk(res.params.id, {
        include: [
          User,
          {
            model: Comment,
            include: [User]
          }
        ]
      });

      // Serialize data (use .get() method, or use raw: true, nest: true in query options)
      // check that post exists
      if (dbPosts) {
        // no map() because we are looking for a single post
        const post = dbPosts.get({ plain: true });

        // Render the 'single-post' template with the post data
        res.render('single-post', {
          post,
          loggedIn: req.session.loggedIn
        })

      }else {
        res.status(404).end();
      };
      
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
