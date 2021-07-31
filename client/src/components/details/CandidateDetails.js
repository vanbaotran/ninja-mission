import React, { Component } from "react";
import service from "../service.js";
import { Link } from "react-router-dom";

class CandidateDetails extends Component {
  state = {
    from: false,
  };
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.history.push("/login");
    } else {
      if (this.props.from) {
        service
          .get(`/users/${this.props.match.params.id}`)
          .then((response) => {
            console.log(response);
            this.setState({
              ...response.data,
              from: this.props.from || false,
            });
          })
          .catch((err) => console.log(err));
      } else {
        service
          .get(`/users/${this.props.currentUser._id}`)
          .then((response) => {
            console.log(response);
            this.setState({
              ...response.data,
              from: this.props.fromswipe || false,
            });
          })
          .catch((err) => console.log(err));
      }
    }
  }
  getAge = (dateString) => {
    let today = new Date();
    let birthDate = new Date(dateString);
    let age = today.getFullYear() - birthDate.getFullYear();
    let m = today.getMonth() - birthDate.getMonth();
    if (m > 0 && today.getDate() - birthDate.getDate()) {
      age--;
    } else {
      age = "";
    }
    return age;
  };
  render() {
    let age = this.props.currentUser
      ? this.getAge(this.props.currentUser.birthday.toString())
      : false;

    return (
      <div className="bg-ligth-grey details">
        <div className="head-candidate-details">
          <div className="head-avatar-candidate flex-column">
            <img src={this.state.avatar ? this.state.avatar : "/images/ninja.png"} alt="avatar" />
            <h4>{this.state.title}</h4>
          </div>
          <div className="head-name-candidate flex-row">
            <h1>
              {this.state.name} {age && `, ${age}`}
            </h1>
            <img
              src={`/images/${
                this.state.level ? `${this.state.level.toLowerCase()}.png` : "ninja.png"
              }`}
              alt="level ico"
            />
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
              {this.state.cvUrl && 
              <a href={this.state.cvUrl} rel="noreferrer" target="_blank">
                <img src={"/images/icons/cv.png"} alt="ico cv" />
              </a>
              }
            </div>
        </div>
        {(this.props.from === "swipe" && (
          <Link to={`/swipeCandidate/${this.props.match.params.id}`}>
            <button className="btn red">GO BACK</button>
          </Link>
        )) ||
          (this.props.from === "dashboard" && (
            <Link to={`/dashboard`}>
              <button className="btn red">GO BACK</button>
            </Link>
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
