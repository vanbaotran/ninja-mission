const express = require('express')
const postRoutes = express.Router();
const Post = require('../models/Post.model')
const Application = require('../models/Application.model')

postRoutes.post("/", (req, res, next) => {
  console.log('HELLOOOOOO')
  if (!req.session.currentUser.profileType ==='recruiter'){
    res.status(403).json({message:'You are not allowed to create posts'});
    return;
  }
  if (!req.body.companyLogo){
    const companyLogo = req.session.currentUser.companyLogo
    const {description, position, contract, experienceLevel,codeLanguage,location,funFact,remote} = req.body;
  } else {
    const {description, position, contract, experienceLevel,codeLanguage,location,funFact,remote, companyLogo} = req.body;
  }
  req.body.recruiterID = req.session.currentUser._id
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
    if(postFromDB.recruiterId !== req.session.currentUser._id){
      res.status(403).json({message:'You are not allowed to edit this post 2222'});
    return;
    }
    postFromDB = {...req.body}

    postFromDB.save()
    .then(updatedPost =>{
      console.log(updatedPost)
      res.status(200).json({updatedPost})
    })
  })
  .catch(err=>res.status(500).json({message:"Saving changes went wrong"}))
})
module.exports = postRoutes;