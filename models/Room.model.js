
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roomSchema = new Schema(
  {
    roomId: String,
    recruiterId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    candidateId:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
    applicationId:{type: mongoose.Schema.Types.ObjectId, ref: "Application"},
    messages: [String]
  },
  {
    timestamps: true,
    collection: "rooms",
  }
);

module.exports = mongoose.model("Rooms", roomSchema);