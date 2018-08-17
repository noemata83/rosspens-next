const mongoose = require('mongoose'),
  Pen = mongoose.model('Pen'),
  Manufacturer = mongoose.model('Manufacturer'),
  slugify = require('slugify');


const listPens = async (req, res) => {
  try {
    const pens = await Pen.find({});
    res.json(pens);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const createPen = async (req, res) => {
  try {
    const newPen = {
      inventorynumber: req.body.inventorynumber,
      title: req.body.title,
      slug: slugify(req.body.title).toLowerCase(),
      type: req.body.type,
      nib: req.body.nib,
      price: req.body.price,
      images: req.body.imageURLs.split(','),
      description: req.body.description,
    };
    const foundMaker = await Manufacturer.findOne({ name: req.body.manufacturer });
    newPen._manufacturer = foundMaker;
    const createdPen = await Pen.create(newPen);
    res.json(createdPen);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`,
    });
  }
};

const fetchNewPens = async (req, res) => {
  try {
    const newPens = await Pen.find({}).sort("-dateAdded").limit(10).exec();
    res.json(newPens);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const fetchThePen = async (req,res) => {
  try {
    const pen = await Pen.findOne({ slug: req.params.slug});
    res.json(pen);
  } catch(err) {
    res.json({
      error: `There was an error ${err}`
    });
  }
};

const deleteImages = async (deletesString, foundPen) => {
  const prevImages = foundPen.images.slice();
  if (!deletesString) {
    return prevImages;
  }
  const deletes = deletesString.split(',').map(x => parseInt(x));
  // side effects below here
  deletes.forEach(rmindex => {

    // aws logic goes here

  });
  // return to an approximation of purity below
  return prevImages.filter((image, index) => !deletes.includes(index));
}


const updatePen = async (req, res) => {
  try {
    const foundPen = await Pen.findOne({ slug: req.params.slug });
    const filteredImages = await deleteImages(req.body.deleteImages, foundPen);
    const images = req.body.newImages ? filteredImages.concat([...req.body.newImages.split(',')]) : filteredImages;
    const penUpdates = { ...foundPen._doc, ...req.body, images };
    const updatedPen = await Pen.findOneAndUpdate({ slug: req.params.slug }, penUpdates, { new: true });
    res.json(updatedPen);
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    });
  }
};

const deletePen = async (req, res) => {
  try {
    const penToDelete = await Pen.findOne({ slug: req.params.slug });
    // do aws stuff to hopefully delete images
    const deletedPen = await Pen.findOneAndRemove({ slug: req.params.slug });
    res.json(deletedPen); // this might return nothing. Revisit later.
  } catch(err) {
    res.json({
      error: `There was an error: ${err}`
    })
  }
};

module.exports = {
  listPens,
  createPen,
  fetchThePen,
  fetchNewPens,
  updatePen,
  deletePen
};