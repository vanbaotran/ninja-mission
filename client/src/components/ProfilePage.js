import React from 'react';
import {Link} from 'react-router-dom';
import { getPostData} from './service';
import BlueTop from "./backgrounds/BlueTop";
import RedBottom from './backgrounds/RedBottom';
import {logout} from './service'
class ProfilePage extends React.Component {
  state = {
    currentPost:{}
  }
  getAge = (dateString) =>{
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m<0 || (m===0 && (today.getDate() - birthDate.getDate())<0)){
      age--;
    }
    return age
  }
  componentDidMount(){
    getPostData(this.props.currentUser.currentPostId)
    .then(response=>{
      this.setState({currentPost:response})
    })
    .catch(err=>console.log(err))
  }
  logout = () =>{
    if(this.props.currentUser){
      logout()
      .then(()=>{
        this.props.updateUser(null)
        console.log('LOGGED OUT')
        this.props.history.push('/')
        })
      .catch(err=>console.log(err))
    }
  }
  render(){
    if(this.props.currentUser?.profileType==='candidate'){
      return(
        <div className='profile-page'>
        <BlueTop/>
        <RedBottom/>
         <div className='top-line flex-row'>
        <Link to='/swipeOffer/random'><img src='/images/icons/offer-yellow.png' alt='settings'/></Link>
          <h1 className='text-yellow'>My Profile</h1>
         <img onClick={()=>{this.logout()}} src='/images/icons/logout.png' alt='logout'/>
        </div>
        <header>
          <img src={this.props.currentUser.avatar} alt='avatar'/>
          <h1>{this.props.currentUser.name} {this.props.currentUser.birthday && `, ${this.getAge(this.props.currentUser.birthday)}`}</h1>
        </header>
        <main>
          <Link to='/personalProfile'>
          <div className='row border-blue'>
          <div className='image'>
            <img src='/images/ninja-profile.png' alt='ninja-profile'/>
          </div>
          <div className='title'>
           <p>My Profile</p>
           </div>
          </div>
          </Link>
  
          <Link to='/levelspage'>
          <div className='row border-yellow'>
          <div className='image'>
            <img src='/images/nunchaku.png' alt='my-level'/>
          </div>
          <div className='title'>
            <p>My Level</p>
          </div>
            </div>
          </Link>
  
          <Link to='/myapplications'>
          <div className='row border-orange'>
          <div className='image'>
            <img src='/images/paper-roll.png' alt='applications'/>
          </div>
          <div className='title'>
            <p>My Applications</p>
          </div>
            </div>
          </Link>
  
          <Link to='/myBadges'>
            <div className='row border-red'>
            <div className='image my-badges'>
              <img src='/images/my-badges.png' alt='badges'/>
            </div>
            <div className='title'>
              <p>My Badges</p>
            </div>
            </div>
          </Link>
        </main>
        </div>
      )
  } else {
      return (
        <div className='profile-page recruiter'>
          <BlueTop/>
          <RedBottom/>
           <div className='top-line flex-row'>
          <Link to='/swipeCandidate/random'><img src='/images/icons/people.png' alt='settings'/></Link>
          <h1 className='text-yellow'>My Profile</h1>
          <img onClick={()=>{this.logout()}}  src='/images/icons/logout.png' alt='logout'/>
        </div>
          <header>
            <img src={this.props.currentUser?.companyLogo || "/images/temple.png"} alt='avatar'/>
            <h1>{this.props.currentUser?.name}</h1>
          </header>
          <main>
            <Link to='/companyDetails'>
            <div className='row border-blue'>
              <div className='image'>
                <img src='/images/temple.png' alt='my-company'/>
              </div>
              <div className='title'>
              <p>My Company</p>
              </div>
            </div>
            </Link>
    
            <Link to='/myOffers'>
            <div className='row border-yellow'>
            <div className='image'>
              <img src='/images/my-offers.png' alt='my-offers'/>
            </div>
            <div className='title'>
              <p>My Offers</p>
            </div>
              </div>
            </Link>
    
            <Link to='/myDashboard'>
            <div className='row border-orange'>
            <div className='image'>
              <img src='/images/my-dashboard.png' alt='my-dashboard'/>
            </div>
                <div className='title'>
              <p>My Dashboard</p>
              </div>
              </div>
            </Link>
    
      
              <div className='row border-red' onClick={()=>this.props.history.push(`/posts/${this.state.currentPost._id}`)} >
                <div className='image'>
                <img src='/images/my-current-post.png' alt='current-post'/>
                </div>
                   <div className='title'>
                    <div className='flex-column'>
                      <p>My Current Post</p>
                      <span className='small-text'>{this.state.currentPost?.position}</span>
                    </div>
                </div>
              </div>
          </main>
        </div>
      )
    }  
  }
}
export default ProfilePage;