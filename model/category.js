const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Category = Schema({
  category: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("category", Category);