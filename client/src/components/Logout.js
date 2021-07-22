import React from 'react';
import {logout} from './service'
class Logout extends React.Component{

  logout = () =>{
    if(this.props.currentUser){
      logout()
    .then(()=>{
      this.props.updateUser(null)
      console.log('LOGGED OUT')
      })
    .catch(err=>console.log(err))
    }
  }
  render(){
    return <div onClick={this.logout}>Logout</div>
  }
}
export default Logout