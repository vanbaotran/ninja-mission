import React, { Component } from "react";

class OverlayWeapon extends Component {
  render() {
    return (
      <div className="overlay">
        <h1>CHOOSE YOUR WEAPON</h1>
        <p>
          the weapon you are looking for stands for the contract type for your next position. By
          default, you can see all types of weapons. Choose the one(s) to your skills!
        </p>
        <div className="weapon-block">
          <div className="weapon">
            <img src="/images/internship-pic.png" alt="ico weapon" />
            <p className="text-blue">Internship</p>
          </div>
          <div className="weapon">
            <img src="/images/shuriken.png" alt="ico weapon" />
            <p className="text-red">Freelance</p>
          </div>
          <div className="weapon">
            <img src="/images/takana.png" alt="ico weapon" />
            <p className="text-blue">Permanent</p>
          </div>
          <div className="weapon">
            <img src="/images/sai.png" alt="ico weapon" />
            <p className="text-red">Temporary</p>
          </div>
        </div>
      </div>
    );
  }
}

export default OverlayWeapon;
