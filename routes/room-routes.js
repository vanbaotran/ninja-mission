const express = require("express");
const Room = require("../models/Room.model");
const router = express.Router();

router.get('/byUser', (req,res,next)=>{
  const userId = req.session.currentUser._id
  let filter = req.session.currentUser.profileType === 'recruiter' ? {recruiterId:userId} : {candidateId:userId}
  Room.find(filter)
  .populate('recruiterId candidateId')
  .populate({
    path: 'applicationId',
    populate:{
      path:'jobPostId',
      model:'Post'
    }
  })
  .then(theRooms =>{
   res.status(200).json(theRooms);
   return;
  })
  .catch(err=>res.status(500).json({message: "We have a problem"}))
});
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
    let newRoom = await Room.create({...req.body, messages:[]});
    if(!newRoom) {
      res.status(500).json({err: "oops la db est cassé!"});
      return;
    }
    res.status(200).json(newRoom);
  } catch (error) {
    res.status(500).json({message: "We have a problem"});
    return;
  }
});
router.patch("/:roomId", async (req, res, next) => {
  try {
    let room = await Room.findOne({roomId: req.params.roomId});
    if(!room) {
      res.status(204).json();
      return;
    }
    room.messages = req.body.messages;
    let updatedRoom = await room.save();
    res.status(200).json(updatedRoom);
  } catch (error) {
    res.status(500).json({message: "We have a problem"});
    return;
  }
});
router.delete("/:roomId", async (req, res, next) => {
  try {
    await Room.deleteOne({roomId: req.params.roomId});
    res.status(200).json("Room is deleted.");
  } catch (error) {
    console.log(error)
    res.status(500).json({message: "We have a problem"});
    return;
  }
});
module.exports = router;
