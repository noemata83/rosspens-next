const mongoose = require('mongoose');

const penSchema = new mongoose.Schema({
   inventorynumber: String,
   _manufacturer: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'Manufacturer',
   },
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