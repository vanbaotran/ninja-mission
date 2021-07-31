require('dotenv').config();
const mongoose = require('mongoose');
const data = require('./data.json');
const User = require('../models/User.model')
// console.log(data);
mongoose
  .connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
  .then(x => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
  })
  .catch(err => {
    console.error('Error connecting to mongo', err)
  });
let dataNewPassWord = data.map(el=>{
  if(el.password.length < 8) {
    el.password +='sdf'
  }
  return el
})
User.insertMany(dataNewPassWord).then(data=>console.log(data.map(el=>el._id))).catch(err=>console.log(err))