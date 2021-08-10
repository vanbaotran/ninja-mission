import React from "react";
import TextInput from "../inputs/TextInput";
import service, { uploadFile, deleteUser } from "../service";
import BlueTop from "../backgrounds/BlueTop";

class RecruiterForm extends React.Component {
  state = {
    name: this.props.currentUser?.name || "",
    email: this.props.currentUser?.email || "",
    bio: this.props.currentUser?.bio || "",
    companyName: this.props.currentUser?.companyName || "",
    companyLogo: this.props.currentUser?.companyLogo || "",
    companyWebsite: this.props.currentUser?.companyWebsite || "",
    industry: this.props.currentUser?.industry || "",
    scope: this.props.currentUser?.scope || "",
    funFact: this.props.currentUser?.funFact || ""
  };
  handleSubmit = (e) => {
    e.preventDefault();
    service.patch(`/users`, { ...this.state }).then((response) => {
      let updatedUser = response.data;
      console.log(updatedUser)
      this.setState({
        name: updatedUser ? updatedUser.name : "",
        email: updatedUser ? updatedUser.email : "",
        bio: updatedUser ? updatedUser.bio : "",
        companyName: updatedUser ? updatedUser.companyName : "",
        companyLogo: updatedUser ? updatedUser.companyLogo : "",
        companyWebsite: updatedUser ? updatedUser.companyWebsite : "",
        industry: updatedUser ? updatedUser.industry : "",
        scope: updatedUser?.scope || "",
        funFact: updatedUser?.funFact || ""
      });
    this.props.updateUser(updatedUser)
    this.props.history.push('/companyDetails')
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
    if (!this.props.currentUser) { this.props.history.push("/login") } else {
      service.get(`/users/${this.props.currentUser._id}`).then(response => {
        this.setState({...response.data });
      });  
    }
  }
  deleteAccount = async (e) => {
    let data = await deleteUser(this.props.currentUser._id);
    console.log(data);
    this.props.history.push({ pathname: "/", state: { from: "delete" } });
  }
  render() {
    return (
      <div className="form">
      <BlueTop/>
        <form onSubmit={this.handleSubmit}>
        <div className="form-no-btn">
        <h1 className="text-blue">Edit Your Company Profile</h1>
          <div className='flex-row logo'>
            <img 
              src={this.state.companyLogo || "/images/temple.png"}
              alt="logo"
            />
            <div className = 'upload-logo'> 
            <label>
            <input
              type="file"
              name="companyLogo"
              accept=".png,.jpg,.jpeg"
              onChange={this.handleLogo}
            />
              <img src='/images/icons/edit.png' alt=''/>
            </label>
            </div>
          </div>
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
            label="Website"
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
           {/* <TextInput
            label="City"
            name="city"
            value={this.state.scope.city}
            change={this.handleChange}
          />  
          <TextInput
            label="Country"
            name="country"
            value={this.state.scope.country}
            change={this.handleChange}
          /> */}
           <TextInput
            label="Fun Fact"
            name="funFact"
            value={this.state.funFact}
            change={this.handleChange}
          />
</div>
          <button className='btn red'>SAVE THE CHANGES</button>
        </form>
        {this.props.currentUser.profileType === "recruiter" && <button className="btn blue" onClick={(e) => this.deleteAccount(e)}>Delete my account</button>}
      </div>
    );
  }
}

export default RecruiterForm;
