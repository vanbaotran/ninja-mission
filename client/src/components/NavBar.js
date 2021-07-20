import React from 'react';
import {Link} from 'react-router-dom'
const NavBar = () =>{
  return (
    <div>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
      <Link to='/postform/new'>Create a Job post</Link>
      <Link to='/candidateform'>Edit my Candidate profile</Link>
      <Link to='/profilepage'>Candidate profile</Link>
      <Link to='/intest'>test</Link>

    </div>
  )
}
export default NavBar