const router = require("express").Router();
const { User } = require("../../models");

// create new user
router.post("/", async (req, res) => {
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // save the user id, username, and loggedIn status to the req.session
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// login
router.post("/login", async (req, res) => {
  // find user with that username
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    // check if that user exists
    if (!user) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }
    // check if password is valid
    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: "No user account found!" });
      return;
    }

    //save the user id, username, and loggedIn status to the req.session
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = user.id;
      req.session.username = user.username;
      res.json({ user, message: "You are now logged in your account!" });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found!" });
  }
});

// logout route
// we remove the session that's been stored within the sequelize db and it invalidates the cookie from the frontend
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
