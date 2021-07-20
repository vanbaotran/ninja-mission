import React from 'react';
import {Link} from 'react-router-dom';
import {getUserData} from './service'
class ProfilePage extends React.Component {
  state = {
    currentUser: this.props.currentUser ? this.props.currentUser : "",
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
  componentDidUpdate(prevProps){
    if(prevProps.currentUser !== this.props.currentUser){
      getUserData(this.props.currentUser._id)
      .then(response=>{
        this.setState(response)
        console.log(response)
      })
      .catch(err=>console.log(err))
    }
  }
  // componentDidMount(){
  //     // if(prevProps.currentUser !== this.props.currentUser){
  //       getUserData(this.props.currentUser._id)
  //       .then(response=>{
  //         this.setState(response)
  //         console.log(response)
  //       })
  //       .catch(err=>console.log(err))
  //     // }
  //   }
  render(){
    if(this.state.currentUser.profileType==='candidate'){
      return(
        <div className="profile candidate">
        <nav>
          <Link to='/settings'><img src='/images/icons/settings.png' alt='settings'/></Link>
          <Link to='/offers'><img src='/images/icons/offer.png' alt='settings'/></Link>
        </nav>
        <header>
          <img src={this.state.currentUser.avatar} alt='avatar'/>
          <h1>{this.state.currentUser.name}, {this.getAge(this.state.currentUser.birthday)}</h1>
        </header>
        <main>
          <Link to='/candidateDetails'>
          <div className='row'>
            <img src='/images/ninja-profile.png' alt='ninja-profile'/>
            <h3>My Profile</h3>
          </div>
          </Link>
  
          <Link to='/myLevels'>
          <div className='row'>
            <img src='/images/nunchaku.png' alt='my-level'/>
            <h3>My Level</h3>
            </div>
          </Link>
  
          <Link to='/'>
          <div className='row'>
            <img src='/images/paper-roll.png' alt='applications'/>
            <h3>My Applications</h3>
            </div>
          </Link>
  
          <Link to='/myBadges'>
            <div className='row'>
              <img src='/images/my-badges.png' alt='badges'/>
              <h3>My Badges</h3>
            </div>
          </Link>
        </main>
        </div>
      )
  } else {
      return (
        <div>
          <nav>
            <Link to='/settings'><img src='/images/icons/settings.png' alt='settings'/></Link>
            <Link to='/offers'><img src='/images/icons/offer.png' alt='settings'/></Link>
          </nav>
          <header>
            <img src={this.state.currentUser.companyLogo} alt='avatar'/>
            <h1>{this.state.currentUser.name}</h1>
          </header>
          <main>
            <Link to='/candidateDetails'>
            <div className='row'>
              <img src='/images/temple.png' alt='my-company'/>
              <h3>My Company</h3>
            </div>
            </Link>
    
            <Link to='/myLevels'>
            <div className='row'>
              <img src='/images/my-offers.png' alt='my-offers'/>
              <h3>My Offers</h3>
              </div>
            </Link>
    
            <Link to='/'>
            <div className='row'>
              <img src='/images/my-dashboard.png' alt='my-dashboard'/>
              <h3>My Dashboard</h3>
              </div>
            </Link>
    
            <Link to='/myBadges'>
              <div className='row'>
                <img src='/images/my-current-post.png' alt='current-post'/>
                <h3>My Current Post</h3>
                <p>{this.props.currentUser?.currentApplicationId?.jobPostId?.offerName|| "" }</p>
              </div>
            </Link>
          </main>
        </div>
      )
    }  
  }
}
export default ProfilePage;