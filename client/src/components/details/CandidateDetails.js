import React, { Component } from "react";
import service from "../service.js";
import { Link } from "react-router-dom";

class CandidateDetails extends Component {
  state = {
    from: false,
    apply: false,
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
            console.log(application);
            if (application.data.acceptedCandidateId.includes(this.props.match.params.id)) {
              apply = "ACCEPTED";
            } else if (application.data.refusedCandidateId.includes(this.props.match.params.id)) {
              apply = "REFUSED";
            } else {
              apply = false;
            }
            this.setState({
              ...response.data,
              from: this.props.from || false,
              apply: apply,
            });
          })
          .catch((err) => console.log(err));
      } else {
        service
          .get(`/users/${this.props.currentUser._id}`)
          .then((response) => {
            this.setState({
              ...response.data,
              from: this.props.fromswipe || false,
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
        id: this.state._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  chooseCandidate = async () => {
    try {
      await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/accept`, {
        id: this.state._id,
      });
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    let age = this.state.birthday ? this.getAge(this.state.birthday) : false;

    return (
      <div className="bg-ligth-grey details">
        <div className="head-candidate-details">
          <div className="head-avatar-candidate flex-column">
            <img src={this.state.avatar ? this.state.avatar : "/images/ninja.png"} alt="avatar" />
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
            <h4>{this.state.title}</h4>
          </div>
          <div className="head-name-candidate flex-row">
            <h1>
              {this.state.name} {age && `, ${age}`}
            </h1>
            <div className='circle'>
            <img
              src={`/images/${
                this.state.level ? `${this.state.level.toLowerCase()}.png` : "ninja.png"
              }`}
              alt="level ico"
            /></div>
          </div>
        </div>
        <div className="body-candidate-details">
          <div className="detail">
            <div>
              <h4>CODE LANGUAGES</h4>
              <p>{this.state.codeLanguage ? this.state.codeLanguage.join(", ") : "none"}</p>
            </div>
          </div>
          <div className="who">
            <h4>BIO</h4>
            <p>{this.state.bio}</p>
          </div>
          {this.state.funFact && (
            <div className="who">
              <h4>FUN FACT</h4>
              <p>{this.state.funFact}</p>
            </div>
          )}
          <div className="links-candidate flex-row ">
            {this.state.usefulLinks && (
              <>
                <a href={this.state.usefulLinks.linkedin} rel="noreferrer" target="_blank">
                  <img src={"/images/icons/linkedin.png"} alt="ico linkedin" />
                </a>
                <a href={this.state.usefulLinks.github} rel="noreferrer" target="_blank">
                  <img src={"/images/icons/github.png"} alt="ico github" />
                </a>
              </>
            )}
            {this.state.cvUrl && (
              <a href={this.state.cvUrl} rel="noreferrer" target="_blank">
                <img src={"/images/icons/cv.png"} alt="ico cv" />
              </a>
            )}
          </div>
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
