import React from "react";
import service from "./service";
import '../css/SwipeCandidateProfile.css'
class SwipeCandidateProfile extends React.Component {
  state = {
    optionsIsOpen: false,
    // currentOptions: ["Internship", "Freelance", "Permanent", "Temporary"],
    candidate: false,
    errorMessage: "",
  };
  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };
  searchRandom = () => {
    service
      .get("/users/random")
      .then((response) => {
        console.log(response.data)
        this.setState({
          candidate: response.data,
        });
      })
      .catch((err) => console.log(err));
  };
  componentDidMount = () => {
    this.searchRandom();
  };
  render() {
    return (
      <div>
        <div className="swipe">
          <div className="header-swipe">
            <img
              className="ico-swipe ico-profile"
              src="/images/icons/profile.png"
              alt="ico"
            />
            <img
              className="ico-swipe ico-filter"
              src="/images/icons/filter.png"
              alt="ico"
              onClick={this.openFilter}
            />
            <img
              className="logo-header-swipe"
              src="/images/ninja-logo.png"
              alt="ico"
            />
            <img
              className="ico-swipe ico-chat"
              src="/images/icons/chat.png"
              alt="ico"
            />
          </div>
          <div className="body-swipe">
            {(!this.state.candidate && <h1>Loading...</h1>) || (
              <div className="block-to-swipe" onClick={this.detailPost}>
                <img
                  className="avatar"
                  src={this.state.candidate.avatar}
                  alt="avatar"
                />
                <div className="block-footer">
                  <h1>{this.state.candidate.title}</h1>
                  <img
                    src={this.state.candidate ? `/images/${this.state.candidate.level.toLowerCase()}.png`:`/images/ninja.png`}
                    alt="level-icon"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}
export default SwipeCandidateProfile;
