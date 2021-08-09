import React, { Component } from "react";
import { dataPostToStatePost, editProfile, deletePost } from "../service";
import OverlayUpdated from '../overlays/OverlayUpdated'

class PostDetails extends Component {
  state = {
    from: false,
    overlayisOpen:false
  };
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/");
    } else {
      dataPostToStatePost(this.props.match.params.id)
        .then(data => {
      
          this.setState({
            ...data,
            from: this.props.from || false
          });
          console.log(this.state)
      }).catch(err => console.log(err))
      
    }
  }
  handleEdit = (e) => {
    this.props.history.push(`/postForm/${this.props.match.params.id}`);
  };
  //update state.currentPostId if chosen
  updateCurrentPost = () =>{
    this.props.updateCurrentPost(this.props.match.params.id);
    editProfile({currentPostId:this.props.match.params.id})
    .then(response=>{
      console.log('CHANGING POST ID', response)
      this.props.updateUser(response);
      this.setState({
        overlayisOpen: true
      })
      setTimeout(() => {
        this.setState({
        overlayisOpen: false
      })
      this.props.history.push('/myoffers')
      }, 1500);
    })
    .catch(err=>console.log(err))
  }
  back = () => {
    if (this.props.from ==='swipe') {
      this.props.history.push(`/swipeOffer/${this.props.match.params.id}`);
    } else {
      this.props.history.goBack()
    }
  }
  deleteThisPost = () => {
    this.props.updateCurrentPost('');
    deletePost(this.props.match.params.id)
    .then(response =>{
        editProfile({currentPostId:null,currentApplicationId:null})
        .then(userFromDB=>{
          console.log('DELETE',userFromDB)
          this.props.updateUser(userFromDB)
          this.props.history.push('/myoffers')
        })
        .catch(err=>console.log(err))
      })
    .catch(err=>console.log(err))
  }
  render() {
    return (
      <div className=" details flex--column">
        {this.state.overlayisOpen && <OverlayUpdated />}
        <div className="head-post-details flex-column bg-ligth-grey">
          <img
            src={this.state.companyLogo ? this.state.companyLogo : "/images/temple.png"}
            alt="logo comp"
          />
          <h1>{this.state.position}</h1>
          {(this.props.currentUser.profileType==='recruiter' && this.props.currentUser.currentPostId !== this.props.match.params.id)&& (this.props.from || <button className="btn blue" onClick={this.updateCurrentPost}>CHOOSE TO BE CURRENT POST</button>)}
        </div>
        <div className="body-post-details flex-column">
          <div className="detail flex-row">
            <div>
              <h4>Sensority Level</h4>
              <p>{this.state.experienceLevel}</p>
            </div>
            <img src={`/images/${this.state.experienceLevel?.toLowerCase()}.png`} alt="logo level" />
          </div>
          <div className="detail">
            <h4>Employement Type</h4>
            <p>{this.state.contract}</p>
          </div>
          <div className="detail">
            <h4>Job Function</h4>
            <p>{this.state.position}</p>
          </div>
          {this.state.codeLanguage?.length > 0 && (
            <div className="detail">
              <h4>Code Languages</h4>
              <p>{this.state.codeLanguage.join(", ")}</p>
            </div>
          )}
          <div className="who">
            <h2>WHO ARE WE</h2>
            <p>{this.state?.companyBio}</p>
          </div>
          <div className="who">
            <h2>WHO DO WE NEED</h2>
            <p>{this.state?.description}</p>
          </div>
          {this.state.funFact && (
            <div className="who">
              <h2>FUN FACT</h2>
              <p>{this.state?.funFact}</p>
            </div>
          )}
          <div className="who">
            <h2>WEBSITE</h2>
            <a href={this.state?.website} rel="noreferrer" target="_blank">
              {this.state?.website}
            </a>
          </div>
          {(this.props.currentUser?.profileType==='recruiter' && ((this.props.from && <button className="btn blue" onClick={this.back}>GO BACK</button>) || <button className="btn blue" onClick={this.handleEdit}>EDIT THIS POST</button>) )||  <button className="btn red" onClick={this.back}>GO BACK</button>}
          {this.props.currentUser?.profileType==='recruiter'  && <button className="btn red" onClick={this.deleteThisPost}>DELETE THIS POST</button> }
        </div>
      </div>
    );
  }
}

export default PostDetails;
