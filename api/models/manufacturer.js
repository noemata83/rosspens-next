const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  name: String,
  bannerURL: String,
  slug: String,
});

module.exports = {
  model: mongoose.model("Manufacturer", manufacturerSchema),
  manufacturerSchema,
}