const express = require("express");
const postRoutes = express.Router();
const Post = require("../models/Post.model");
const User = require("../models/User.model");
const { isCandidate, isRecruiter, isLoggedIn } = require("./useful");
const Application = require("../models/Application.model");

postRoutes.post("/", [isLoggedIn, isRecruiter], (req, res, next) => {
  if (!req.body.companyLogo) {
    // if no logo choose for post job, logo post job = default company recruiter logo
    req.body.companyLogo = req.session.currentUser.companyLogo;
  }
  // set post recruiter id to current recruiter
  req.body.recruiterId = req.session.currentUser._id;
  // create post
  Post.create({ ...req.body })
    .then((newPost) => {
      // create application with post id
      Application.create({
        jobPostId: newPost._id,
      }).then((newApplication) => {
        //update user with new application id
        User.findById(req.session.currentUser._id)
          .then((userFromDb) => {
            userFromDb.applicationId.push(newApplication._id);

            if (userFromDb.applicationId.length === 1) {
              // set currentApplication id to new application id if only one application for recruiter
              userFromDb.currentApplicationId = newApplication._id;
            }
            userFromDb.save().then((updatedUser) => console.log(updatedUser));
          })
          .then((updatedUser) => console.log(updatedUser))
          .catch((err) => next(err));
        // update post with application id and return doc
        newPost.applicationId = newApplication._id;
        newPost.save().then(() => {
          res.status(200).json({ newPost });
        });
      });
    })
    .catch((err) => res.status(500).json({ message: err }));
});

postRoutes.get("/random", [isLoggedIn, isCandidate], async (req, res, next) => {
  try {
  //  let data = await Post.findOne({_id:"61098e0c01d2fa45b47b13a7"});
  //  res.status(200).json(data);
  //  return;
    // initiate utils let
    let random, randomPost, countDoc, post;
    // get currentUser
    let user = await User.findOne({ _id: req.session.currentUser._id });
    // FILTER CONTRACT:
    let filter = {};
    if (req.query?.filterContract) {
      filter = { contract: { $in: req.query.filterContract.split("_") } };
    }
    // FILTER already candidating offer and swipped offer
    let alreadyCandidatingApp = await Application.find({ candidateId: user._id });
    let alreadyCandidatingOffer = alreadyCandidatingApp.map((app) => app.jobPostId);
    let arrFilter = [...user.swipedOfferId, ...alreadyCandidatingOffer];
    filter = { ...filter, _id: { $nin: arrFilter } };
    countDoc = await Post.countDocuments({ ...filter });
    random = Math.floor(Math.random() * countDoc);

    //get random post with or not query params
    randomPost = await Post.findOne({ ...filter })
      .populate("recruiterId")
      .skip(random);
    // if no post find return 204 no content
    if (!randomPost) {
      res.status(204).json();
      return;
    } else {
      res.status(200).json(randomPost);
      return;
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Post not found", error: error });
  }
});
//GET POST BY RECRUITER ID
postRoutes.get("/recruiter/:recruiterId", [isLoggedIn, isRecruiter], (req, res, next) => {
  Post.find({ recruiterId: req.params.recruiterId })
    .populate("applicationId")
    .then((ret) => res.status(200).json(ret))
    .catch((err) => res.status(500).json({ message: "Posts not found" }));
});
//GET ONE POST Details by id
postRoutes.get("/:id", isLoggedIn, (req, res, next) => {
  Post.findById(req.params.id)
    .populate('applicationId')
    .then((ret) => {
      if (!ret) {
        res.status(204).json(ret);
      } else {
        res.status(200).json(ret);
      }
    })
    .catch((err) => res.status(400).json(err));
});
//UPDATE ONE POST BY ID
postRoutes.patch("/:id", [isLoggedIn, isRecruiter], (req, res, next) => {
  Post.findById(req.params.id)
    .then((postFromDB) => {
      if (postFromDB.recruiterId.toString() !== req.session.currentUser._id) {
        res.status(403).json({ message: "You are not allowed to edit this post" });
        return;
      }
      Post.updateOne({ _id: req.params.id }, { ...req.body })
        .then((updatedPost) => {
          res.status(200).json({ updatedPost });
        })
        .catch((err) => console.log(err));
    })
    .catch((err) => res.status(500).json({ message: "Saving changes went wrong" }));
});
//UPDATE ONE POST BY ID
postRoutes.delete("/:id", [isLoggedIn, isRecruiter], (req, res, next) => {
  Post.findById(req.params.id).then((thePost) => {
    if (thePost.recruiterId.toString() !== req.session.currentUser._id) {
      res.status(403).json({ message: "You are not allowed to delete this posttt" });
      return;
    }
    //delete application 
    Application.findOne({jobPostId:req.params.id})
    .then(theApplication =>{
      User.findOne({currentApplicationId:theApplication._id})
      .then(theUser=>{
        theUser.currentApplicationId = ''
        theUser.save()
        .then(theApplication.deleteOne({_id:theApplication._id}))
        .catch(err=>console.log(err))
      })
    })
    .catch(err=>console.log(err))
    //update user's currentApplicationId
    Post.deleteOne({ _id: thePost._id }, function (err) {
      if (err) {
        return res.status(500).json({ message: "Deleting post went wrong" });
      } else {
        return res.status(200).json({ message: "Post successfully deleted" });
      }
    });
  });
});
module.exports = postRoutes;
