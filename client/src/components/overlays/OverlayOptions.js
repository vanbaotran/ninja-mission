import React from 'react';


const OverlayOptions = (props) => {
  return (
    <div className='overlay options'>
    <h1>OPTIONS</h1>
    <button onClick={() => props.history.push({pathname:"/giveBadges", state: props.history.location.state})} className='btn blue'>GIVE A BADGE</button>
    <button className='btn red'>REPORT</button>
    <button className='btn yellow'>DELETE THIS MATCH</button>
    <p>Cancel</p>
    </div>
  )
}
export default OverlayOptions;