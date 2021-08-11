import React, { Component } from "react";
import OverlayWeapon from "./overlays/OverlayWeapon";
import service from "./service";
import InfoIco from "./swipe/InfoIco";
import OverlayMatch from './overlays/OverlayMatch';
// import useSwipeable from 'react-swipeable';

class SwipeJobPost extends Component {
  state = {
    optionsIsOpen: false,
    currentOptions: ["Internship", "Freelance", "Permanent", "Temporary"],
    offer: false,
    errorMessage: "",
    remember: [],
    overlayisOpen:false
  };
  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };
  setCurrentoptions = (arrOptionsSelected) => {
    this.setState({
      currentOptions: arrOptionsSelected,
    });
  };
  searchRandom = (params = false) => {
    let url = "/posts/random";
    if (params) {
      url = `${url}?filterContract=${params.join("_")}`;
    } else {
      if (this.state.currentOptions.length > 0) {

        url= `${url}?filterContract=${this.state.currentOptions.join("_")}`;
      }
    }
    service
      .get(url)
      .then((resp) => {
        if (resp.status === 204) {
          this.setState({
            offer: false,
            optionsIsOpen: false,
            errorMessage: resp.statusText,
          });
        } else {
          this.setState({
            offer: resp.data,
            optionsIsOpen: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // this.setState({ errorMessage: err })
      });
  };
  newRandom = async () => {
    let url = "/posts/random";
    if (this.state.currentOptions.length > 0) {

      url= `${url}?filterContract=${this.state.currentOptions.join("_")}`;
    }
    return service
      .get(url)
      .then((resp) => {
        if (resp.status === 204) {
          return false;
        } else {
          return resp.data;
        }
      })
      .catch((err) => {
        console.log(err);
        return false;
        // this.setState({ errorMessage: err })
      });
  };
  componentDidMount() {
    // if return from detail find post by id else random post
    if (this.props.match.params.id) {
      service
        .get(`/posts/${this.props.match.params.id}`)
        .then(async (resp) => {
          this.setState({
            offer: resp.data,
            optionsIsOpen: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.searchRandom();
    }
  }
  detailPost = () => {
    this.props.history.push(`/posts/${this.state.offer._id}/fromswipe`);
  };

  swipeOffer = async () => {
    try {
      let idOffer = this.state.offer._id;
      let updatedUser = await service.patch(`/users/${idOffer}/swipeLeft`);
      let copyRemember = [...this.state.remember, `S_${idOffer}`]; // stock id for reverse
      this.props.updateUser(updatedUser.data.updatedUser);
      let newRandom = await this.newRandom();
      if (newRandom) {
        this.setState({
          offer: newRandom,
          optionsIsOpen: false,
          remember: copyRemember,
        });
      } else {
        this.setState({
          offer: false,
          optionsIsOpen: false,
          errorMessage: "No more offer",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  chooseOffer = async () => {
    try {
      let idApp = this.state.offer.applicationId;
      let copyRemember = [...this.state.remember, `C_${idApp}`]; // stock id for reverse
      // update application with apply of candidate
      let theApplication = await service.patch(`/applications/${this.state.offer.applicationId}/add`);
      let newRandom = await this.newRandom();
      //check if it's a match
      let matched = false;
      if (theApplication.data.application.acceptedCandidateId.includes(this.props.currentUser._id)){
        matched = true;
        this.setState({
          overlayisOpen: matched
        })
        setTimeout(() => {
          this.props.history.push(`/chatbox/${this.state.offer.recruiterId}_${this.props.currentUser._id}_${theApplication.data.application._id}`)
        }, 2000);
        return;
      } 
      //check if there is still offer available
      if (newRandom) {
        this.setState({
          offer: newRandom,
          optionsIsOpen: false,
          remember: copyRemember,
        });
      } else {
        this.setState({
          offer: false,
          optionsIsOpen: false,
          errorMessage: "No more offer",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  comeBack = async () => {
    try {
      
    if (this.state.remember.length < 1) {
      return;
    } else {
      let copyRemember = [...this.state.remember];
      let beforeVal = copyRemember.pop().split("_");
      let action = beforeVal[0];
      let oldId = beforeVal[1];
      if (action === "S") {
        // if last action is swipe update User to remove old choice
        let copyCurrentUser = {...this.props.currentUser};
        let copySwippedOffer = [...copyCurrentUser.swipedOfferId];
        copySwippedOffer.splice(copySwippedOffer.indexOf(oldId), 1);
        let updatedUser = await service.patch("/users", {swipedOfferId: copySwippedOffer});
        let oldOffer = await service.get(`/posts/${oldId}`);
        this.props.updateUser(updatedUser.data);
        this.setState({
          offer:oldOffer.data,
          remember: copyRemember
        })
      }
      if (action === "C") {
        // if last action is apply update application to remove old choice
        let oldApp = await service.patch(`/applications/${oldId}/remove`);
        let oldOffer = await service.get(`/posts/${oldApp.data.application.jobPostId}`);
        oldOffer.data.applicationId = oldId;
        this.setState({
          offer:oldOffer.data,
          remember: copyRemember
        })
      }
    }
    } catch (error) {
      console.log(error);
    }
  };
  showRecruiterBadges = () =>{
    this.props.history.push({pathname:`/myBadges/${(this.state.offer.recruiterId._id)}`, state: {user: this.state.offer.recruiterId}})
  }
  render() {
    let compagnyLogo =
      this.state.offer?.companyLogo ||
      this.state.offer?.recruiterId?.companyLogo ||
      "/images/temple.png";

    return (
      <div className="swipe">
      {this.state.overlayisOpen && <OverlayMatch/>}
        <div className="header-swipe">
          <img className="ico-swipe ico-profile" onClick={()=>this.props.history.push('/profilepage')}src="/images/icons/profile.png" alt="ico" />
          <img
            className="ico-swipe ico-filter"
            src="/images/icons/filter.png"
            alt="ico"
            onClick={this.openFilter}
          />
          <img className="logo-header-swipe" src="/images/ninja-logo.png" alt="ico" />
          <img onClick={()=>this.props.history.push('/conversations')} className="ico-swipe ico-chat" src="/images/icons/chat.png" alt="ico" />
        </div>
        <div className="body-swipe">
          {(!this.state.offer && (
            <h1>
              {(this.state.errorMessage && (
                <div className="text-red">{this.state.errorMessage}</div>
              )) ||
                "Loading..."}
            </h1>
          )) || (
            <div className="block-to-swipe">
              <img className="company-logo"  onClick={this.detailPost} src={compagnyLogo} alt="logo" />
              <h1 onClick={this.detailPost} >{this.state.offer.position}</h1>
              <div onClick={this.detailPost} className="block-infoico">
                <InfoIco type={this.state.offer.experienceLevel} />
                <InfoIco type={this.state.offer.contract} />
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
                  onClick={this.swipeOffer}
                />
                <img
                  className="btn-swipe"
                  src="/images/icons/heart.png"
                  alt="heart ico"
                  onClick={this.chooseOffer}
                />
                <img className="btn-swipe" onClick={()=>this.showRecruiterBadges()} src="/images/icons/badge.png" alt="badge" />
              </div>
            </div>
          )}
        </div>
       
        {this.state.optionsIsOpen && (
          <OverlayWeapon
            filter={this.searchRandom}
            rememberOptions={this.setCurrentoptions}
            currentOptions={this.state.currentOptions}
          />
        )}
      </div>
    );
  }
}

export default SwipeJobPost;
