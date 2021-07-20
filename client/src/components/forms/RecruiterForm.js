import React from "react";
import TextInput from "../inputs/TextInput";
import service, { uploadFile, loggedIn } from "../service";

class RecruiterForm extends React.Component {
  state = {
    name: this.props.currentUser ? this.props.currentUser.name : "",
    email: this.props.currentUser ? this.props.currentUser.email : "",
    bio: this.props.currentUser ? this.props.currentUser.bio : "",
    companyName: this.props.currentUser ? this.props.currentUser.companyName : "",
    companyLogo: this.props.currentUser ? this.props.currentUser.companyLogo : "",
    companyWebsite: this.props.currentUser ? this.props.currentUser.companyWebsite : "",
    industry: this.props.currentUser ? this.props.currentUser.industry : "",
  };
  handleSubmit = (e) => {
    e.preventDefault();
    service.patch(`/users`, { ...this.state }).then((response) => {
      let updatedUser = response.data;
      // console.log(updatedUser)
      this.setState({
        name: updatedUser ? updatedUser.name : "",
        email: updatedUser ? updatedUser.email : "",
        bio: updatedUser ? updatedUser.bio : "",
        companyName: updatedUser ? updatedUser.companyName : "",
        companyLogo: updatedUser ? updatedUser.companyLogo : "",
        companyWebsite: updatedUser ? updatedUser.companyWebsite : "",
        industry: updatedUser ? updatedUser.industry : "",
      });
    });
  };
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleLogo = (e) => {
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    uploadFile(uploadData)
      .then((response) => {
        this.setState({ companyLogo: response.secure_url });
      })
      .catch((err) => {
        console.log("Error while uploading the file: ", err);
      });
  };
  componentDidMount() {
    if (!this.props.currentUserId) { this.props.history.push("/") } else {
      service.get(`/users/${this.props.currentUserId}`).then(response => {
        let { name, email, bio, companyName, companyLogo, companyWebsite, industry } = response.data;
        this.setState({ name, email, bio, companyName, companyLogo, companyWebsite, industry });
      }); 
      
    }
  }
  render() {
    return (
      <div className="form">
        <form onSubmit={this.handleSubmit}>
          <label>
            <img src={this.state.companyLogo || "/images/temple.png"} alt="logo" />
            <input
              type="file"
              name="companyLogo"
              accept=".png,.jpg,.jpeg"
              onChange={this.handleLogo}
            />
          </label>
          <TextInput label="Name" name="name" value={this.state.name} change={this.handleChange} />
          <TextInput
            label="Email"
            name="email"
            value={this.state.email}
            change={this.handleChange}
          />
          <TextInput
            label="Company Name"
            name="companyName"
            value={this.state.companyName}
            change={this.handleChange}
          />
          <TextInput
            label="Company Website"
            name="companyWebsite"
            value={this.state.companyWebsite}
            change={this.handleChange}
          />
          <TextInput
            label="Company Bio"
            name="bio"
            value={this.state.bio}
            change={this.handleChange}
            area={true}
            rows={5}
            cols={20}
          />
          <TextInput
            label="Industry"
            name="industry"
            value={this.state.industry}
            change={this.handleChange}
          />
          <button>SAVE {}</button>
        </form>
      </div>
    );
  }
}

export default RecruiterForm;
