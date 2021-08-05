require("dotenv").config();
const mongoose = require("mongoose");
const data = require("./data.json");
const dataPost = require("./dataPost.json");
const User = require("../models/User.model");
const Post = require("../models/Post.model");
const App = require("../models/Application.model");
const bcrypt = require("bcryptjs");
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then((x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
  })
  .catch((err) => {
    console.error("Error connecting to mongo", err);
  });
let dataNewPassWord = data.map((el) => {
  if (el.password.length < 8) {
    el.password += "sdf";
  }
  const salt = bcrypt.genSaltSync(10);
  const hashPass = bcrypt.hashSync(el.password, salt);
  el.password = hashPass;
  return el;
});

async function insertMockData() {
  try {
    const USERS = await User.insertMany(dataNewPassWord);
    const recruiters = [];
    const candidates = [];
    USERS.map((el) => {
      if (el.profileType === "recruiter") {
        recruiters.push(el);
        return;
      } else {
        candidates.push(el);
        return;
      }
    });
    let nbPostByRecruiter = Math.floor(250 / recruiters.length);
    let sliceIndex = nbPostByRecruiter;
    let appId = [];
    let offset = 0;
    for (const recruiter of recruiters) {
      const postsByRecruiter = dataPost.slice(offset * nbPostByRecruiter, sliceIndex);
      offset += 1;
      sliceIndex = sliceIndex + nbPostByRecruiter;
      let postsFromDb = await Post.insertMany(postsByRecruiter);
      const appIds = [];
      let currentApp = [];
      postsFromDb.forEach(async (postDb) => {
        try {
          let app = await App.create({ jobPostId: postDb._id });
          appIds.push(app._id);
          currentApp = [app._id];
          await Post.updateOne(
            { _id: postDb._id },
            { recruiterId: recruiter._id, applicationId: app._id }
          );
          console.log(appIds)
          await User.updateOne(
            { _id: recruiter._id },
            { currentApplicationId: currentApp[0], applicationId: appIds }
          );
        } catch (error) {
          console.log("====================", error);
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}
insertMockData();
