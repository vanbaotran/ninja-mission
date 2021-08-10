import React from 'react';
import {login} from './service';
import BlueTop from "./backgrounds/BlueTop";

class Login extends React.Component{
  state = {
    email:'',
    password: '',
    errMessage: ''
  }
  handleSubmit = (event) =>{
    event.preventDefault();
    const { email, password } = this.state
    if (!email || !password) return;
    login(email,password)
      .then(response => {
        if (!response) {
          console.log(response)
          this.setState({ errMessage: "Wrong credentials." });
          return;
      }
      this.setState({ email: "", password: "", errMessage:'' });
      this.props.updateUser(response)
      console.log(this.props.currentUser)
      if (response.profileType==="recruiter") {
        this.props.history.push('/swipeCandidate/random')
      } else {
        this.props.history.push('/swipeOffer/random')
      }
    })
    .catch(err=>console.log(err,"============"))
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
       <div className="form-no-btn">
      <h1 className='text-blue'>WELCOME BACK!</h1>
            <label>Email
             <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
            </label>
            <label>Password
             <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
            </label>
            {/* {!this.props.currentUser && <p className='text-red'>{this.state.errorMessage}</p>} */}
            <p className="text-red"> {this.state.errMessage}</p>
           </div>
            <button className='btn red'>LOG IN</button>
          </form>
          <img className='logo-footer' src='/images/ninja-logo.png' alt='logo'/>
      </div>
    )
  }
}
export default Login