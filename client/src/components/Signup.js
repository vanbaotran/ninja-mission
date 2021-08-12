import React from "react";
import { signup } from "./service";
import RedTop from "./backgrounds/RedTop";
class Signup extends React.Component {
  state = {
    name: "",
    email: "",
    password: "",
    profileType: "",
  };
  updateProfileType = (profileType) => {
    this.setState({
      profileType: profileType,
    });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, email, password, profileType } = this.state;
    signup(name, email, password, profileType)
      .then((response) => {
        this.props.updateUser(response);
        if (response.profileType === "recruiter") {
          this.props.history.push("/recruiterform");
        } else if (response.profileType === "candidate") {
          this.props.history.push("/editCandidateform");
        }
      })
      .catch((error) => console.log(error));
  };
  render() {
    if (this.state.profileType === "") {
      return (
        <div>
          <div className="signup">
           <img className='icon' onClick={()=>this.props.history.goBack()} src='/images/icons/back-blue.png' alt=''/>
            <div className="sub-signup flex-column">
              <h2>You are here to...</h2>
              <div className="flex-row">
                <div onClick={() => this.updateProfileType("recruiter")}>
                  <img className='signup-image' src="/images/temple.png" alt="temple" />
                  <h4 className="text-blue">HIRE A NINJA</h4>
                </div>
                <div onClick={() => this.updateProfileType("candidate")}>
                  <img className='signup-image' src="/images/ninja.png" alt="ninja" />
                  <h4 className="text-red">FIND YOUR MISSION</h4>
                </div>
              </div>
            </div>
          </div>
          <img className="logo-footer" src="/images/ninja-logo.png" alt="logo" />
        </div>
      );
    } else {
      return (
        <div className="signup-form">
          <RedTop />
           <img className='icon' onClick={()=>this.props.history.goBack()} src='/images/icons/back-blue.png' alt=''/>
          <form onSubmit={this.handleSubmit}>
            <div className="form-no-btn">
              <h1 className="text-blue">LET'S SIGN UP</h1>
              <label>
                Name
                <input
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Email
                <input
                  type="text"
                  name="email"
                  value={this.state.email}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
              <label>
                Password
                <input
                  type="password"
                  name="password"
                  value={this.state.password}
                  onChange={(e) => this.handleChange(e)}
                />
              </label>
            </div>
            <button className="btn blue">DISCOVER THE NINJA WORLD</button>
          </form>
          <img className="logo-footer" src="/images/ninja-logo.png" alt="logo" />
        </div>
      );
    }
  }
}
export default Signup;
