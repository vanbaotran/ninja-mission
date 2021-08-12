import React, { Component } from 'react';
import service, {editProfile} from '../service';


class OverlayAlert extends Component {
  state ={
    offerList:[]
  }
  updateCurrentPost = (id) =>{
    this.props.updateCurrentPost(id);
    editProfile({currentPostId:id})
    .then(response=>{
      this.props.updateUser(response);
      this.props.random()
    })
    .catch(err=>console.log(err))
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
  render() {
    console.log(this.state.offerList.length === 0)
    return (
      <div className='overlay'>
        <img src='/images/alerte.png' className='alert' alt=''/>
          <p>Make sure to choose a post before looking for a candidate</p>
           {this.state.offerList.length === 0 && <button onClick={()=>this.props.history.push('/postform/new')} className='btn red'>CREATE A JOB POST</button>}
          <div>
            {this.state.offerList.map((offer)=>{
              return (this.props.currentUser.currentPostId===offer._id && <div onClick={()=>this.updateCurrentPost(offer._id)} style={{backgroundColor:'#F7E194'}} className="list element" key={offer._id}> 
                <h2>{offer.position}</h2>
                </div>) ||
                (<div onClick={()=>this.updateCurrentPost(offer._id)} style={{}} className="list element" key={offer._id}>
                <h2>{offer.position}</h2>
                </div>)
            })}
            </div>
   
      </div>
    )
  }
}

export default OverlayAlert
