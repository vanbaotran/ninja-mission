const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let jobSchema = new Schema(
  {
    companyLogo: String, // voir si default ou required
    description: {
      type: String,
      maxlength: 500,
      position: String,
      contract: {
        type: String,
        enum: ["Internship", "Freelance", "Permanent", "Temporary"]
      },
      experienceLevel: {
        type: String,
        enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
      },
      codeLanguage: [String],  // voir si enum et ou vérification bonne donnée
      scope: { city: { type: [String] }, country: { type: [String] } },
      remote: Boolean,
      funFact: {
        type: String,
        maxlength: 250, 
      },
      recruiterId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      applicationId: { type: mongoose.Schema.Types.ObjectId, ref: "Application" }
    },

  },
  {
    timestamps: true,
    collection: "jobs",
  }
);

module.exports = mongoose.model("Job", jobSchema);
