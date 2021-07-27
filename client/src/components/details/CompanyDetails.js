import React from 'react';

class CompanyDetails extends React.Component{
  goToEdit = () =>{
    this.props.history.push('/companyDetails/edit')
  }
  render(){
    return (
      <div className='company-details'>
        <div className='company-details-head'>
          <img src={this.props.currentUser.companyLogo} alt='company-logo'/>
          <h1>MY COMPANY</h1>
          </div>
          <div className='company-details-main'>
            <div>
              <p className='title'>Name: </p>
              <p>{this.props.currentUser.companyName}</p> 
            </div>
             <div>
              <p className='title'>Industry: </p>
              <p>{this.props.currentUser.industry}</p> 
            </div>
             <div>
              <p className='title'>Bio: </p>
              <p>{this.props.currentUser.bio}</p> 
            </div>
             <div>
              <p className='title'>Website: </p>
              <p>{this.props.currentUser.companyWebsite}</p> 
            </div>
             <div>
              <p className='title'>Scope: </p>
              <p>{this.props.currentUser.scope.city}, {this.props.currentUser.scope.country} </p> 
            </div>
            <div>
              <p className='title'>Fun Fact: </p>
              <p>{this.props.currentUserfunFact}</p> 
            </div>
        </div>
        <button className='btn red' onClick={this.goToEdit}>UPDATE MY INFO</button>
      </div>
    )
  }
}
export default CompanyDetails;
