import React from "react";
import { Link } from "react-router-dom";
import NavBar from "./NavBar";
class Homepage extends React.Component {
  render() {
    return (
      <div className="sub-app">
        <NavBar />
        <section className="landPage">
          <div className="sub-landPage">
            <img className="logo" src="/images/ninja-logo.png" alt="logo" />
          </div>
          <div className="btns">
            <Link to="/login">
              <button className="btn blue">LOG IN</button>
            </Link>
            <Link to="/signup">
              <button className="btn red">SIGN UP</button>
            </Link>
          </div>
        </section>
      </div>
    );
  }
}
export default Homepage;
