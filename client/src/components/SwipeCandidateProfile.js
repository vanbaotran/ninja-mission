import React from "react";
import service from "./service";
import OverlayExperience from "./overlays/OverlayExperience";
import OverlayMatch from './overlays/OverlayMatch';
import OverlayAlert from './overlays/OverlayAlert'
class SwipeCandidateProfile extends React.Component {
  state = {
    optionsIsOpen: false,
    currentOptions: [],
    candidate: false,
    errorMessage: "",
    remember: [],
    overlayisOpen:false
  };
  openFilter = (e) => {
    this.setState({ optionsIsOpen: true });
  };

  searchRandom = (params = false) => {
    let url = "/users/random";
    if (params) {
      url = `${url}?filterLevel=${params.join("_")}`;
    }
    service
      .get(url)
      .then((resp) => {
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
  };
  swipeCandidate = async () => {
    try {
      await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/refuse`, {
        id: this.state.candidate._id,
      });
      let copyRemember = [
        ...this.state.remember,
        `R_${this.state.candidate._id}`,
      ];
      this.setState({
        remember: copyRemember,
      });
      this.searchRandom();
    } catch (error) {
      console.log(error);
    }
  };
  chooseCandidate = async () => {
    try {
     let theApplication = await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/accept`, {
        id: this.state.candidate._id,
      });
      let copyRemember = [...this.state.remember, `A_${this.state.candidate._id}`];
      if (theApplication.data.application.candidateId.includes(this.state.candidate._id)) {
        this.setState({
          remember: copyRemember,
          overlayisOpen: true
        });
        setTimeout(() => {
          this.setState({
            overlayisOpen: false
          })
          this.props.history.push(`/chatbox/${this.props.currentUser._id}_${this.state.candidate._id}_${theApplication.data.application._id}`)
        }, 2000);  
      } else {
        this.setState({
          remember: copyRemember,
        });
      this.searchRandom();
      }
   
    } catch (error) {
      console.log(error);
    }
  };
  componentDidMount = () => {
    if (this.props.match.params.id) {
      service
        .get(`/users/${this.props.match.params.id}`)
        .then((response) => {
          this.setState({
            candidate: response.data,
          });
        })
        .catch((err) => console.log(err));
    } else {
      this.searchRandom();
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
        let oldIdCandidate = beforeVal[1];
        if (action === "R") {
          // if last action is swipe update  application to remove old choice
          await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/undoRefuse`, {id: oldIdCandidate} );;
          let oldCandidate = await service.get(`/users/${oldIdCandidate}`);
          this.setState({candidate: oldCandidate.data, remember: copyRemember});
        }
        if (action === "A") {
           await service.patch(`/applications/${this.props.currentUser.currentApplicationId}/undoAccept`, {id: oldIdCandidate} );;
          let oldCandidate = await service.get(`/users/${oldIdCandidate}`);
          this.setState({candidate: oldCandidate.data, remember:copyRemember});
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  render() {
    return (
      <div className="swipeCandidate">
      {this.state.overlayisOpen && <OverlayMatch/>}
      {!this.props.currentUser.currentPostId && <OverlayAlert {...this.props} random={this.searchRandom}/>}
        <div className="swipe">
          <div className="header-swipe">
            <img
              className="ico-swipe ico-profile"
              src="/images/icons/profile.png"
              onClick={() => {
                this.props.history.push("/profilepage");
              }}
              alt="ico"
            />
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
          {(!this.state.candidate && ((this.state.errorMessage && <h1 className="text-red">{this.state.errorMessage}</h1>) || <h1>Loading...</h1>))
            || (
              <div className="block-to-swipe" >
                <img onClick={this.detailPost} className="company-logo" src={this.state.candidate.avatar} alt="avatar" />
                <div onClick={this.detailPost} className="block-footer">
                  <h1>{this.state.candidate.title}</h1>
                  <div className="image-level">
                    <img
                      src={
                        this.state.candidate
                          ? `/images/${this.state.candidate.level?.toLowerCase()}.png`
                          : `/images/ninja.png`
                      }
                      alt="level-icon"
                    />
                  </div>
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
                    onClick={this.chooseCandidate}
                  />
                  <img className="btn-swipe" src="/images/icons/badge.png" alt="badge ico" onClick={() => this.props.history.push({pathname:`/myBadges/${this.state.candidate._id}`, state: {user: this.state.candidate}})} />
               </div>
              </div>
            )}
              
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
