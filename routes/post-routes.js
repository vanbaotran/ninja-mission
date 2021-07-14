const express = require('express')
const postRoutes = express.Router();
const Post = require('../models/Post.model')
const Application = require('../models/Application.model')

postRoutes.post("/", (req, res, next) => {

  if (!req.session.currentUser.profileType ==='recruiter'){
    res.status(403).json({message:'You are not allowed to create posts'});
    return;
  } 
  
  if (!req.body.companyLogo){
    req.body.companyLogo = req.session.currentUser.companyLogo
  } 
  req.body.recruiterId = req.session.currentUser._id
  Post.create({...req.body})
    .then(newPost=>{
      Application.create({
        jobPostID: newPost._id
      })
      .then(newApplication=>{
        newPost.applicationId = newApplication._id;
        newPost.save()
        .then(()=>res.status(200).json({newPost}))
        
      })
    }).catch(err=>res.status(500).json({message:err}))
});

postRoutes.get("/", (req, res, next) => {
  Post.find({})
    .then((ret) => res.status(200).json(ret))
    .catch((err) => res.status(500).json({message:'Users not found'}));
});
//GET POST BY RECRUITER ID
postRoutes.get("/recruiter/:recruiterId", (req, res, next) => {
  Post.find({recruiterId:req.params.recruiterId})
    .populate('applicationId')
    .then((ret) => res.status(200).json(ret))
    .catch((err) => res.status(500).json({message:'Posts not found'}));
});
postRoutes.get("/:id", (req, res, next) => {
  Post.findById(req.params.id)
    .then((ret) => {
      if (!ret) {
        res.status(204).json(ret);
      } else {
        res.status(200).json(ret);
      }
    })
    .catch((err) => res.status(400).json(err));
});
postRoutes.put('/:id',(req,res,next)=>{
  if (!req.session.currentUser.profileType ==='recruiter' ){
    res.status(403).json({message:'You are not allowed to edit this post'});
    return;
  }
  Post.findById(req.params.id)
  .then(postFromDB=>{
    if(postFromDB.recruiterId.toString() !== req.session.currentUser._id){
      res.status(403).json({message:'You are not allowed to edit this post 2222'});
    return;
    }
    Post.updateOne({_id:req.params.id},{...req.body})
    .then(updatedPost=>{
      res.status(200).json({updatedPost})
    })
    .catch(err=>console.log(err))
  })
  .catch(err=>res.status(500).json({message:"Saving changes went wrong"}))
})
postRoutes.delete('/:id',(req,res,next)=>{
  if (!req.session.currentUser.profileType ==='recruiter'){
    res.status(403).json({message:'You are not allowed to delete this post'});
    return;
  }
  Post.findById(req.params.id)
  .then(thePost=>{
    if(thePost.recruiterId.toString() !== req.session.currentUser._id){
      res.status(403).json({message:'You are not allowed to delete this posttt'});
    return;
    }
    Post.deleteOne({_id:thePost._id},function(err){
      if (err){
        return res.status(500).json({message:"Deleting post went wrong"})
      } else {
        return res.status(200).json({message:"Post successfully deleted"})
      }
    })
  })
})
module.exports = postRoutes;
