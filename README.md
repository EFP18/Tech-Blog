# Tech-Blog
Model-View-Controller (MVC)



# 14 Model-View-Controller (MVC): Tech Blog

## Your Task

Writing about tech can be just as important as making it. Developers spend plenty of time creating new applications and debugging existing codebases, but most developers also spend at least some of their time reading and writing about technical concepts, recent advancements, and new technologies. A simple Google search for any concept covered in this course returns thousands of think pieces and tutorials from developers of all skill levels!

Your task this week is to build a CMS-style blog site similar to a Wordpress site, where developers can publish their blog posts and comment on other developers’ posts as well. You’ll build this site completely from scratch and deploy it to Heroku. Your app will follow the MVC paradigm in its architectural structure, using Handlebars.js as the templating language, Sequelize as the ORM, and the express-session npm package for authentication.

## User Story

```md
AS A developer who writes about tech
I WANT a CMS-style blog site
SO THAT I can publish articles, blog posts, and my thoughts and opinions
```

## Acceptance Criteria



PSEUDO CODE
* HOMEPAGE:
  1. existing blog posts 
  <!-- 2. navigation link for homepage and dashboard -->
  <!-- 3. log in/sign up -->

* Sign up page:
  <!-- 1. create username and password -->
  2. click sign up button --> credentials are saved and logged in

* Sign in:
  <!-- 1. enter username and password -->

* Signed in:
  <!-- 1. navigation links for homepage, dashboard, log out -->

* Blog posts on home page:
  <!-- 1. post title and date created  -->

* Click on existing blog post:
  <!-- 1. post title, contents, post creator's username, date created -->
  2. option to leave a comment

* Enter comment and submit:
  1. comment saved
  2. post updated to display the comment, the comment creator’s username, and the date created

* Dashboard: 
  1. past blog posts I created
  2. add new blog post

* Add post button:
  1. enter title and contents

* Create button:
  1. title and contents saved
  2. back to dashboard with the new post

* Existing posts:
  1. delete, update
  2. back to dashboard with updated posts

* Log out: 
  1. signed out

* MaxAge:
  1. can view posts and comments
  2. need to log in to add update or delete posts. 


The following animation demonstrates the application functionality:

![Animation cycles through signing into the app, clicking on buttons, and updating blog posts.](./Assets/14-mvc-homework-demo-01.gif) 

## Getting Started

Your application’s folder structure must follow the Model-View-Controller paradigm. You’ll need to use the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views, use the [MySQL2](https://www.npmjs.com/package/mysql2) and [Sequelize](https://www.npmjs.com/package/sequelize) packages to connect to a MySQL database for your Models, and create an Express.js API for your Controllers.

You’ll also need the [dotenv package](https://www.npmjs.com/package/dotenv) to use environment variables, the [bcrypt package](https://www.npmjs.com/package/bcrypt) to hash passwords, and the [express-session](https://www.npmjs.com/package/express-session) and [connect-session-sequelize](https://www.npmjs.com/package/connect-session-sequelize) packages to add authentication.

**Note**: The [express-session](https://www.npmjs.com/package/express-session) package stores the session data on the client in a cookie. When you are idle on the site for more than a set time, the cookie will expire and you will be required to log in again to start a new session. This is the default behavior and you do not have to do anything to your application other than implement the npm package.



### Technical Acceptance Criteria: 40%

* Satisfies all of the preceding acceptance criteria plus the following:

    * Application’s folder structure follows the Model-View-Controller paradigm.

    * Uses the [express-handlebars](https://www.npmjs.com/package/express-handlebars) package to implement Handlebars.js for your Views.

    * Application must be deployed to Heroku.



* The URL of the functional, deployed application.

* The URL of the GitHub repository, with a unique name and a readme describing the project.

