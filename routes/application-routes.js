const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Application = require("../models/Application.model");

/* Put */
// add candidate in candidateId
router.put("/add/:applicationId", (req, res, next) => {
  let id = req.session.currentUser._id;
  if (!id) {
    res.status(403).json({ message: "Your must be logged to apply." });
    return;
  }
  console.log(req.session.currentUser.profileType);
  if (req.session.currentUser.profileType === "recruiter") {
    res.status(403).json({ message: "Your must be candidate to apply." });
    return;
  }
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.candidateId.includes(id)) {
        res.status(400).json({ message: `Candidate ${id} already applied.` });
        return;
      }
      AppfromDb.candidateId.push(id);
      AppfromDb.save().then((updatedApp) => {
        res.status(200).json({
          message: `Candidate ${id} was added in application ${req.params.applicationId}`,
          application: updatedApp,
        });
        return;
      });
    })
    .catch((err) => res.status(500).json({ message: "Added candidate was wrong" }));
});
// remove candidate in candidateId
router.put("/remove/:applicationId", (req, res, next) => {
  let id = req.session.currentUser._id;
  if (!id) {
    res.status(403).json({ message: "Your must be logged to remove apply." });
    return;
  }
  if (req.session.currentUser.profileType === "recruiter") {
    res.status(403).json({ message: "Your must be candidate to remove your apply." });
    return;
  }
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.candidateId.includes(id)) {
        console.log("test", " idx");
        let idx = AppfromDb.candidateId.findIndex((el) => el === id);
        AppfromDb.candidateId.splice(idx, 1);
        AppfromDb.save().then((updatedApp) => {
          res.status(200).json({
            message: `Candidate ${id} was removed in application ${req.params.applicationId}`,
            application: updatedApp,
          });
          return;
        });
      } else {
        res.status(400).json({ message: `Candidate ${id} is not applied.` });
        return;
      }
    })
    .catch((err) => res.status(500).json({ message: "Removed candidate was wrong" }));
});
// get application by candidateId
router.get("/candidate/:candidateId", (req, res, next) => {
  let id = req.session.currentUser._id;
  if (!id) {
    res.status(403).json({ message: "Your must be logged to show your applications." });
    return;
  }
  if (req.session.currentUser.profileType === "recruiter") {
    res.status(403).json({ message: "Your must be candidate to show your applications." });
    return;
  }
  Application.find({ candidateId: req.params.candidateId })
    .populate("jobPostId")
    .then((AppsfromDb) => {
      res.status(200).json(AppsfromDb);
      return;
    })
    .catch((err) => res.status(500).json({ message: "Find application was wrong" }));
});

// add candidate in acceptedCandidateId
router.put("/accept/add/:applicationId", (req, res, next) => {
  let id = req.body.id;
  if (!req.session.currentUser._id) {
    res.status(403).json({ message: "Your must be logged to accept." });
    return;
  }
  if (req.session.currentUser.profileType === "candidate") {
    res.status(403).json({ message: "Your must be recruiter to accept." });
    return;
  }
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.acceptedCandidateId.includes(id)) {
        res.status(400).json({ message: `Candidate ${id} already accepted.` });
        return;
      }
      AppfromDb.acceptedCandidateId.push(id);
      AppfromDb.save().then((updatedApp) => {
        res.status(200).json({
          message: `Candidate ${id} accepted in application ${req.params.applicationId}`,
          application: updatedApp,
        });
        return;
      });
    })
    .catch((err) => res.status(500).json({ message: "Added candidate was wrong" }));
});
// remove acceptedCandidate in acceptedCandidateId
router.put("/accept/remove/:applicationId", (req, res, next) => {
  let id = req.body.id;
  if (!id) {
    res.status(403).json({ message: "Your must be logged to remove accept." });
    return;
  }
  if (req.session.currentUser.profileType === "candidate") {
    res.status(403).json({ message: "Your must be recruiter to remove accepted candidate." });
    return;
  }
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.acceptedCandidateId.includes(id)) {
        console.log("test", " idx");
        let idx = AppfromDb.acceptedCandidateId.findIndex((el) => el === id);
        AppfromDb.acceptedCandidateId.splice(idx, 1);
        AppfromDb.save().then((updatedApp) => {
          res.status(200).json({
            message: `Candidate ${id} was unaccepeted in application ${req.params.applicationId}`,
            application: updatedApp,
          });
          return;
        });
      } else {
        res.status(400).json({ message: `Candidate ${id} is not accepted.` });
        return;
      }
    })
    .catch((err) => res.status(500).json({ message: "Accept candidate was wrong" }));
});
module.exports = router;
