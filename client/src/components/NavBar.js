import React from 'react';
import {Link} from 'react-router-dom'
const NavBar = () =>{
  return (
    <div>
      <Link to='/login'>Log in</Link>
      <Link to='/signup'>Sign up</Link>
      <Link to='/postForm'>Create a Job post</Link>
      <Link to='/editProfile'>Edit my profile</Link>
      <Link to='/intest/60f653692a0325bd124a8ad6'>test</Link>

    </div>
  )
}
export default NavBar