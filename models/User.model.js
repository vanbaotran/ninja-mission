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
      // select: false 
    },
    profileType: {
      type: String,
      enum: ["recruiter", "candidate"],
      required:true
    },
    avatar: {
      type: String,
      default: "https://via.placeholder.com/150", // trouver une image par default
    },
    applicationId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Application" }],
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
      maxlength: 250, 
    },
    usefullLinks: {
      linkedin: String,
      github: String,
      CV: String,
      portfolio: String,
    },
    /* voir avec tran quel badge et type number ou string
    badge: {
      motivation: Number,
      experience: Number,
      ...
    }
    */
    companyName: String,
    companyLogo: String,
    companyWebsite: String,
    industry: String,
    swipedOfferId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Post" }],
    currentApplicationId: {type: mongoose.Schema.Types.ObjectId, ref: "Application"}
  },
  {
    timestamps: true,
    collection: "users",
  }
);

module.exports = mongoose.model("User", userSchema);
