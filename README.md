# Starry-Tech

## Description

**Starry-Tech** is a CMS-style blog platform where users can create, edit, delete, and comment on blog posts. The site encourages user interaction by allowing individuals to share their thoughts and opinions on various topics. Built using the Model-View-Controller (MVC) architecture, it integrates Handlebars.js as the templating engine, Sequelize as the ORM, and uses express-session for authentication. The backend relies on Node.js and Express.js to deliver a smooth and secure experience.

## Table of Contents
  
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Tests](#tests)
- [Questions](#questions)


## Usage

**Homepage (All Users):** Visitors can view blog posts arranged from newest to oldest on the homepage. Each post displays its title, content, the user who created it, and the date it was posted. Comments on posts are also visible to all users. However, commenting on posts is reserved for logged-in users. To engage further, click the **Log In** button in the upper right corner to navigate to the login page.

**Login (All Users):** Users can log in or create an account by entering a username and password. Passwords must be at least 8 characters long for account creation. After successfully registering, users are automatically logged in and redirected to the dashboard.

**Dashboard (Logged-in Users):** Access to the Dashboard is restricted to logged-in users. If a user selects dashboard in the nav while they are logged out, they will be redirected to the login page. Once logged in, users can create new posts by clicking the **+ New Post** button. This opens a prompt to enter a post title and content. Once submitted, the post appears in the dashboard, where users can choose to edit or delete it.

* Edit Post: Click the **Edit** button to modify a post’s title and content. After making changes, you can resubmit it.
* Delete Post: Clicking the **Delete** button removes the post from both the homepage and dashboard.

**Homepage(Logged-in Users):** In addition to viewing posts, logged-in users have the ability to comment on blog posts directly from the homepage. A **Comment** section is available beneath each post, enabling users to share their thoughts.

**Please click [here](https://starry-tech.onrender.com/) to view the deployed application on Render.**


![screenshot of login](https://github.com/savannahmarshall/Starry-Tech/blob/main/public/images/screenshots/login.png)

![screenshot of home](https://github.com/savannahmarshall/Starry-Tech/blob/main/public/images/screenshots/blog-posts.png)

![screenshot of new post screen](https://github.com/savannahmarshall/Starry-Tech/blob/main/public/images/screenshots/new-post.png)

![screenshot of edit post screen](https://github.com/savannahmarshall/Starry-Tech/blob/main/public/images/screenshots/edit-post.png)



## Contributing
If you are interesting in contributing to this project, please contact me directly. 

## License
This project is licensed under the [MIT License](https://opensource.org/license/MIT).

## Tests
There are no tests for this application.

## Questions
If you have any questions about this project, feel free to reach out:

**GitHub:** https://github.com/savannahmarshall  

**Email:** savvymarshall@gmail.com
