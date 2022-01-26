const mongoose = require("mongoose");
//define a guess schema

const VoteSchema = new mongoose.Schema({
  creator_id: String,
  creator_name: String,
  parent_content: String,
  parent_id: String,
  content: String,
});

//compile
module.exports = mongoose.model("vote", VoteSchema);
