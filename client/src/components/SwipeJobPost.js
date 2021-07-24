import React, { Component } from "react";
import OverlayWeapon from "./overlays/OverlayWeapon";
import '../css/Swipe.css'
import service from "./service";
import InfoIco from "./swipe/InfoIco";
// import useSwipeable from 'react-swipeable';

class SwipeJobPost extends Component {
  state = {
    optionsIsOpen: false,
    currentOptions: ["Internship", "Freelance", "Permanent", "Temporary"],
    offer: false,
    errorMessage: "",
  };

  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };
  setCurrentoptions = (arrOptionsSelected) => {
    this.setState({
      currentOptions: arrOptionsSelected
    })
  }
  searchRandom = (params = false) => {
    let url = "/posts/random";
    if (params) {
      url = `${url}?filterContract=${params.join("_")}`;
    }
    service.get(url).then((resp) => {
      console.log(resp)
      if (resp.status === 204) {
        this.setState({
          offer: false,
          optionsIsOpen: false,
          errorMessage: resp.statusText
        });
      } else {
        this.setState({
          offer: resp.data,
          optionsIsOpen: false
        });
      }
    })
      .catch(err => {
        console.log(err)
        // this.setState({ errorMessage: err })
      });
  }
  componentDidMount() {
    // if return from detail find post by id else random post
    if(this.props.match.params.id) {
      service.get(`/posts/${this.props.match.params.id}`)
      .then(resp => {
        this.setState({
          offer: resp.data,
          optionsIsOpen: false
        })
      })
        .catch(err => console.log(err));
    } else {
    this.searchRandom();
    }
  }
  detailPost = () => {
    this.props.history.push(`/posts/${this.state.offer._id}/fromswipe`);
  }
  render() {
    let compagnyLogo = this.state.offer?.companyLogo || this.state.offer?.recruiterId?.companyLogo || "/images/temple.png";
    
    return (
      <div className="swipe">
        <div className="header-swipe">
          <img className="ico-swipe ico-profile" src="/images/icons/profile.png" alt="ico" />
          <img
            className="ico-swipe ico-filter"
            src="/images/icons/filter.png"
            alt="ico"
            onClick={this.openFilter}
          />
          <img className="logo-header-swipe" src="/images/ninja-logo.png" alt="ico" />
          <img className="ico-swipe ico-chat" src="/images/icons/chat.png" alt="ico" />
        </div>
        <div  className="body-swipe">
          {(!this.state.offer
            &&
              <h1>{(this.state.errorMessage && <div className="text-red">{this.state.errorMessage}</div> )|| "Loading..."}</h1>)
            || (
            <div className="block-to-swipe" onClick={this.detailPost}>
              <img className="company-logo" src={compagnyLogo} alt="logo" />
              <h1>{this.state.offer.position}</h1>
              <div className="block-infoico">
                <InfoIco type={this.state.offer.experienceLevel} />
                <InfoIco type={this.state.offer.contract}/>
              </div>
            </div>
          )}
        </div>
        {this.state.optionsIsOpen && <OverlayWeapon filter={this.searchRandom} rememberOptions={this.setCurrentoptions} currentOptions={this.state.currentOptions}/>}
      </div>
    );
  }
}

export default SwipeJobPost;
