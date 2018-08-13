const express = require('express');
const app = express();
const mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  passport = require('passport'),
  localStrategy = require('passport-local'),
  User = require('./models/user');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/rosspens-next', { useNewUrlParser: true });


app.use(bodyParser.urlencoded({ extended: true}));
app.use(require("express-session")({ secret: process.env.SECRET, resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.listen(3000, process.env.IP, function() {
  console.log("RossPens server has started.");
});

