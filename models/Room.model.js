
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let roomSchema = new Schema(
  {
    roomId: String,
    messages: [String]
  },
  {
    timestamps: true,
    collection: "rooms",
  }
);

module.exports = mongoose.model("Rooms", roomSchema);