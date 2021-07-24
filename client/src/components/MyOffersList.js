import React from 'react';
import service from './service'
class MyOffersList extends React.Component{
  state ={
    offerList:[]
  }
  goToDetails = (postId) =>{
    this.props.history.push(`/posts/${postId}`)
  }
  chosenPost = (offerId) =>{
    if(this.props.currentPostId===offerId){
      return {backgroundColor:'#F7E194'}
    }
  }
  componentDidMount(){
    if(this.props.currentUser){
      service.get(`/posts/recruiter/${this.props.currentUser._id}`)
      .then(response=>{
        console.log(response.data)
        this.setState({
          offerList:response.data
        })
        console.log(this.state.offerList)
      })
      .catch(err=>console.log(err))
    }  
  }
  render(){
    return (
      <div className="list"> 
      <h1>MY OFFERS </h1>
      <div>
     {this.state.offerList.map((offer)=>{
      return (this.props.currentPostId===offer._id && <div onClick={()=>this.goToDetails(offer._id)} style={{backgroundColor:'#F7E194'}} className="list-element" key={offer._id}> 
         <h2>{offer.offerName}</h2>
        </div>) ||
        (<div onClick={()=>this.goToDetails(offer._id)} style={{}} className="list-element" key={offer._id}>
         <h2>{offer.offerName}</h2>
        </div>)
    })}
    </div>
    <button onClick={()=>this.props.history.push('/postform/new')} className='btn red'>POST A NEW OFFER</button>
      </div>
    )
  }
}
export default MyOffersList;