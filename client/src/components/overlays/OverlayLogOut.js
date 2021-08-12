import React from 'react';
const OvelayLogOut = (props) => {
  return (
    <div className='overlay'>
    <img className='matched' src='/images/logout.png' alt='match'/>
    <h1>Do you want to log out?</h1>
    <button onClick={()=>props.logout()} className='btn blue'>Yes</button>
    <button onClick={()=>props.toggle()} className='btn red'>No</button>
    </div>
  )
}
export default OvelayLogOut