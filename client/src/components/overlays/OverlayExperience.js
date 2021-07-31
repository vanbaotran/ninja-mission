import React, { Component } from "react";

class OverlayExperience extends Component {
  state = {
    chooseFilter: [],
  };
  filterDataSwipeParent = () => {
    if (this.state.chooseFilter.length === 0) {
      this.props.filter();
      this.props.rememberOptions([]);
    } else {
      this.props.filter(this.state.chooseFilter);
      this.props.rememberOptions(this.state.chooseFilter);
    }
  };
  toggleFilter = (level) => {
    let copyChoose = [...this.state.chooseFilter];
    if (this.state.chooseFilter.includes(level)) {
      copyChoose.splice(this.state.chooseFilter.indexOf(level), 1);
    } else {
      copyChoose.push(level);
    }
    this.setState({
      chooseFilter: copyChoose
    })
  }
  filterDataSwipeParent = () => {
    if (this.state.chooseFilter.length === 0) {
      this.props.filter();
      this.props.rememberOptions([]);
    } else {
      this.props.filter(this.state.chooseFilter);
      this.props.rememberOptions(this.state.chooseFilter);
    }
  };
  toggleFilter = (level) => {
    let copyChoose = [...this.state.chooseFilter];
    if (this.state.chooseFilter.includes(level)) {
      copyChoose.splice(this.state.chooseFilter.indexOf(level), 1);
    } else {
      copyChoose.push(level);
    }
    this.setState({
      chooseFilter: copyChoose
    })
  }
  componentDidMount() {
    this.setState({
      chooseFilter: this.props.currentOptions
    })
    
  }
  render() {
    return (
      <div className="overlay">
          <img onClick={this.filterDataSwipeParent} src="/images/icons/close_black.png" alt="close ico" />
        <h1>CHOOSE THE NINJA TYPE</h1>
        <p>
          The ninja type stands for the experience level of the candidate you are looking for. By
          default, you can see all types of ninjas. Choose the one(s) to find your ninja to hire!
          <br/>
          <strong>Grey weapons are filters if no filter all job posts is selected</strong>
        </p>
        <div className="level-block">
          <div onClick={() => this.toggleFilter("Warrior")} className={`level ${this.state.chooseFilter.includes("Warrior") ? "bg-grey" : ""}`}>
            <img src="/images/warrior.png" alt="ico level" />
            <p className="text-blue">Warrior</p>
          </div>
          <div onClick={() => this.toggleFilter("Ninja")} className={`level ${this.state.chooseFilter.includes("Ninja") ? "bg-grey" : ""}`}>
            <img src="/images/ninja.png" alt="ico level" />
            <p className="text-red">Ninja</p>
          </div>
          <div onClick={() => this.toggleFilter("Samurai")} className={`level ${this.state.chooseFilter.includes("Samurai") ? "bg-grey" : ""}`}>
            <img src="/images/samurai.png" alt="ico level" />
            <p className="text-blue">Samurai</p>
          </div>
          <div onClick={() => this.toggleFilter("Sensei")} className={`level ${this.state.chooseFilter.includes("Sensei") ? "bg-grey" : ""}`}>
            <img src="/images/sensei.png" alt="ico level" />
            <p className="text-red">Sensei</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OverlayExperience;
