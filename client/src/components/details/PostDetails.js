import React, { Component } from "react";
import service from "../service";

class PostDetails extends Component {
  state = {
    offerName: "",
    companyLogo: "", // voir si default ou required
    companyBio: "",
    companyName: "",
    description: "",
    position: "",
    contract: "",
    experienceLevel: "",
    codeLanguage: [], // voir si enum et ou vérification bonne donnée
    //location: { city: { type: [String] }, country: { type: [String] } },
    remote: false,
    funFact: "",
    website: "",
  };
  componentDidMount() {
    service.get(`/posts/${this.props.match.params.id}`).then((response) => {
      let {
        offerName,
        companyLogo,
        companyBio,
        companyName,
        description,
        position,
        contract,
        experienceLevel,
        codeLanguage,
        remote,
        funFact,
        website,
      } = response.data;
      this.setState({
        offerName,
        companyLogo,
        companyBio,
        companyName,
        description,
        position,
        contract,
        experienceLevel,
        codeLanguage,
        remote,
        funFact,
        website,
      });
      console.log(this.state)
    });
  }
  render() {
    return (
      <div>
        <div className="head-post-detail">
        <img src={this.state.companyLogo ? this.state.companyLogo : "/images/temple.png"} alt="logo comp" />
        <h1>{this.state.offerName}</h1>
        <button>CHOOSE TO BE CURRENT POST</button>
        </div>
        <div className="body-post-details">
          <div className="detail-level">
            <div>
            <h4>Sensority Level</h4>
            <p>{this.state.experienceLevel}</p>
            </div>
            <img src={`/images/${this.state.experienceLevel.toLowerCase()}.png`} alt="logo level"/>
        </div>
          <div>
          <h4>Employement Type</h4>
            <p>{this.state.contract}</p>
        </div>
          <div>
          <h4>Job Function</h4>
            <p>{this.state.position}</p>
          </div>
          {
            this.state.codeLanguage.length > 0 &&
          <div>
            <h4>Code Languages</h4>
            <p>{this.state.codeLanguage.join(", ")}</p>
            </div>
          }
          <div className="who-is">
            <h2>WHO ARE WE</h2>
            <p>{this.state.companyBio}</p>
          </div>
          <div className="who-want">
            <h2>WHO DO WE NEED</h2>
            <p>{this.state.description}</p>
          </div>
          {this.state.funFact && 
          <div className="fun-fact">
            <h2>FUN FACT</h2>
            <p>{this.state.funFact}</p>
          </div>
          }
          <div className="link-company">
            
            <a href={this.state.website} rel="noreferrer" target="_blank">{this.state.website}</a>
          </div>


        </div>

      </div>);
  }
}

export default PostDetails;
