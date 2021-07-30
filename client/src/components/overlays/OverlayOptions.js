import React from 'react';
import {Link} from 'react-router-dom';
const OverlayOptions = () => {
  return (
    <div className='overlay options'>
    <h1>OPTIONS</h1>
    <Link to='/myBadges'><button className='btn blue'>GIVE A BADGE</button></Link>
    <button className='btn red'>REPORT</button>
    <button className='btn yellow'>DELETE THIS MATCH</button>
    <p>Cancel</p>
    </div>
  )
}
export default OverlayOptions;