const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
// const { User, Post, Comment } = require('./models');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = 3000; 

// Set up Handlebars.js engine using helpers
const hbs = exphbs.create({ helpers });

// Session configuration
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000,
    httpOnly: true, 
    secure: false, 
    sameSite: 'strict', 
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize 
  }),
};

// Use middleware for session
app.use(session(sess));

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

//routes
app.use(routes);

//start the server
const startServer = async () => {
  try {
    await sequelize.sync({ force: false }); 
    app.listen(PORT, () => console.log(`Now listening on http://localhost:${PORT}/`));
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

// Call the function to start the server
startServer();