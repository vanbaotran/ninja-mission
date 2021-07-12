const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let applicationSchema = new Schema(
  {
    candidateID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    acceptedCandidateID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    jobPostID: { type: mongoose.Schema.Types.ObjectId, ref: "Job" }
  },
  {
    timestamps: true,
    collection: "applications",
  }
);

module.exports = mongoose.model("Application", applicationSchema);
