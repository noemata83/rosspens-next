const mongoose = require('mongoose');
const { manufacturerSchema } = require('./manufacturer');

const penSchema = new mongoose.Schema({
   inventorynumber: String,
   _manufacturer: manufacturerSchema,
   title: String,
   type: String,
   slug: {
      type: String,
      unique: true,
      required: true,
   },
   nib: String,
   price: Number,
   images: [String],
   description: String,
   dateAdded: ({type: Date, default: Date.now })
});

module.exports = mongoose.model("Pen", penSchema);