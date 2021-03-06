const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const Application = require("../models/Application.model");
const { isCandidate, isRecruiter, isLoggedIn } = require("./useful");
const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const { name, email, password, profileType } = req.body;
  if (!name || !email || !password || !profileType) {
    res.status(400).json({ message: "Provide name, email and password" });
  }
  if (password.length < 8) {
    res.status(400).json({
      message: "Please make your password at least 8 characters long for security purposes.",
    });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res.status(400).json({ message: "Email already taken. Please enter another one." });
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(password, salt);

      const aNewUser = new User({
        name,
        email,
        password: hashPass,
        profileType,
      });
      aNewUser
        .save()
        .then((aNewUser) => {
          req.session.currentUser = aNewUser;
          res.status(200).json(aNewUser);
        })
        .catch((err) => {
          res.status(400).json({ message: "Saving user to database went wrong" });
        });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ message: "Email check went bad", err });
    });
});
// LOGIN
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(204).json();
      }
      if (bcrypt.compareSync(password, user.password) !== true) {
        return res.status(400).json({ message: "Wrong credentials" });
      } else {
        req.session.currentUser = user;
        res.json(user);
      }
    })
    .catch((err) => console.log(err));
});
//LOGOUT
router.post("/logout", isLoggedIn, (req, res, next) => {
  req.session.destroy();
  res.json({ message: "You are now logged out" });
  return;
});
router.get("/loggedin", (req, res, next) => {
  if (req.session.currentUser) {
    User.findOne({ _id: req.session.currentUser._id })
      .then((userFromDb) => {
        userFromDb.password = undefined;
        res.status(200).json(userFromDb);
        return;
      })
      .catch((err) => {
        res.status(500).json(err);
        return;
      });
  } else {
    res.status(403).json({ message: "Unauthorized" });
    return;
  }
});

/* GET */
router.get("/random", [isLoggedIn, isRecruiter], async (req, res, next) => {
  // try {
  //   randomUser = await User.findOne({_id:"610d4c2a05ddd96b281372c4"})
  //    res.status(200).json(randomUser);
  // } catch (error) {
  //   console.log(error)
  // }
  let random, randomUser, countDoc, user;
  // FILTER EXP LEVEL:
  let filter = {};
  if (req.query?.filterLevel) {
    filter = { level: { $in: req.query.filterLevel.split("_") } };
  }
  try {
    user = await User.findOne({ _id: req.session.currentUser._id }).populate(
      "currentApplicationId"
    );
    if (!user.currentApplicationId) {
      return res.status(204).json();
    }
    filter = {
      ...filter,
      _id: {
        $nin: [
          ...user.currentApplicationId.refusedCandidateId,
          ...user.currentApplicationId.acceptedCandidateId,
        ],
      },
    };
    await User.countDocuments({ profileType: "candidate", ...filter })
      .then((count) => {
        countDoc = count;
        random = Math.floor(Math.random() * count);
      })
      .catch((err) => console.log(err));

    //if recruiter doesnt have a job post, he cannot swipe
    randomUser = await User.findOne({ profileType: "candidate", ...filter }).skip(random);
    if (!randomUser) {
      return res.status(204).json();
    }
    randomUser.password = undefined;
    res.status(200).json(randomUser);
    return;
  } catch (error) {
    return res.status(500).json({ message: "Users not found1", error: error });
  }
});
// GET USER DETAILS
router.get("/:id", isLoggedIn, (req, res, next) => {
  User.findById(req.params.id)
    .then((ret) => {
      if (!ret) {
        res.status(204).json(ret);
      } else {
        ret.password = undefined;
        res.status(200).json(ret);
      }
    })
    .catch((err) => res.status(400).json(err));
});
//PATCH update user profile
router.patch("/", isLoggedIn, (req, res, next) => {
  const id = req.session.currentUser._id;
  // let newApplicationId;
  if (req.body.password) {
    res.status(403).json("Password cannot be changed by this way.");
    return;
  }
  function updateUserInfo(id, body) {
    User.findByIdAndUpdate(
      id.toString(),
      { ...body },
      { new: true, runValidators: true },
      function (err, updatedUser) {
        updatedUser.password = undefined;
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json(updatedUser);
      }
    );
  }
  if (req.body.currentPostId) {
    Application.findOne({ jobPostId: req.body.currentPostId })
      .then((appliFromDB) => {
        if (id) {
          updateUserInfo(id, { ...req.body, currentApplicationId: appliFromDB._id });
        } else {
          return res.status(400).json({ message: "Please log in" });
        }
      })
      .catch((err) => console.log(err));
  } else {
    if (id) {
      updateUserInfo(id, req.body);
    } else {
      return res.status(400).json({ message: "Please log in" });
    }
  }
});
//PATCH AND CALCULATE BADGES FOR USERS 
router.patch('/badges/:id', isLoggedIn, (req,res,next)=>{
 let id = req.params.id;
 updatedBadges = {};
 User.findOne({_id:id})
 .then(userFromDb=>{
    let oldBadges = userFromDb.badges;
    for (eachBadge in req.body.badges) {
      let newRating;
      let newBadgeValue = Number(req.body.badges[eachBadge]);
      let oldBadgeValue = Number(oldBadges[eachBadge])
      //if newBadge is given for the 1st time (oldBadge === NaN)
      if (newBadgeValue !== 0 && (oldBadgeValue===0 || isNaN(oldBadgeValue))) {
        console.log('new rating')
        newRating = newBadgeValue;
      //if newBadge is given and oldBadge exists
      } else if (newBadgeValue !== 0 && oldBadgeValue){
        newRating = Math.round((oldBadgeValue + newBadgeValue)/2);
      //if newBadge is not given
      } else {
        newRating = oldBadgeValue
      }
       updatedBadges[eachBadge] = newRating
    }
    userFromDb.badges= updatedBadges;
    userFromDb.save()
    .then(updatedUser => {
      res.status(200).json(updatedUser)
    })
    .catch(err=>res.status(500).json({message:'Updating DB went wrong'}))
 })
 .catch(err=>res.status(500).json({message:'Calculating badges went wrong'}))
})
//CANDIDATE SWIPES LEFT TO REFUSE JOB POST
router.patch("/:jobPostId/swipeLeft", [isLoggedIn, isCandidate], (req, res, next) => {
  const id = req.session.currentUser._id;
  if (id) {
    User.findOne({ _id: id })
      .then((theUser) => {
        if (theUser.swipedOfferId.includes(req.params.jobPostId)) {
          res.status(500).json({ message: "Offer already swiped" });
          return;
        }
        theUser.swipedOfferId.push(req.params.jobPostId);
        theUser
          .save()
          .then((updatedUser) => {
            updatedUser.password = undefined;
            res.status(200).json({ updatedUser });
            return;
          })
          .catch((err) => res.status(500).json(err));
      })
      .catch((err) => res.status(500).json(err));
  } else {
    return res.status(400).json({ message: "Please log in" });
  }
});
/* DELETE*/
router.delete("/:id", /*isLoggedIn,*/ async (req, res, next) => {
  try {
    let user = req.session.currentUser;
    if (user && req.params.id !== user._id) {
      return res.status(403).json("You cannot delete this user.");
    }
    if (user.profileType === "recruiter") {
      let isdeletePosts = await Post.deleteMany({ recruiterId: user._id });
      let isdeleteApps = await Post.deleteMany({ _id: { $in: user.applicationId } });
    }
    if (user.profileType === "candidate") {
      let apps = await Application.find({ candidateId: user._id });
      for (let app of apps) {
        let { candidateId, acceptedCandidateId, refusedCandidateId } = app;
        candidateId.splice(candidateId.indexOf(user._id), 1);
        let idxAccept = acceptedCandidateId.indexOf(user._id);
        let idxRefuse = refusedCandidateId.indexOf(user._id);
        if (idxAccept !== -1) {
          acceptedCandidateId = acceptedCandidateId.splice(idxAccept, 1);
        }
        if (idxRefuse !== -1) {
          refusedCandidateId = refusedCandidateId.splice(idxRefuse, 1);
        }
        await Application.updateOne(
          { _id: app._id },
          {
            candidateId: candidateId,
            acceptedCandidateId: acceptedCandidateId,
            refusedCandidateId: refusedCandidateId,
          }
        );
      }
    }
    await User.deleteOne({ _id: req.params.id });
    req.session.destroy();
    res.json({ message: "You account is delete." });
    return;
  } catch (error) {
    console.log(error);
  }
  // User.findOneAndDelete({ _id: req.params.id })
  //   .then((deleteUser) => {
  //     if (!deleteUser) {
  //       res.status(400).json({ message: "No user to delete" });
  //       return;
  //     }
  //     req.session.destroy();
  //     res.status(200).json({
  //       status: "ok",
  //       message: `User with id ${deleteUser._id} was deleted.`,
  //     });
  //   })
  //   .catch((err) => res.status(500).json({ message: "Deleting went bad" }));
});

module.exports = router;
