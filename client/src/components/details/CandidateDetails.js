import React, { Component } from "react";
import service from "../service.js";
import { Link } from "react-router-dom";

class CandidateDetails extends Component {
  state = {
    from: false,
    apply: false,   
    showingCandidate:{}
  };
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/login");
    } else {
      if (this.props.from) {
        service
          .get(`/users/${this.props.match.params.id}`)
          .then(async (response) => {
            let apply;
            let application = await service.get(
              `applications/${this.props.currentUser.currentApplicationId}`
            );
            console.log('ALOOO')
            if (application.data.acceptedCandidateId.includes(this.props.match.params.id)) {
              apply = "ACCEPTED";
              // this.props.history.push(`/chatbox/${this.props.currentUser._id}_${this.props.match.params.id}_${this.props.currentUser.currentApplicationId}`)
            } else if (application.data.refusedCandidateId.includes(this.props.match.params.id)) {
              apply = "REFUSED";
            } else {
              apply = false;
            }
            // this.props.updateCandidate(response.data)
            this.setState({
              from: this.props.from || false,
              apply: apply,
              showingCandidate:response.data
            });
          })
          .catch((err) => console.log(err));
      } else {
        service
          .get(`/users/${this.props.currentUser._id}`)
          .then((response) => {
            this.setState({
              from: this.props.from || false,
              showingCandidate: response.data
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }
   getAge = (dateString) =>{
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m<0 || (m===0 && (today.getDate() - birthDate.getDate())<0)){
      age--;
    }
    return age
  }
  swipeCandidate = async () => {
    try {
      await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/refuse`, {
        id: this.props.match.params.id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  chooseCandidate = async () => {
    try {
      await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/accept`, {
        id: this.props.match.params.id,
      });
      this.props.history.push(`/chatbox/${this.props.currentUser._id}_${this.props.currentUser._id}_${this.props.currentUser.currentApplicationId}`)
    } catch (error) {
      console.log(error);
    }
  };
  openChat = () => {

  }
  render() {
    let age = this.state.birthday ? this.getAge(this.state.birthday) : false;

    return (
      <div className="bg-ligth-grey details">
        <div className="head-candidate-details">
        <div className='candidate-details-top-line flex-row'>
          <img src='/images/icons/back-blue.png' className='icon-back-blue' onClick={()=>this.props.history.goBack()} alt=''/>
          {/* <img src='/images/ninja-logo.png' className='' onClick={()=>this.props.history.push('/swipeCandidate/random')} alt=''/> */}
          <img src='/images/icons/profile.png' className='profile-icon' onClick={()=>this.props.history.push('profilepage')} alt=''/>
        </div>
          <div className="head-avatar-candidate flex-column">
            <img src={this.state.showingCandidate?.avatar} alt="avatar" />
            {/* <img src={this.state.avatar ? this.state.avatar : "/images/ninja.png"} alt="avatar" /> */}
            {this.state.showingCandidate && this.props.currentUser.profileType === "recruiter" && (
              <div className="block-btn-swipe-detail flex-row">
                {(this.state.apply && <h2 className="text-red" onClick={this.chooseCandidate}>{this.state.apply}</h2> 
                  ) || (
                  <>
                    <img
                      className="btn-swipe"
                      src="/images/icons/cancel.png"
                      alt="cancel ico"
                      onClick={this.swipeCandidate}
                    />
                    <img
                      className="btn-swipe"
                      src="/images/icons/heart.png"
                      alt="heart ico"
                      onClick={this.chooseCandidate}
                    />
                  </>
                )}
              </div>
            )}
            <h2>{this.state.showingCandidate?.title}</h2>
          </div>
          <div className="head-name-candidate flex-row">
            <h1>
              {this.state.showingCandidate?.name} {age && `, ${age}`}
            </h1>
            <div className='circle'>
            <img
              src={`/images/${this.state.showingCandidate?.level?.toLowerCase()}.png`}
              alt="level ico"
            />
             {/* <img
              src={`/images/${
                this.state.showingCandidate?.level ? `${this.state.showingCandidate?.level.toLowerCase()}.png` : "ninja.png"
              }`}
              alt="level ico"
            /> */}
            </div>
          </div>
        </div>
        <div className="body-candidate-details">
          <div className="detail">
            <div>
              <h4>CODE LANGUAGES</h4>
              <p>{this.state.showingCandidate?.codeLanguage ? this.state.showingCandidate?.codeLanguage.join(", ") : "none"}</p>
            </div>
          </div>
          <div className="who">
            <h4>BIO</h4>
            <p>{this.state.showingCandidate?.bio}</p>
          </div>
          {this.state.showingCandidate?.funFact && (
            <div className="who">
              <h4>FUN FACT</h4>
              <p>{this.state.showingCandidate?.funFact}</p>
            </div>
          )}
          <div className="links-candidate flex-row ">
            {this.state.showingCandidate?.usefulLinks && (
              <>
                {this.state.showingCandidate.usefulLinks.linkedin && 
                  <a href={this.state.showingCandidate?.usefulLinks.linkedin} rel="noreferrer" target="_blank">
                  <img src={"/images/icons/linkedin.png"} alt="ico linkedin" />
                </a>}
                {this.state.showingCandidate.usefulLinks.github &&
                  <a href={this.state.showingCandidate?.usefulLinks.github} rel="noreferrer" target="_blank">
                    <img src={"/images/icons/github.png"} alt="ico github" />
                  </a>
                }
           {this.state.showingCandidate.cvUrl === "noCv" || (
              <a href={this.state.showingCandidate?.cvUrl} rel="noreferrer" target="_blank">
                <img src={"/images/icons/cv.png"} alt="ico cv" />
              </a>
            )} 
              </>
            )}
          </div>
          {/* <button className="btn red" onClick={this.openChat}> HAVE A CHAT!</button> */}
        </div>
        { (
        
           this.props.from === "dashboard" && this.state.apply === "ACCEPTED" && <button onClick={()=>this.chooseCandidate} className="btn blue">HAVE A CHAT</button>
        
          ) || 
          (this.props.from === "swipe" && (
          <Link to={`/swipeCandidate/${this.props.match.params.id}`}>
            <button className="btn red">GO BACK</button>
          </Link>
        )) 
        ||
          (this.props.from === "dashboard" && (
            
            <button onClick={() => this.props.history.goBack()} className="btn red">
              GO BACK
            </button>
            
          )) || (
            <Link to="/editCandidateform">
              <button className="btn red">Edit my info</button>
            </Link>
          ) }
      </div>
    );
  }
}

export default CandidateDetails;
