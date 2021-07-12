const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      // select: false, // voir avec tran
    },
    profileType: {
      type: String,
      enum: ["recruiter", "candidate"],
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150", // trouver une image par default
    },
    applicationID: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
    cvUrl: [String],
    level: {
      type: String,
      enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
    },
    codeLanguage: [String], // voir si enum et ou vérification bonne donnée
    scope: { city: { type: [String] }, country: { type: [String] } },
    bio: {
      type: String,
      maxlength: 500,
    },
    funfact: {
      type: String,
      maxlength: 250, // voir si utile
    },
    usefullLinks: {
      linkedin: String,
      github: String,
      CV: String,
      portfolio: String
    },
    /* voir avec tran quel badge et type number ou string
    badge: {
      motivation: Number,
      experience: Number,
      ...
    }
    */
    swipedOfferId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Job" }]
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
