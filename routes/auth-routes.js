const express = require('express');
const authRoutes = express.Router();

const bcrypt = require('bcryptjs');

const User = require('../models/User.model');

authRoutes.post('/signup',(req,res,next)=>{
  const {name,email,password,profileType} = req.body;
  if (!name||!email||!password||!profileType){
    res.status(400).json({message:'Provide name, email and password'})
  }
  if (password.length < 8) {
    res.status(400).json({ message: 'Please make your password at least 8 characters long for security purposes.' });
    return;
  }

  User.findOne({email})
  .then(foundUser=>{
    if(foundUser){
      res.status(400).json({message:'Email already taken. Please enter another one.'})
      return;
    }
    const salt = bcrypt.genSaltSync(10);
    const hashPass = bcrypt.hashSync(password,salt)

    const aNewUser = new User({
      name,
      email,
      password: hashPass,
      profileType
    })
    aNewUser.save()
    .then(aNewUser=>{
      req.session.currentUser = aNewUser;
      res.status(200).json(aNewUser);
    })
    .catch(err=>{
      res.status(400).json({message:'Saving user to database went wrong'})
    })
  })
  .catch(err=>res.status(500).json({message:'Email check went bad'}))
})
authRoutes.post('/login',(req,res,next)=>{
  const {email,password}=req.body;
  console.log(email,password)
  User.findOne({email},'+password')
    .exec()
    .then(user=>{
      console.log(user)
      if(!user){
        return next(new Error('No user with that email. Please sign up if you are new to Ninja Mission'))
      }
      if (bcrypt.compareSync(password, user.password) !==true) {
        return next(new Error('Wrong credentials'))
      } else {
        req.session.currentUser = user;
        console.log(user)
        res.json(user)
      }
    })
    .catch(next)
})
authRoutes.post('logout',(req,res,next)=>{
  if (req.session.currentUser){
    req.session.destroy();
    res.json({message:'You are now logged out'})
    return;
  } 
  res.status(403).json({message:'Unauthorized'})
})
authRoutes.get('/loggedin', (req, res, next) => {
  // req.isAuthenticated() is defined by passport
  if (req.session.currentUser) {
      res.status(200).json(req.session.currentUser);
      return;
  }
  res.status(403).json({ message: 'Unauthorized' });
});
 
module.exports = authRoutes;