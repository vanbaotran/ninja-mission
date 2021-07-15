const isLoggedIn = (req, res, next) => { 
  if (!req.session.currentUser){
    res.status(403).json({ message: "Your must be logged in to do this action." });
    return;
  }
    next();
 
}
const isCandidate = (req,res, next)=>{
 if (req.session.currentUser.profileType === "recruiter"){
  res.status(403).json({ message: "Your must be candidate to do this action." });
  return;
 }
 next();
} 
const isRecruiter = (req,res,next)=>{

  if (req.session.currentUser.profileType === "candidate") {
    res.status(403).json({ message: "Your must be recruiter to do this action." });
    return;
  }
  next();
}

module.exports = {isCandidate,isRecruiter,isLoggedIn}