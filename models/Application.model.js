const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let applicationSchema = new Schema(
  {
    candidateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    acceptedCandidateId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    jobPostId: { type: mongoose.Schema.Types.ObjectId, ref: "Post" }

  },
  {
    timestamps: true,
    collection: "applications",
  }
);

module.exports = mongoose.model("Application", applicationSchema);
