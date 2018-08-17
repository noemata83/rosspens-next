module.exports = (app) => {
  const manufacturerController = require ('../controllers/manufacturer');

  app.route('/api/makers')
    .get(manufacturerController.listManufacturers)
    .post(manufacturerController.createManufacturer);

  app.route('/api/makers/:slug')
    .get(manufacturerController.getManufacturer)
    .put(manufacturerController.updateManufacturer)
    .delete(manufacturerController.deleteManufacturer);
}