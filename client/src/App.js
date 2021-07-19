import React from 'react'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/PostForm';
import {Switch, Route} from 'react-router-dom'
class App extends React.Component {
  state = {loggedInUser:null}
  updateLoggedInUser = (userObj) =>{
    this.setState({loggedInUser:userObj})
  }
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login'  render={()=><Login currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/signup' render={()=><Signup updateUser={this.updateLoggedInUser}/>} />
          <Route path='/postForm' component={PostForm}/>
          {/* <Route path='/candidateProfileEdit' component={EditProfile}/> */}
        </Switch>
      </div> 
    );
  }
}

export default App;
