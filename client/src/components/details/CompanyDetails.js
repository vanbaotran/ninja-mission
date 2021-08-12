import React from 'react';

class CompanyDetails extends React.Component{
  state = {
    currentUser : this.props.currentUser
  }
  goToEdit = () =>{
    this.props.history.push('/recruiterform')
  }
  render(){
    return (
      <div className='company-details'>
        <div className='flex-row'>
          <img className='icon' onClick={()=>this.props.history.goBack()} src='/images/icons/back-blue.png' alt=''/>
          <img className='icon' onClick={()=>this.props.history.push('/profilepage')} src='/images/icons/profile.png' alt=''/>
        </div>
        <div className='company-details-head'>
          <img src={this.state.currentUser.companyLogo? this.state.currentUser.companyLogo:'/images/temple.png' } alt='company-logo'/>
          <h1>MY COMPANY</h1>
          </div>
          <div className='company-details-main'>
           <div className='line'>
              <p className='title'>Name: </p>
              <p className='content'>{this.state.currentUser.name}</p> 
            </div>
             <div className='line'>
              <p className='title'>Email: </p>
              <p className='content'>{this.state.currentUser.email}</p> 
            </div>
            <div className='line'>
              <p className='title'>Company Name: </p>
              <p className='content'>{this.state.currentUser.companyName}</p> 
            </div>
             <div className='line'>
              <p className='title'>Industry: </p>
              <p className='content'>{this.state.currentUser.industry}</p> 
            </div>
             <div className='line'>
              <p className='title'>Bio: </p>
              <p className='content'>{this.state.currentUser.bio}</p> 
            </div>
             <div className='line'>
              <p className='title'>Website: </p>
              <p className='content'>{this.state.currentUser.companyWebsite}</p> 
            </div>
             {/* <div className='line'>
              <p className='title'>Scope: </p>
              <p className='content'>{this.state.currentUser.scope?.city || ""}, {this.state.currentUser.scope?.country || ""} </p> 
            </div> */}
            <div className='line'>
              <p className='title'>Fun Fact: </p>
              <p className='content'>{this.state.currentUser.funFact}</p> 
            </div>
        </div>
        <button className='btn red' onClick={this.goToEdit}>UPDATE MY INFO</button>
      </div>
    )
  }
}
export default CompanyDetails;
