const mongoose = require('mongoose');
const User = mongoose.model('User');
const passport = require('passport');

const listUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const createUser = async (req, res) => {
  try {
    const user = new User({ username: req.body.username, admin: true });
    const newUser = await User.register(user, req.body.password);
    passport.authenticate("local")(req, res, () => res.json(newUser));
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
}