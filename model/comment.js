const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema =  Schema({
  comment: {
    type: String,
    required: true, 
  }
});

module.exports = mongoose.model("comment", CommentSchema);