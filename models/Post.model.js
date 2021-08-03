const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema(
  {
    offerName: String,
    companyLogo: String, // voir si default ou required
    companyBio: {
      type: String
    },
    companyName: String,
    description: {
      type: String,
    },
    position: String,
    contract: {
      type: String,
      enum: ["Internship", "Freelance", "Permanent", "Temporary"],
    },
    experienceLevel: {
      type: String,
      enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
    },
    codeLanguage: [String], // voir si enum et ou vérification bonne donnée
    location: { city: { type: [String] }, country: { type: [String] } },
    remote: Boolean,
    funFact: {
      type: String,
    },
    website:String,
    recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" },
  },
  {
    timestamps: true,
    collection: "posts",
  }
);

module.exports = mongoose.model("Post", postSchema);
