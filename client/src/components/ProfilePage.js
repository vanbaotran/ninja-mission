import React from 'react';
import {Link} from 'react-router-dom';
import { getPostData} from './service';
import BlueTop from "./backgrounds/BlueTop";
class ProfilePage extends React.Component {
  state = {
    currentPost:{}
  }
  getAge = (dateString) =>{
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m<0 || (m===0 && today.getDate() - birthDate.getDate())){
      age--;
    }
    return age
  }
  componentDidMount(){
    getPostData(this.props.currentUser.currentPostId)
    .then(response=>{
      this.setState({currentPost:response})
      console.log('CURRENT POST',this.state.currentPost, 'RESPONSE',response)
    })
    .catch(err=>console.log(err))
  }

  render(){
    if(this.props.currentUser.profileType==='candidate'){
      return(
        <div className='profile-page'>
        <BlueTop/>
        <nav>
          <Link to='/settings'><img src='/images/icons/settings.png' alt='settings'/></Link>
          <Link to='/offers'><img src='/images/icons/offer.png' alt='settings'/></Link>
          <h1 className='text-yellow'>My Profile</h1>
        </nav>
        <header>
          <img src={this.props.currentUser.avatar} alt='avatar'/>
          <h1>{this.props.currentUser.name} {this.props.currentUser.birthday && ','} {this.getAge(this.props.currentUser.birthday)}</h1>
        </header>
        <main>
          <Link to='/personalProfile'>
          <div className='row border-blue'>
            <img src='/images/ninja-profile.png' alt='ninja-profile'/>
            <h3>My Profile</h3>
          </div>
          </Link>
  
          <Link to='/levelspage'>
          <div className='row border-yellow'>
            <img src='/images/nunchaku.png' alt='my-level'/>
            <h3>My Level</h3>
            </div>
          </Link>
  
          <Link to='/'>
          <div className='row border-orange'>
            <img src='/images/paper-roll.png' alt='applications'/>
            <h3>My Applications</h3>
            </div>
          </Link>
  
          <Link to='/myBadges'>
            <div className='row border-red'>
              <img src='/images/my-badges.png' alt='badges'/>
              <h3>My Badges</h3>
            </div>
          </Link>
        </main>
        </div>
      )
  } else {
      return (
        <div className='profile-page'>
           <BlueTop/>
          <nav>
            <Link to='/settings'><img src='/images/icons/settings.png' alt='settings'/></Link>
            <Link to='/offers'><img src='/images/icons/offer.png' alt='settings'/></Link>
          </nav>
          <header>
            <img src={this.props.currentUser.companyLogo} alt='avatar'/>
            <h1>{this.props.currentUser.name}</h1>
          </header>
          <main>
            <Link to='/companyDetails'>
            <div className='row border-blue'>
              <img src='/images/temple.png' alt='my-company'/>
              <h3>My Company</h3>
            </div>
            </Link>
    
            <Link to='/myOffers'>
            <div className='row border-yellow'>
              <img src='/images/my-offers.png' alt='my-offers'/>
              <h3>My Offers</h3>
              </div>
            </Link>
    
            <Link to='/myDashboard'>
            <div className='row border-orange'>
              <img src='/images/my-dashboard.png' alt='my-dashboard'/>
              <h3>My Dashboard</h3>
              </div>
            </Link>
    
            <Link to='/myCurrentPost'>
              <div className='row border-red' onClick={()=>this.props.history.push(`/posts/${this.state.currentPost._id}`)} >
                <img src='/images/my-current-post.png' alt='current-post'/>
                <div className='flex-column'>
                  <h3>My Current Post</h3>
                  <p>{this.state.currentPost.offerName}</p>
                </div>
              </div>
            </Link>
          </main>
        </div>
      )
    }  
  }
}
export default ProfilePage;