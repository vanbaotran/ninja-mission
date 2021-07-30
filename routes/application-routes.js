const express = require("express");
const router = express.Router();
const User = require("../models/User.model");
const Application = require("../models/Application.model");
const { isCandidate, isRecruiter, isLoggedIn } = require("./useful.js");
// get application by candidateId
router.get("/", [isLoggedIn, isCandidate], (req, res, next) => {
  let id = req.session.currentUser._id;
  Application.find({ candidateId: id })
    .populate("jobPostId")
    .then((AppsfromDb) => {
      res.status(200).json(AppsfromDb);
      return;
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong when finding applications." })
    );
});
// get applicationCandidate data by id of app
router.get("/:id/candidates", [isLoggedIn, isRecruiter], (req, res, next) => {
  
  Application.findOne({ _id: req.params.id })
    .populate("candidateId")
    .then((AppsfromDb) => {
      AppsfromDb.candidateId.forEach(element => {
        element.password = undefined;
      });
      res.status(200).json(AppsfromDb);
      return;
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong when finding applications." })
    );
});

// get array of jobpostsid that candidate has choose
router.get("/haveCandidate", [isLoggedIn, isCandidate], (req, res, next) => {
  let id = req.session.currentUser._id;
  Application.find({ candidateId: id })
    .then((AppsfromDb) => {
      let arrCandidating = AppsfromDb ? AppsfromDb.map(el => el.jobPostId) : [];
      res.status(200).json({arrCandidating: arrCandidating});
      return;
    })
    .catch((err) =>
      res.status(500).json({ message: "Something went wrong when finding arrCandidating." })
    );
});

/* patch */
// APPLY TO A JOB POST: add candidate in candidateId
router.patch("/:applicationId/add", [isLoggedIn, isCandidate], (req, res, next) => {
  let id = req.session.currentUser._id;
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.candidateId.includes(id)) {
        res.status(400).json({ message: `You already applied to this post.` });
        return;
      }
      AppfromDb.candidateId.push(id);
      AppfromDb.save().then((updatedApp) => {
        res.status(200).json({
          message: `You successfully applied to this post.`,
          application: updatedApp,
        });
        return;
      });
    })
    .catch((err) => res.status(500).json({ message: "Applying to this job went wrong" }));
});
// UNDO THE APPLICATION: remove candidate in candidateId
router.patch("/:applicationId/remove", [isLoggedIn, isCandidate], (req, res, next) => {
  let id = req.session.currentUser._id;
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.candidateId.includes(id)) {
        console.log("test", " idx");
        let idx = AppfromDb.candidateId.findIndex((el) => el === id);
        AppfromDb.candidateId.splice(idx, 1);
        AppfromDb.save().then((updatedApp) => {
          res.status(200).json({
            message: `Your application was removed from this post.`,
            application: updatedApp,
          });
          return;
        });
      } else {
        res.status(400).json({ message: `Candidate ${id} is not applied.` });
        return;
      }
    })
    .catch((err) => res.status(500).json({ message: "Removing candidate went wrong" }));
});

// add candidate in acceptedCandidateId
router.patch("/:applicationId/accept", [isLoggedIn, isRecruiter], (req, res, next) => {
  let id = req.body.id;
  console.log(req.params.applicationId, req.body.id)
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.acceptedCandidateId.includes(id)) {
        res.status(400).json({ message: `Candidate ${id} was already accepted.` });
        return;
      }
      if (AppfromDb.refusedCandidateId.includes(id)) {
        res
          .status(400)
          .json({ message: `Candidate ${id} cannot be accepted because he/she was refused.` });
        return;
      }
      AppfromDb.acceptedCandidateId.push(id);
      console.log(AppfromDb, "========")
      AppfromDb.save().then((updatedApp) => {
      console.log(updatedApp)
        res.status(200).json({
          message: `Candidate ${id} was succesfully accepted in application ${req.params.applicationId}`,
          application: updatedApp,
        });
        return;
      });
    })
    .catch((err) => res.status(500).json({ message: "Adding candidate went wrong" }));
});
// remove acceptedCandidate in acceptedCandidateId
router.patch("/:applicationId/undoAccept", [isLoggedIn, isRecruiter], (req, res, next) => {
  let id = req.body.id;
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.acceptedCandidateId.includes(id)) {
        console.log("test", " idx");
        let idx = AppfromDb.acceptedCandidateId.findIndex((el) => el === id);
        AppfromDb.acceptedCandidateId.splice(idx, 1);
        AppfromDb.save().then((updatedApp) => {
          res.status(200).json({
            message: `Candidate ${id} was removed from acceptation of the application ${req.params.applicationId}`,
            application: updatedApp,
          });
          return;
        });
      } else {
        res.status(400).json({ message: `Candidate ${id} was not accepted.` });
        return;
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Removing candidate from accepted applications went wrong" })
    );
});
//REFUSING A CANDIDATE
router.patch("/:applicationId/refuse", [isLoggedIn, isRecruiter], (req, res, next) => {
  let id = req.body.id;
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.refusedCandidateId.includes(id)) {
        res.status(403).json({ message: `Candidate ${id} was already refused.` });
        return;
      }
      if (AppfromDb.acceptedCandidateId.includes(id)) {
        res
          .status(403)
          .json({ message: `Candidate ${id} cannot be refused because he/she already accepted.` });
        return;
      }
      AppfromDb.refusedCandidateId.push(id);
      AppfromDb.save().then((updatedApp) => {
        res.status(200).json({
          message: `Candidate ${id} was succesfully refused in application ${req.params.applicationId}`,
          application: updatedApp,
        });
        return;
      });
    })
    .catch((err) => res.status(500).json({ message: "Refusing candidate went wrong" }));
});
//UNDO REFUSE A CANDIDATE
router.patch("/:applicationId/undoRefuse", [isLoggedIn, isRecruiter], (req, res, next) => {
  let id = req.body.id;
  Application.findById(req.params.applicationId)
    .then((AppfromDb) => {
      if (AppfromDb.refusedCandidateId.includes(id)) {
        console.log("test", " idx");
        let idx = AppfromDb.refusedCandidateId.findIndex((el) => el === id);
        AppfromDb.refusedCandidateId.splice(idx, 1);
        AppfromDb.save().then((updatedApp) => {
          res.status(200).json({
            message: `Candidate ${id} was removed from refusing of the application ${req.params.applicationId}`,
            application: updatedApp,
          });
          return;
        });
      } else {
        res.status(400).json({ message: `Candidate ${id} was not accepted.` });
        return;
      }
    })
    .catch((err) =>
      res.status(500).json({ message: "Removing candidate from refused applications went wrong" })
    );
});
module.exports = router;