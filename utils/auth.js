const withAuth = (req, res, next) => {
  // if the user is not logged in, redirect them to the login page
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
  // if the user is logged in, execute the route function
  // calling next means the user is authenticated
    next();
  }
};

module.exports = withAuth;
