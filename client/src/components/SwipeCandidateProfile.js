import React from "react";
import service from "./service";
import "../css/Swipe.css";
import OverlayExperience from "./overlays/OverlayExperience";
class SwipeCandidateProfile extends React.Component {
  state = {
    optionsIsOpen: false,
    currentOptions: [],
    candidate: false,
    errorMessage: "",
    remember: [],
  };
  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };
  // searchRandom = () => {
  //   service
  //     .get("/users/random")
  //     .then((response) => {
  //       console.log(response.data)
  //       this.setState({
  //         candidate: response.data,
  //       });
  //     })
  //     .catch((err) => console.log(err));
  // };
  searchRandom = (params = false) => {
    let url = "/users/random";
    if (params) {
      url = `${url}?filterLevel=${params.join("_")}`;
    }
    service
      .get(url)
      .then((resp) => {
        console.log(resp);
        if (resp.status === 204) {
          this.setState({
            candidate: false,
            optionsIsOpen: false,
            errorMessage: resp.statusText,
          });
        } else {
          this.setState({
            candidate: resp.data,
            optionsIsOpen: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ errorMessage: err })
      });
  };
  setCurrentoptions = (arrOptionsSelected) => {
    this.setState({
      currentOptions: arrOptionsSelected,
    });
  };
  detailPost = () => {
    this.props.history.push(`/users/${this.state.candidate._id}/fromswipe`);
  }
  // swipeCandidate = () => {
  //   service.patch(`/applications/${}`)
  // }
  componentDidMount = () => {
    if(this.props.match.params.id){
      service.get(`/users/${this.props.match.params.id}`)
      .then(response=>{
        this.setState({
          candidate:response.data
        })
      })
      .catch(err=>console.log(err))
    } else {
    this.searchRandom();
    }
  };
  render() {
    return (
      <div className="swipeCandidate">
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
            {(!this.state.candidate && 
             <h1>{(this.state.errorMessage && <div className="text-red">{this.state.errorMessage}</div> )|| "Loading..."}</h1>) || (
              <div className="block-to-swipe" onClick={this.detailPost}>
                <img
                  className="avatar"
                  src={this.state.candidate.avatar}
                  alt="avatar"
                />
                <div className="block-footer">
                  <h1>{this.state.candidate.title}</h1>
                  <div className="image-level">
                    <img
                      src={
                        this.state.candidate
                          ? `/images/${this.state.candidate.level.toLowerCase()}.png`
                          : `/images/ninja.png`
                      }
                      alt="level-icon"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
           <div className="block-btn-swipe">
          <img
            className="btn-swipe"
            src="/images/icons/reverse.png"
            alt="reverse ico"
            onClick={this.comeBack}
          />
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
            onClick={this.valideCandidate}
          />
          <img className="btn-swipe" src="/images/icons/save.png" alt="save ico" />
        </div>
        </div>
        {this.state.optionsIsOpen && (
          <OverlayExperience
            filter={this.searchRandom}
            rememberOptions={this.setCurrentoptions}
            currentOptions={this.state.currentOptions}
          />
        )}
      </div>
    );
  }
}
export default SwipeCandidateProfile;
