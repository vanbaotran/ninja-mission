import React from 'react';
import {logout} from './service'
class Logout extends React.Component{
  logout = () =>{
    if(this.props.currentUser){
      logout()
    .then(()=>console.log('LOGGED OUT'))
    .catch(err=>console.log(err))
    }
  }
  render(){
    return <button onClick={this.logout}>Logout</button>
  }
}
export default Logout