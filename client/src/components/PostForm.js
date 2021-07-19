import React, { Component } from "react";
import { uploadFile } from "./service";
export class PostForm extends Component {
  state = {
    companyLogo: "",
    companyBio: "",
    companyName: "",
    description: "", /// verif 500 char
    position: "",
    contract: "", //  enum: ["Internship", "Freelance", "Permanent", "Temporary"],
    experienceLevel: "", // enum: ["Warrior", "Ninja", "Samurai", "Sensei"],
    codeLanguage: [], // voir si enum et ou vérification bonne donnée
    location: { city: [], country: [] },
    remote: false,
    funFact: "", //maxlength: 250,
    website: "",
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  handleCheckbox = (e) => {
    this.setState({
      [e.target.name]: !this.state.remote,
    });
  };
  handleLogo = (e) => {
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    uploadFile(uploadData)
      .then(response => {
        this.setState({ companyLogo: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      });
  };
  handleChangeMultiple = (e) => {
    let arrMultiple = [];
    for (const key in e.target.options) {
      if (Object.hasOwnProperty.call(e.target.options, key)) {
        const element = e.target.options[key];
        if (element.selected) {
          arrMultiple.push(element.value);
        }
      }
    }
    this.setState({
      [e.target.name]: arrMultiple,
    });
  };

  handleSubmit = (e) => {
    e.prenventDefault();
  };

  render() {
    return (
      <div className="post-form-main">
        <h2>Add A New Offer</h2>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          {
            <label>
              <img src={this.state.companyLogo || "/images/temple.png"} alt="logo" />
              <input type="file" name="companyLogo" accept=".png,.jpg,.jpeg" onChange={this.handleLogo}/>
            </label>
          }
          <label>
            Name
            <input
              type="text"
              name="companyName"
              value={this.state.companyName}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            Position
            <input
              type="text"
              name="position"
              value={this.state.position}
              onChange={(e) => this.handleChange(e)}
            />
          </label>
          <label>
            Exp Level
            {/* experienceLevel: "", // enum: ["Warrior", "Ninja", "Samurai", "Sensei"], */}
            <select name="experienceLevel" onChange={(e) => this.handleChange(e)}>
              <option value="">Please choose an option</option>
              <option value="Warrior">Warrior 0-2yrs</option>
              <option value="Ninja">Ninja 2-3yrs</option>
              <option value="Samurai">Samurai 3-5yrs</option>
              <option value="Sensei">Sensei 5yrs+</option>
            </select>
          </label>
          <label>
            Contract
            <select name="contract" onChange={(e) => this.handleChange(e)}>
              <option value="">Please choose an option</option>
              <option value="Internship">Internship</option>
              <option value="Freelance">Freelance</option>
              <option value="Permanent">Permanent</option>
              <option value="Temporary">Temporary</option>
            </select>
          </label>
          <label>
            Remote
            <input
              name="remote"
              type="checkbox"
              checked={this.state.remote}
              onChange={this.handleCheckbox}
            />
          </label>
          <label>
            Languages
            {/* experienceLevel: "", // enum: ["Warrior", "Ninja", "Samurai", "Sensei"], */}
            <select
              multiple={true}
              name="codeLanguage"
              onChange={(e) => this.handleChangeMultiple(e)}
            >
              <option value="">Please choose options</option>
              <option value="PHP">PHP </option>
              <option value="JS"> JS</option>
              <option value="Python"> Python</option>
              <option value="Ruby"> Ruby </option>
              <option value="HTML"> HTML</option>
              <option value="CSS"> CSS</option>
              <option value="C++"> C++</option>
              <option value="C">C</option>
              <option value="Rust">Rust</option>
            </select>
          </label>
          <label>
            Company bio
            <textarea
              name="companyBio"
              value={this.state.companyBio}
              onChange={(e) => this.handleChange(e)}
              rows={5}
              cols={20}
            />
          </label>
          <label>
            Description
            <textarea
              name="description"
              value={this.state.description}
              onChange={(e) => this.handleChange(e)}
              rows={10}
              cols={20}
            />
          </label>
          <label>
            Fun fact
            <textarea
              name="funFact"
              value={this.state.funFact}
              onChange={(e) => this.handleChange(e)}
              rows={3}
              cols={20}
            />
          </label>
          <label>
            Website
            <input type="text" name="" value="" onChange={(e) => this.handleChange(e)} />
          </label>
        </form>
      </div>
    );
  }
}

export default PostForm;

/* <TextInput
            label="Company Bio"
            name="companyBio"
            value={this.state.companyBio}
            change={this.handleChange}
            area={true}
            rows={10}
          />
          <TextInput
            label="Description"
            name="description"
            value={this.state.description}
            change={this.handleChange}
            area={true}
            rows={15}
          />
          <TextInput
            label="Position"
            name="position"
            value={this.state.position}
            change={this.handleChange}
          />
          <SelectInput
            label="Contract"
            name="contract"
            value={this.state.contract}
            change={this.handleChange}
            options={ContractOptions}
            multiple={false}
          />
          <SelectInput
            label="Exp Level"
            name="experienceLevel"
            value={this.state.experienceLevel}
            change={this.handleChange}
            options={LevelOptions}
            multiple={false}
          />
          <SelectInput
            label="Languages"
            name="codeLanguage"
            value={this.state.codeLanguage}
            change={this.handleChange}
            options={LanguageOptions}
            multiple={true}
          />
           */
