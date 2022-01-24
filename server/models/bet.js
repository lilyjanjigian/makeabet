const mongoose = require("mongoose");

//define a bet schema

const BetSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  options: Array,
});

//compile model from bet schema
module.exports = mongoose.model("bet", BetSchema);
