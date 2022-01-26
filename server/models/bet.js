const mongoose = require("mongoose");

//define a bet schema

const BetSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  content: String,
  options: Array,
  time_posted: String,
  time_expired: String,
  point_value: Number,
  isresolved: Boolean,
  voters: Array,
  answer: String,
});

//compile model from bet schema
module.exports = mongoose.model("bet", BetSchema);
