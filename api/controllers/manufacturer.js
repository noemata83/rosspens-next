const mongoose = require('mongoose');
const slugify = require('slugify');
const Manufacturer = mongoose.model('Manufacturer');

const listManufacturers = async (req, res) => {
  try {
    const Manufacturers = await Manufacturer.find({});
    res.json(Manufacturers);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const createManufacturer = async (req, res) => {
  try {
    const newManufacturer = req.body;
    newManufacturer.slug = slugify(req.body.name.toLowerCase());
    const createdManufacturer = await Manufacturer.create(newManufacturer);
    res.json(createdManufacturer);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const getManufacturer = async (req, res) => {
  try {
    const foundManufacturer = await Manufacturer.find({ slug: req.params.slug });
    res.json(foundManufacturer);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const updateManufacturer = async (req, res) => {
  try {
    const foundManufacturer = await Manufacturer.find({ slug: req.params.slug });
    const updates = req.body;
    const updatedManufacturer = await Manufacturer.findOneAndUpdate(foundManufacturer, updates, { new: true });
    res.json(updatedManufacturer);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const deleteManufacturer = async (req, res) => {
  try {
    const deletedManufacturer = await Manufacturer.findOneAndRemove({ slug: req.params.slug });
    res.send({
      message: `Manufacturer has been deleted.`
    })
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

module.exports = {
  listManufacturers,
  createManufacturer,
  getManufacturer,
  updateManufacturer,
  deleteManufacturer,
}