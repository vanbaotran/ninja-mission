import React from 'react';
import service from "../service";
const OverlayOptions = (props) => {
  async function deleteChat() {
    try {
      await service.delete(`/applications/${props.roomId}`);
      props.history.push("/conversations");
    } catch (error) {
      console.log(error);
      return;
    }
  }
  
  return (
    <div className='overlay options'>
    <h1>OPTIONS</h1>
    <button onClick={() => {
      props.toggle()
      props.history.push({pathname:`/giveBadges`, state: props.reviewedPerson})}} className='btn blue'>GIVE A BADGE</button>
    {/* <button className='btn red'>REPORT</button> */}
      <button onClick={() => deleteChat()} className='btn red'>DELETE THIS MATCH</button>
    <p onClick={props.toggle}>Cancel</p>
    </div>
  )
}
export default OverlayOptions;