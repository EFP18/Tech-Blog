const router = require("express").Router();
const { Post } = require("../models/");

const withAuth = require("../utils/auth");

router.get("/", withAuth, async (req, res) => {
  try {
    // GET all Posts for a logged in user
    const dbPosts = await Post.findAll({
      // use the req.session.userId
      where: {
        userId: req.session.userId,
      },
      order: [["id", "desc"]],

      // include: [
      //   {
      //     model: Post,
      //     attributes: ['username']
      //   },
      // ]
    });

    // Serialize data
    const posts = dbPosts.map((post) => post.get({ plain: true }));

    // Render the 'all-posts-admin' template in the 'dashboard' layout with the posts data
    res.render("all-posts-admin", {
      layout: "dashboard",
      posts,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", withAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
    loggedIn: req.session.loggedIn,
  });
});

// localhost:3001/dashboard/edit/id
router.get("/edit/:id", withAuth, async (req, res) => {
  try {
    const dbPost = await Post.findByPk(req.params.id);

    if (dbPost) {
      const post = dbPost.get({ plain: true });
      res.render("edit-post", {
        layout: "dashboard",
        post,
        loggedIn: req.session.loggedIn,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
