import React, { Component } from "react";
import service from "../service.js";
import { Link } from "react-router-dom";

class CandidateDetails extends Component {
  state = {
    from: false,
    apply: false,   
  };
  // componentDidUpdate(prevProps) {
  //   if(prevProps.currentCandidate !== this.props.currentCandidate) {
  //     this.setState({go:true});
  //   }
  // }
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
            this.props.updateCandidate(response.data)

            console.log(application);
            if (application.data.acceptedCandidateId.includes(this.props.match.params.id)) {
              apply = "ACCEPTED";
              this.props.history.push("/chatbox")
            } else if (application.data.refusedCandidateId.includes(this.props.match.params.id)) {
              apply = "REFUSED";
            } else {
              apply = false;
            }
            // this.props.updateCandidate(response.data)
            this.setState({
              from: this.props.from || false,
              apply: apply,
            });
          })
          .catch((err) => console.log(err));
      } else {
        service
          .get(`/users/${this.props.currentUser._id}`)
          .then((response) => {
            this.props.updateCandidate(response.data)
            this.setState({
              from: this.props.from || false,
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
        id: this.props.currentCandidate?._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  chooseCandidate = async () => {
    try {
      await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/accept`, {
        id: this.props.currentCandidate._id,
      });
      this.props.history.push(`/chatbox/${this.props.currentUser._id}_${this.props.currentCandidate._id}_${this.props.currentUser.currentApplicationId}`)
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
        <img src='/images/icons/back-blue.png' className='icon-back-blue' onClick={()=>this.props.history.goBack()} alt=''/>
          <div className="head-avatar-candidate flex-column">
            <img src={this.props.currentCandidate?.avatar} alt="avatar" />
            {/* <img src={this.state.avatar ? this.state.avatar : "/images/ninja.png"} alt="avatar" /> */}
            {this.props.currentUser && this.props.currentUser.profileType === "recruiter" && (
              <div className="block-btn-swipe-detail flex-row">
                {(this.state.apply && <h2 className="text-red">{this.state.apply}</h2>) || (
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
            <h2>{this.props.currentCandidate?.title}</h2>
          </div>
          <div className="head-name-candidate flex-row">
            <h1>
              {this.props.currentCandidate?.name} {age && `, ${age}`}
            </h1>
            <div className='circle'>
            <img
              src={`/images/${this.props.currentCandidate?.level?.toLowerCase()}.png`}
              alt="level ico"
            />
             {/* <img
              src={`/images/${
                this.props.currentCandidate?.level ? `${this.props.currentCandidate?.level.toLowerCase()}.png` : "ninja.png"
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
              <p>{this.props.currentCandidate?.codeLanguage ? this.props.currentCandidate?.codeLanguage.join(", ") : "none"}</p>
            </div>
          </div>
          <div className="who">
            <h4>BIO</h4>
            <p>{this.props.currentCandidate?.bio}</p>
          </div>
          {this.props.currentCandidate?.funFact && (
            <div className="who">
              <h4>FUN FACT</h4>
              <p>{this.props.currentCandidate?.funFact}</p>
            </div>
          )}
          <div className="links-candidate flex-row ">
            {this.props.currentCandidate?.usefulLinks && (
              <>
                <a href={this.props.currentCandidate?.usefulLinks.linkedin} rel="noreferrer" target="_blank">
                  <img src={"/images/icons/linkedin.png"} alt="ico linkedin" />
                </a>
                <a href={this.props.currentCandidate?.usefulLinks.github} rel="noreferrer" target="_blank">
                  <img src={"/images/icons/github.png"} alt="ico github" />
                </a>
              </>
            )}
            {this.props.currentCandidate?.cvUrl && (
              <a href={this.props.currentCandidate?.cvUrl} rel="noreferrer" target="_blank">
                <img src={"/images/icons/cv.png"} alt="ico cv" />
              </a>
            )}
          </div>
          <button className="btn red" onClick={this.openChat}> HAVE A CHAT!</button>
        </div>
        {(this.props.from === "swipe" && (
          <Link to={`/swipeCandidate/${this.props.match.params.id}`}>
            <button className="btn red">GO BACK</button>
          </Link>
        )) ||
          (this.props.from === "dashboard" && (
            
            <button onClick={() => this.props.history.goBack()} className="btn red">
              GO BACK
            </button>
            
          )) || (
            <Link to="/editCandidateform">
              <button className="btn red">Edit my info</button>
            </Link>
          )}
      </div>
    );
  }
}

export default CandidateDetails;
