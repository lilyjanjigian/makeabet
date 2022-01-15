const mongoose = require("mongoose");
//define a guess schema

const GuessSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  parent: String,
  content: String,
});

//compile
module.exports = mongoose.model("guess", GuessSchema);
