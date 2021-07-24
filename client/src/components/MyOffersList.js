import React from 'react';
import service from './service'
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
     {this.state.offerList.map((offer)=>{
      return <div onClick={()=>this.goToDetails(offer._id)} className="list-element" key={offer._id}>
      <h2>{offer.offerName}</h2>
      </div>
    })}
      </div>
    )
  }
}
export default MyOffersList;