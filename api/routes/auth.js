module.exports = (app) => {
  const userController = require('../controllers/user');

  app.route('/api/users')
    .get(userController.listUsers)
    .post(userController.createUser);

  app.route('/api/users/:id')
    .get(userController.getUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser);
}