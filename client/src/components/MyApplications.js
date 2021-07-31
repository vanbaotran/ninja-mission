import React from 'react';
import service from './service'
class MyApplications extends React.Component{
  state ={
    applicationList:[]
  }
  goToDetails = (postId) =>{
    this.props.history.push(`/posts/${postId}`)
  }

  componentDidMount(){
    if(this.props.currentUser){
      service.get(`/applications/byCandidateId`)
      .then(response=>{
        this.setState({
          applicationList:response.data.arrCandidating
        })
        console.log(this.state.applicationList)
      })
      .catch(err=>console.log(err))
    }  
  }
  render(){
    return (
      <div className="list"> 
      <h1>My Applications</h1>
      <div>
     {this.state.applicationList.map((offer)=>{
      return (this.props.currentPostId===offer._id && <div onClick={()=>this.goToDetails(offer._id)} style={{backgroundColor:'#F7E194'}} className="list element" key={offer._id}> 
         <h2>{offer.offerName}</h2>
        </div>) ||
        (<div onClick={()=>this.goToDetails(offer._id)} style={{}} className="list element" key={offer._id}>
         <h2>{offer.offerName}</h2>
        </div>)
    })}
    </div>
      </div>
    )
  }
}
export default MyApplications;