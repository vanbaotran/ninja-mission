import React from 'react'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import RecruiterForm from "./components/forms/RecruiterForm";
import {Switch, Route} from 'react-router-dom';
import EditProfile from './components/EditProfile'
import service,{loggedIn} from './components/service';
import NavBar from './components/NavBar'
class App extends React.Component {
  state = {loggedInUser:null}
 fetchUser() {
    if (this.state.loggedInUser === null || this.state.loggedInUser === false){
      loggedIn()
        .then(response => {
          this.setState({loggedInUser: response})
        })
        .catch(err => {
          this.setState({loggedInUser: false}) 
        })
    } 
  }
  componentDidMount() {
    this.fetchUser()
  }
  updateLoggedInUser = (userObj) =>{
    this.setState({loggedInUser:userObj})
  }
  render(){
    return (
      <div className="App">
      <NavBar/>
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login'  render={()=><Login currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>}/>
          <Route path='/signup' render={()=><Signup currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/editProfile' render={()=><EditProfile currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/postForm' render={(props) => <PostForm {...props} />} />
          <Route path='/intest' render={(props)=><RecruiterForm {...props} currentUserId={this.state.loggedInUser?this.state.loggedInUser._id:false} updateUser={this.fetchUser}/>}/>
        </Switch>
      </div> 
    );
  }
}

export default App;
