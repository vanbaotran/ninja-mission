import React, { Component } from "react";

class OverlayWeapon extends Component {
  state = {
    chooseFilter: [],
  };
  filterDataSwipeParent = () => {
    if (this.state.chooseFilter.length === 0) {
      this.props.filter();
      this.props.remenberOptions([]);
    } else {
      this.props.filter(this.state.chooseFilter);
      this.props.remenberOptions(this.state.chooseFilter);
    }
  };
  toggleFilter = (contract) => {
    let copyChoose = [...this.state.chooseFilter];
    if (this.state.chooseFilter.includes(contract)) {
      copyChoose.splice(this.state.chooseFilter.indexOf(contract), 1);
    } else {
      copyChoose.push(contract);
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
        <h1>CHOOSE YOUR WEAPON</h1>
        <p>
          the weapon you are looking for stands for the contract type for your next position. By
          default, you can see all types of weapons. Choose the one(s) to your skills!
          <br/>
          <strong>Grey weapons are filters if no filter all job posts is selected</strong>
        </p>
        <div className="weapon-block">
          <div onClick={() => this.toggleFilter("Internship")} className={`weapon ${this.state.chooseFilter.includes("Internship") ? "bg-grey" : ""}`}>
            <img src="/images/internship.png" alt="ico weapon" />
            <p className="text-blue">Internship</p>
          </div>
          <div onClick={() => this.toggleFilter("Freelance")} className={`weapon ${this.state.chooseFilter.includes("Freelance") ? "bg-grey" : ""}`}>
            <img src="/images/freelance.png" alt="ico weapon" />
            <p className="text-red">Freelance</p>
          </div>
          <div onClick={() => this.toggleFilter("Permanent")} className={`weapon ${this.state.chooseFilter.includes("Permanent") ? "bg-grey" : ""}`}>
            <img src="/images/permanent.png" alt="ico weapon" />
            <p className="text-blue">Permanent</p>
          </div>
          <div onClick={() => this.toggleFilter("Temporary")} className={`weapon ${this.state.chooseFilter.includes("Temporary") ? "bg-grey" : ""}`}>
            <img src="/images/temporary.png" alt="ico weapon" />
            <p className="text-red">Temporary</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OverlayWeapon;
