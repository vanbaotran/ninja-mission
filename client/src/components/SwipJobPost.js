import React, { Component } from "react";
import OverlayWeapon from "./overlays/OverlayWeapon";
import "../css/SwipJobPost.css";
import service from "./service";
import InfoIco from "./swip/InfoIco";
class SwipJobPost extends Component {
  state = {
    optionsIsOpen: false,
    currentOptions: ["Internship", "Freelance", "Permanent", "Temporary"],
    offer: false,
  };

  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };
  componentDidMount() {
    service.get("/posts/random").then((resp) => {
      this.setState({
        offer: resp.data,
      });
      console.log(this.state);
    });
  }
  render() {
    let compagnyLogo = this.state.offer?.companyLogo || this.state.offer?.recruiterId?.companyLogo || "/images/temple.png";
    
    return (
      <div className="swip">
        <div className="header-swip">
          <img className="ico-swip ico-profile" src="/images/icons/profile.png" alt="ico" />
          <img
            className="ico-swip ico-filter"
            src="/images/icons/filter.png"
            alt="ico"
            onClick={this.openFilter}
          />
          <img className="logo-header-swip" src="/images/ninja-logo.png" alt="ico" />
          <img className="ico-swip ico-chat" src="/images/icons/chat.png" alt="ico" />
        </div>
        <div className="body-swip">
          {(!this.state.offer && <h1>Loading...</h1>) || (
            <div>
              <img src={compagnyLogo} alt="logo" />
              <h1>{this.state.position}</h1>
              <div className="block-infoico">
                <InfoIco type={this.state.offer.experienceLevel} />
                <InfoIco type={this.state.offer.contract}/>
              </div>
            </div>
          )}
          {this.state.optionsIsOpen && <OverlayWeapon />}
        </div>
      </div>
    );
  }
}

export default SwipJobPost;
