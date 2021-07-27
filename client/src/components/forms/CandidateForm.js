import React from 'react'
import {uploadFile,editProfile} from '../service';
import SelectInput from "../inputs/SelectInput";
const LevelOptions = ["Warrior", "Ninja", "Samurai", "Sensei"];
const LanguageOptions = ["PHP", "JS", "Python", "Ruby", "HTML", "CSS", "C++", "C", "Rust"];
// import axios from 'axios';

class CandidateForm extends React.Component{
  state = {
    name:this.props.currentUser?.name || "",
    email:this.props.currentUser?.email || "", 
    birthday:this.props.currentUser?.birthday || "",
    bio:this.props.currentUser?.bio ||"",
    avatar:this.props.currentUser?.avatar || "", 
    title:this.props.currentUser?.title|| "", 
    codeLanguage:this.props.currentUser?.codeLanguage|| "", 
    funFact:this.props.currentUser?.funFact|| "",
    level:this.props.currentUser?.level|| "",
    usefulLinks:{
      linkedin: this.props.currentUser?.usefulLinks?.linkedin || "",
      github: this.props.currentUser?.usefulLinks?.github || "",
      portfolio: this.props.currentUser?.usefulLinks?.portfolio|| "" ,
    }
  }
  componentDidUpdate(prevProps) {
    if(prevProps.currentUser !== this.props.currentUser){
      this.setState({
        name:this.props.currentUser.name,
        email:this.props.currentUser.email,
        birthday:this.props.currentUser.birthday,
        bio:this.props.currentUser.bio,
        avatar:this.props.currentUser.avatar,
        title:this.props.currentUser.title,
        codeLanguage:this.props.currentUser.codeLanguage,
        funFact:this.props.currentUser.funFact,
        level:this.props.currentUser.level,
        usefulLinks:{
          linkedin: this.props.currentUser.usefulLinks.linkedin,
          github: this.props.currentUser.usefulLinks.github,
          portfolio: this.props.currentUser.usefulLinks.portfolio,
        }
      })
    } 
  }

  handleSubmit = (event) => {
    event.preventDefault()
    editProfile({...this.state})
    .then(response=>{
      console.log(response)
      this.props.updateUser(response)
      this.setState(response)
      this.updateUser(response)
    })
    .catch(error => console.log(error))
  }
  handleChange = (event) =>{
    const {name,value} = event.target;
    this.setState({[name]:value})
  }
  handleChangeUsefulLink = (event) =>{
    const {name,value} = event.target;
    const updatedLinks = {...this.state.usefulLinks,[name]:value}
    this.setState({
      usefulLinks:updatedLinks
    });
 }
  handleChangeMultiple = (name, value) => {
    this.setState({
      [name]: value,
    });
  };
  handleChangeFile = (e) =>{
    const uploadData = new FormData();
    uploadData.append('imageUrl', e.target.files[0]);
    uploadFile(uploadData)
      .then(response => {
        this.setState({ avatar: response.secure_url });
      })
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      })
  }
  render(){
    return(
      <div className='form'>
        <form onSubmit={this.handleSubmit}>
            <label>Name</label>
            <input type='text' name='name' value={this.state.name} onChange={(e)=>this.handleChange(e)}/>
            <label>Email</label>
            <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
            <label>Password</label>
            <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
            <label>Birthday </label>
            <input type='date' name='birthday' value={this.state.birthday} onChange={(e)=>this.handleChange(e)}/>
            <label>Bio</label>
            <input type='text' name='bio' value={this.state.bio} onChange={(e)=>this.handleChange(e)} /> 
            <label>Avatar</label>
            <input type='file' name='avatar'  onChange={(e)=>this.handleChangeFile(e)} />
            <SelectInput
            label="Exp Level"
            name="level"  
            value={this.state.experienceLevel}
            change={this.handleChange}
            options={LevelOptions}
            multiple={false}
          />
            <label>Job Title</label>
            <input type='text' name='title' value={this.state.title} onChange={(e)=>this.handleChange(e)} />
            <SelectInput
            label="Languages"
            name="codeLanguage"
            value={[...this.state.codeLanguage]}
            change={this.handleChangeMultiple}
            options={LanguageOptions}
            multiple={true}
          />
            <label>Fun fact</label>
            <input type='text' name='funFact' value={this.state.funFact} onChange={(e)=>this.handleChange(e)} />
            <label>LinkedIn</label>
            <input type='text' name='linkedin' value={this.state.usefulLinks.linkedin} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <label>Github</label>
            <input type='text' name='github' value={this.state.usefulLinks.github} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <label>Porfolio</label>
            <input type='text' name='portfolio' value={this.state.usefulLinks.portfolio} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <button>SAVE THE CHANGES</button>
        </form>
      </div>
    )
  }
}

export default CandidateForm