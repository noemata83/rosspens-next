const mongoose = require('mongoose');

const manufacturerSchema = new mongoose.Schema({
  name: String,
  bannerURL: String,
  pens: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pen'
  }]
});

module.exports = mongoose.model("Manufacturer", manufacturerSchema);