import React from 'react';
import service from './service';
import BlueTop from './backgrounds/BlueTop';
import BlueBottom from './backgrounds/BlueBottom'
class MyOffersList extends React.Component{
  state ={
    offerList:[]
  }
  goToDetails = (postId) =>{
    this.props.history.push(`/posts/${postId}`)
  }

  componentDidMount(){
    if(this.props.currentUser){
      service.get(`/posts/recruiter/${this.props.currentUser._id}`)
      .then(response=>{
        this.setState({
          offerList:response.data
        })
      })
      .catch(err=>console.log(err))
    }  
  }
  render(){
    return (
      <div className='wrapper'>
      <div className="top-line flex-row"> 
        <img src='/images/icons/back.png' onClick={()=>{this.props.history.goBack()}}alt=''/>
        <h1 className='text-yellow'>My Offers </h1>
        <img src='' alt=''/>
      </div>
      <BlueTop/>
      <BlueBottom />
      <div className="list">
     {this.state.offerList.map((offer)=>{
      return (this.props.currentUser.currentPostId===offer._id && <div onClick={()=>this.goToDetails(offer._id)} style={{backgroundColor:'#F7E194'}} className="list element" key={offer._id}> 
         <h2>{offer.position}</h2>
        </div>) ||
        (<div onClick={()=>this.goToDetails(offer._id)} style={{}} className="list element" key={offer._id}>
         <h2>{offer.position}</h2>
        </div>)
    })}
    </div>
    <button onClick={()=>this.props.history.push('/postform/new')} className='btn red'>POST A NEW OFFER</button>
      </div>
    )
  }
}
export default MyOffersList;