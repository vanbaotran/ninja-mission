import React from 'react';
import {Link} from 'react-router-dom'
const NavBar = () =>{
  return (
    <div>
      <Link to='/login'>Log in </Link>
      <Link to='/signup'>Sign up </Link>
      <Link to='/postform/new'>Create a Job post </Link>
      <Link to='/editCandidateform'>Edit my Candidate profile </Link>
      <Link to='/profilepage'>Candidate profile </Link>
      <Link to='/swipeOffer/random'>Swipe Offer </Link>
      <Link to='/posts/60f593486a935c3cfee130d2'>postDetails </Link>
      <Link to='/logout'>Log Out </Link>
      <Link to='/levelspage'>MY LEVEL </Link>
       <Link to='/intest'> test </Link>
      <Link to='/swipeCandidate/random'>SWIPE CANDIDATE </Link>
      <Link to='/myoffers'>  My offers </Link>
    </div>
  )
}
export default NavBar