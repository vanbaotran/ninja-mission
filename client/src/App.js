import React from 'react'
import './App.css';
import Homepage from './components/Homepage';
import Login from './components/Login';
import Signup from './components/Signup';
import PostForm from './components/forms/PostForm';
import RecruiterForm from "./components/forms/RecruiterForm";
import {Switch, Route} from 'react-router-dom';
import CandidateForm from './components/forms/CandidateForm'
import {loggedIn, editProfile} from './components/service';
import ProfilePage from './components/ProfilePage'
// import NavBar from './components/NavBar';
// import BlueTop from "./components/backgrounds/blueTop";
import SwipeJobPost from './components/SwipeJobPost';
import PostDetails from './components/details/PostDetails';
import Logout from './components/Logout';
import LevelPage from './components/LevelPage';
import CandidateDetails from "./components/details/CandidateDetails"
import SwipeCandidateProfile from './components/SwipeCandidateProfile'
import MyOffersList from './components/MyOffersList'
import MyDashBoard from './components/MyDashboard';
import DashboardDetails from './components/DashboardDetails';
import CompanyDetails from './components/details/CompanyDetails';
import MyBadges from './components/MyBadges';
import OverlayOptions from './components/overlays/OverlayOptions';
import MyApplications from './components/MyApplications'
import OverlayUpdated from './components/overlays/OverlayUpdated'
import Chat from './components/Chat';

class App extends React.Component {
  state = {
    loggedInUser: null,
    currentPostId: null,
    candidate: null,
    recruiter: null,
  }

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
  updateCurrentPostId = (id) => {
    this.setState({ currentPostId: id });
  }
  updateCandidate = (objCandidate) =>  {
    this.setState({candidate: objCandidate})
  }
   updateRecruiter = (objRecruiter) =>  {
    this.setState({recruiter: objRecruiter})
  }
  componentDidMount() {
    this.fetchUser()
  }
  componentDidUpdate(prevProps, prevState){
    // console.log(this.state.currentUser)
    if(prevProps.currentUser !== this.props.currentUser && (this.props.currentUser!==null)){
      editProfile({currentPostId:this.state.currentPostId})
      .then(response=>{
        this.setState({currentPostId:this.state.currentPostId})
        console.log(response)
      })
      .catch(err=>console.log(err))
    }
    // if(prevState.candidate !== this.state.candidate ){
    //   this.
    //   .then(response=>{
    //     this.setState({currentPostId:this.state.currentPostId})
    //     console.log(response)
    //   })
    //   .catch(err=>console.log(err))
    // }
   
  }
  updateLoggedInUser = (userObj) =>{
    this.setState({loggedInUser:userObj})
  }
  render(){
    return (
      <div className="App">
        <Switch>
          <Route exact path='/' component={Homepage}/>
          <Route path='/login'  render={(props)=><Login {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>}/>
          <Route path='/signup' render={(props)=><Signup {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/editCandidateform' render={(props)=><CandidateForm {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/profilepage' render={(props)=><ProfilePage  {...props} currentUser={this.state.loggedInUser} currentPostId={this.state.currentPostId}/>} />
          <Route path='/postform/:id' render={(props) => <PostForm {...props} updateUser={this.updateLoggedInUser} updateCurrentPost={this.updateCurrentPostId}/>}/> 
          <Route path='/posts/:id/fromswipe' render={(props) => <PostDetails {...props} currentUser={this.state.loggedInUser} fromswipe={true} />} />
          <Route path='/posts/:id' render={(props) => <PostDetails {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser} updateCurrentPost={this.updateCurrentPostId} />} />
          <Route path='/recruiterform' render={(props) => <RecruiterForm {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser} />} />
          <Route path='/swipeOffer/random' render={(props)=><SwipeJobPost currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser} {...props}/>} />
          <Route path='/swipeOffer/:id' render={(props)=><SwipeJobPost currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser} {...props}/>} />
          <Route path='/logout' render={()=><Logout currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/levelspage' render={()=><LevelPage currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser}/>} />
          <Route path='/chatbox/:id' render={(props) => <Chat {...props} currentUser={this.state.loggedInUser} updateUser={this.updateLoggedInUser} currentCandidate={this.state.candidate} updateCandidate={this.updateCandidate} currentRecruiter={this.state.recruiter} updateRecruiter={this.updateRecruiter}/>}/>
          <Route path='/swipeCandidate/random' render={(props)=><SwipeCandidateProfile  {...props} currentUser={this.state.loggedInUser}/>} />
          <Route path='/swipeCandidate/:id' render={(props)=><SwipeCandidateProfile {...props} currentUser={this.state.loggedInUser}/>} />
          <Route path='/users/:id/fromswipe' render={(props)=><CandidateDetails {...props} currentUser={this.state.loggedInUser} from={"swipe"} currentCandidate={this.state.candidate} updateCandidate={this.updateCandidate}/>} />
          <Route path='/users/:id/fromdashboard' render={(props)=><CandidateDetails {...props} currentUser={this.state.loggedInUser} from={"dashboard"}/>} />
          <Route path='/personalProfile' render={(props)=><CandidateDetails {...props} currentUser={this.state.loggedInUser} />} />
          <Route path='/myoffers' render={(props)=><MyOffersList {...props} currentPostId={this.state.currentPostId} currentUser={this.state.loggedInUser}/>} />
          <Route exact path='/mydashboard' render={(props)=><MyDashBoard {...props} currentPostId={this.state.currentPostId} currentUser={this.state.loggedInUser}/>} />
          <Route path='/mydashboard/:id' render={(props)=><DashboardDetails currentUser={this.state.loggedInUser} {...props} />} />
          <Route path='/companyDetails' render={(props)=><CompanyDetails currentUser={this.state.loggedInUser} {...props} />} />
          <Route path='/myBadges' render={(props)=><MyBadges currentUser={this.state.loggedInUser} {...props} />} />
          <Route path='/options' render={(props)=><OverlayOptions currentUser={this.state.loggedInUser} {...props} />} />
          <Route path='/myapplications' render={(props)=><MyApplications currentUser={this.state.loggedInUser} {...props} />} />
          <Route path='/overlayupdated' render={(props)=><OverlayUpdated {...props} />} />
        </Switch>
      </div> 
    );
  }
}

export default App;
