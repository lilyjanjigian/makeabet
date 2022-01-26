/*
|--------------------------------------------------------------------------
| api.js -- server routes
|--------------------------------------------------------------------------
|
| This file defines the routes for your server.
|
*/

const express = require("express");

// import models so we can interact with the database
const User = require("./models/user");
const Bet = require("./models/bet");
const Vote = require("./models/vote");

// import authentication library
const auth = require("./auth");

// api endpoints: all these paths will be prefixed with "/api/"
const router = express.Router();

//initialize socket
const socketManager = require("./server-socket");

router.post("/login", auth.login);
router.post("/logout", auth.logout);
router.get("/whoami", (req, res) => {
  if (!req.user) {
    // not logged in
    return res.send({});
  }

  res.send(req.user);
});

router.post("/initsocket", (req, res) => {
  // do nothing if user not logged in
  if (req.user)
    socketManager.addUser(req.user, socketManager.getSocketFromSocketID(req.body.socketid));
  res.send({});
});

// |------------------------------|
// | write your API methods below!|
// |------------------------------|

//API format: name is a string, then a function

// get all the bet documents in database
router.get("/globalbets", (req, res) => {
  Bet.find({}).then((bets) => res.send(bets));
});

// get all the users in the database
router.get("/users", (req, res) => {
  User.find({}).then((users) => res.send(users));
});

// get all the created bet documents in database (search for name matching logged in user)
router.get("/createdbets", (req, res) => {
  Bet.find({ $match: { creator_name: req.user.name } }).then((createdbets) =>
    res.send(createdbets)
  );
});

//for making a new bet
router.post("/bet", (req, res) => {
  const newBet = new Bet({
    creator_id: req.user._id,
    creator_name: req.user.name,
    content: req.body.content,
    options: req.body.options,
    time_posted: new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit'}).format(new Date()),
    time_expired: req.body.time_expired,
    point_value: req.body.point_value,
    isresolved: false,
    voters: [],
  });
  newBet.save().then((bet) => {
    //save to database
    console.log("bet is saved");
  });
});

router.post("/vote", (req, res) => {
  console.log(req.user, req.body)
  const newVote = new Vote({
    creator_id: req.user._id,
    creator_name: req.user.name,
    parent_content: req.body.parent_content,
    parent_id: req.body.parent_id,
    content: req.body.content,
  });
  newVote.save().then(async (vote) => {
    console.log("vote is saved");
    let parent_bet = await Bet.findOne({_id: req.body.parent_id});
    parent_bet.voters = [...parent_bet.voters, req.user._id];
    await parent_bet.save();
  });
  
});

router.get("/votes", (req, res) => {
  Vote.find({parent_id:req.query.parent_id}).then((votes) => res.send(votes));
});

// anything else falls to this "not found" case
router.all("*", (req, res) => {
  console.log(`API route not found: ${req.method} ${req.url}`);
  res.status(404).send({ msg: "API route not found" });
});

module.exports = router;