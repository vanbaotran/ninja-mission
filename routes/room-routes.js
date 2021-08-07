const express = require("express");
const Room = require("../models/Room.model");
const router = express.Router();

router.get("/:roomId", async (req, res, next) => {
  try {
    let room = await Room.findOne({roomId: req.params.roomId});
    if(!room) {
      res.status(204).json();
      return;
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({message: "We have a problem"});
    return;
  }
});
router.post("/", async (req, res, next) => {
  try {
    let newRoom = await Room.create({roomId: req.body.roomId, messages:["It's a match! Start the conversation"]});
    if(!newRoom) {
      res.status(500).json({err: "oops la db est cassé!"});
      return;
    }
    res.status(200).json(newRoom);
  } catch (error) {
    res.status(500).json({message: "houston We have a problem"});
    return;
  }
});
router.patch("/:roomId", async (req, res, next) => {
  try {
      console.log("in PATch")
    let room = await Room.findOne({roomId: req.params.roomId});
    console.log(room , "<= room patch")
    if(!room) {
      res.status(204).json();
      return;
    }
    room.messages = req.body.messages;
    let updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({message: "houston We have a problem"});
    return;
  }
});
module.exports = router;
