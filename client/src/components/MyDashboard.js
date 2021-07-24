import React from 'react';
import service from './service'
class MyDashBoard extends React.Component{
  state ={
    offerList:[]
  }
  goToDetails = (postId) =>{
    this.props.history.push(`/posts/${postId}`)
  }
  getDate=(dateString)=>{
    let today = new Date();
    let theDay = new Date(dateString);
    let difference = today.getTime() - theDay.getTime();
    let differentInDays = Math.floor(difference/(1000*60*60*24))
    return differentInDays;
  }
  componentDidMount(){
    if(this.props.currentUser){
      service.get(`/posts/recruiter/${this.props.currentUser._id}`)
      .then(response=>{
        this.setState({
          offerList:response.data
        })
        console.log(new Date(response.data[0].updatedAt))
      })
      .catch(err=>console.log(err))
    }  
  }
  render(){
    return (
      <div> 
      <h1>MY DASHBOARD </h1>
      <div className="dashboard">
     {this.state.offerList.map((offer)=>{
      return (this.props.currentPostId===offer._id && <div onClick={()=>this.goToDetails(offer._id)} style={{backgroundColor:'#F7E194'}} className="element" key={offer._id}> 
         <h2>{offer.offerName}</h2>
         <p>{(this.getDate(offer.updatedAt)>1 && "days ago")|| "1 day ago"}</p>
        </div>) ||
        (<div onClick={()=>this.goToDetails(offer._id)} style={{}} className="element" key={offer._id}>
         <h2>{offer.offerName}</h2>
         <p>{(this.getDate(offer.updatedAt)>1 && "days ago")|| "1 day ago"}</p>
        </div>)
    })}
    </div>
      </div>
    )
  }
}
export default MyDashBoard;