import React from 'react';
import {login} from './service';
import BlueTop from "./backgrounds/blueTop";

class Login extends React.Component{
  state = {email:'', password:''}
  handleSubmit = (event) =>{
    event.preventDefault();
    const {email,password} = this.state
    login(email,password)
    .then(response=>{
      this.setState({ email: "", password: "" });
      this.props.updateUser(response)
      console.log(this.props.currentUser)
    })
    .catch(err=>console.log(err))
  }
  handleChange = (event) =>{
    const {name, value}=event.target
    this.setState({[name]:value})
  }
  render(){
    return (
      <div className="block-login">
      <BlueTop/>
       <form onSubmit={this.handleSubmit}>
      <h1 className='text-blue'>WELCOME BACK!</h1>
            <label>Email</label>
            <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
            <label>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
            <button className='btn red'>LOG IN</button>
          </form>
          <img src='/images/ninja-logo.png' alt='logo'/>
      </div>
    )
  }
}
export default Login