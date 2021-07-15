const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

const bcrypt = require("bcryptjs");

router.post("/signup", (req, res, next) => {
  const { name, email, password, profileType } = req.body;
  if (!name || !email || !password || !profileType) {
    res.status(400).json({ message: "Provide name, email and password" });
  }
  if (password.length < 8) {
    res
      .status(400)
      .json({
        message:
          "Please make your password at least 8 characters long for security purposes.",
      });
    return;
  }

  User.findOne({ email })
    .then((foundUser) => {
      if (foundUser) {
        res
          .status(400)
          .json({ message: "Email already taken. Please enter another one." });
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
          res
            .status(400)
            .json({ message: "Saving user to database went wrong" });
        });
    })
    .catch((err) => res.status(500).json({ message: "Email check went bad" }));
});
router.post("/login", (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email })
    .then((user) => {
      console.log(user);
      if (!user) {
        return next(
          new Error(
            "No user with that email. Please sign up if you are new to Ninja Mission"
          )
        );
      }
      if (bcrypt.compareSync(password, user.password) !== true) {
        return next(new Error("Wrong credentials"));
      } else {
        req.session.currentUser = user;
        console.log(user);
        res.json(user);
      }
    })
    .catch(next);
});
router.post("/logout", (req, res, next) => {
  if (req.session.currentUser) {
    req.session.destroy();
    res.json({ message: "You are now logged out" });
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});
router.get("/loggedin", (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
    res.status(200).json(req.session.currentUser);
    return;
  }
  res.status(403).json({ message: "Unauthorized" });
});

/* GET */
router.get("/random", (req, res, next) => {
  // User.findOne({ _id: req.session.currentUser._id })
  //   .populate('currentApplicationId')
  //   .then((theUser) => {
  //     User.count().exec(function (err, count) {
  //       // Get a random entry
  //       var random = Math.floor(Math.random() * count);

  //       // Again query all users but only fetch one offset by our random #
  //       User.count().exec(function (err, count) {
  //         // Get a random entry
  //         var random = Math.floor(Math.random() * count);
  //           // Tada! random user
  //           let randomUser = theUser;
  //           while(theUser.currentApplicationId.refusedCandidateId.includes(randomUser._id){
  //             User.count().exec(function (err, count) {
  //               // Get a random entry
  //               var random = Math.floor(Math.random() * count);
  //               User.count().exec(function (err, count) {
  //                 // Get a random entry
  //                 var random = Math.floor(Math.random() * count);
  //                 randomUser = 
  //               }
  //           }
  //           )
  //           console.log(result);
  //         });
  //     });
  //   })
  //   .catch((err) => res.status(500).json({ message: "Users not found" }));
});
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .then((ret) => {
      if (!ret) {
        res.status(204).json(ret);
      } else {
        res.status(200).json(ret);
      }
    })
    .catch((err) => res.status(400).json(err));
});
/* PUT */
router.patch("/", (req, res, next) => {
  const id = req.session.currentUser._id;
  if (req.body.password) {
    res.status(403).json("Password cannot be changed by this way.");
    return;
  }
  if (id) {
    User.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true, runValidators: true },
      function (err, updatedUser) {
        if (err) {
          return res.status(422).json(err);
        }
        return res.status(200).json(updatedUser);
      }
    );
  } else {
    return res.status(400).json({ message: "Please log in" });
  }
});
//CANDIDATE SWIPES LEFT TO REFUSE JOB POST
router.patch("/:jobPostId/swipeLeft", (req, res, next) => {
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
router.delete("/:id", (req, res, next) => {
  if (
    req.session.currentUser &&
    req.params.id !== req.session.currentUser._id
  ) {
    return res.status(403).json("You cannot delete this user.");
  }
  User.findOneAndDelete({ _id: req.params.id })
    .then((deleteUser) => {
      if (!deleteUser) {
        res.status(400).json({ message: "No user to delete" });
        return;
      }
      req.session.destroy();
      res
        .status(200)
        .json({
          status: "ok",
          message: `User with id ${deleteUser._id} was deleted.`,
        });
    })
    .catch((err) => res.status(500).json({ message: "Deleting went bad" }));
});
module.exports = router;
