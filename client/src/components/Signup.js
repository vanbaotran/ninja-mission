import React from 'react';
import {signup} from './service'
class Signup extends React.Component{
  state = {
    name:'',
    email:'',
    password:'',
    profileType:''
  }
  updateProfileType = (profileType) =>{
    this.setState({
      profileType: profileType
    })
  }
  handleChange= (event) =>{
    const {name,value} = event.target;
    this.setState({[name]:value})
  }
  handleSubmit = (event) =>{
    event.preventDefault();
    const {name, email, password, profileType} = this.state
    signup(name, email, password, profileType)
      .then(response => {
        console.log(response)
        this.setState({ 
          name:'',
          email:'',
          password:'',
          profileType:''
        })
        // this.props.updateUser(response)
      })
      .catch(error => console.log(error))

    this.setState({
     
    })
  }
  render(){
    if (this.state.profileType===''){
      return (
        <div>
          <div className='landPage'>
            <h2>You are here to...</h2>
            <div onClick={()=>this.updateProfileType("recruiter")}>
            <img src='/images/temple.png' alt='temple'/>
            <h4 className='text-blue'>HIRE A NINJA</h4>
            </div>
            <div onClick={()=>this.updateProfileType("candidate")}>
            <img src='/images/ninja.png' alt='ninja'/>
            <h4 className='text-red'>FIND YOUR MISSION</h4>
            </div>
          </div>
          <img src='/images/ninja-logo.png' alt='logo'/>
        </div>
      )
    } else {
      return (
        <div>
          <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type='text' name='name' value={this.state.name} onChange={(e)=>this.handleChange(e)}/>
            <label>Email</label>
            <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
            <label>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
            <button>DISCOVER THE NINJA WORLD</button>
          </form>
        </div>
      )
    }
  } 
}
export default Signup