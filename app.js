const express = require('express');
const app = express();
const mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  User = require('./api/models/user');

require('./api/models/pen');
require('./api/models/manufacturer');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/rosspens-next', { useNewUrlParser: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(require("express-session")({ secret: process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const penRouter = require('./api/routes/pen');
// const authRoutes = require('./api/routes/auth');
const manufacturerRouter = require('./api/routes/manufacturer');

//  require('./api/routes/auth')(app);
require('./api/routes/manufacturer')(app);
require('./api/routes/pen')(app);


app.listen(5000, process.env.IP, function() {
  console.log("RossPens server has started.");
});

