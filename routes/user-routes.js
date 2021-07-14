const express = require("express");
const router = express.Router();
const User = require("../models/User.model");

/* GET */
router.get("/", (req, res, next) => {
  User.find({})
    .then((ret) => res.status(200).json(ret))
    .catch((err) => res.status(500).json({message:'Users not found'}));
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
router.put("/:id", (req, res, next) => {
  if (req.body.password) {
    res.status(403).json("Password cannot be changed by this way.");
  }
  User.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true, runValidators: true },
    function (err, updatedUser) {
      if (err) {
        return res.status(422).json(err);
      }
      return res.status(200).json(updatedUser);
    }
  );
});
/* DELETE*/
router.delete("/:id", (req, res, next) => {
  if (req.session.currentUser && req.params.id !== req.session.currentUser._id) {
    return res.status(403).json("You cannot delete this user.");
  }
  User.findOneAndDelete({ _id: req.params.id })
    .then(deleteUser => {
      if (!deleteUser) {
        res.status(400).json({ message: "No user to delete" });
        return;
      }
      req.session.destroy();
      res.status(200).json({status: "ok", message:`User with id ${deleteUser._id} was deleted.`})
    })
  .catch(err => res.status(500).json({ message: "Deleting went bad" }))
});
module.exports = router;
