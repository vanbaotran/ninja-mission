import React, { Component } from "react";
const level = {
  Warrior: "0-2 Years",
  Ninja: "2-3 Years",
  Samurai: "3-5 Years",
  Sensei: "5+ years",
};

class InfoIco extends Component {
  state = {
    image: '',
    blueText: "",
    redText: "",
  };
  setgoogState = () => {
    if (["Warrior", "Ninja", "Samurai", "Sensei"].includes(this.props.type)) {
      this.setState({
        image: `/images/${this.props.type.toLowerCase()}.png`,
        blueText: level[this.props.type],
        redText: "Experience",
      });
    }
    if (["Internship", "Freelance", "Permanent", "Temporary"].includes(this.props.type)) {
      this.setState({
        image: `/images/${this.props.type.toLowerCase()}.png`,
        blueText: this.props.type,
        redText: "Contract",
      });
    }
  };
  componentDidMount() {
    this.setgoogState();
  }
  componentDidUpdate(prevProps) {
    if (prevProps.type !== this.props.type) {
      this.setgoogState();
    }
  }
  render() {
    return (
      <div className="info-block">
        <img src={this.state.image} alt="ico info" />
        <p className="text-blue">{this.state.blueText}</p>
        <p className="text-red">{this.state.redText}</p>
      </div>
    );
  }
}

export default InfoIco;
