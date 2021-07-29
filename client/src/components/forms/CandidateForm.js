import React from 'react'
import {uploadFile,editProfile} from '../service';
import BlueTop from '../backgrounds/BlueTop';
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
    cvUrl:this.props.currentUser?.cvUrl || "", 
    title:this.props.currentUser?.title|| "", 
    codeLanguage:this.props.currentUser?.codeLanguage|| "", 
    funFact:this.props.currentUser?.funFact|| "",
    level:this.props.currentUser?.level|| "",
    usefulLinks:{
      linkedin: this.props.currentUser?.usefulLinks?.linkedin || "",
      github: this.props.currentUser?.usefulLinks?.github || "",
      portfolio: this.props.currentUser?.usefulLinks?.portfolio|| "" ,
    },
    errorMessage:{
      empty:'This input cannot be empty!',
      valid:'This input needs to be valid!',
      level:'Please choose your level!'
    }
  }
  // componentDidUpdate(prevProps) {
  //   if(prevProps.currentUser !== this.props.currentUser){
  //     this.setState({
  //       name:this.props.currentUser.name,
  //       email:this.props.currentUser.email,
  //       birthday:this.props.currentUser.birthday,
  //       bio:this.props.currentUser.bio,
  //       avatar:this.props.currentUser.avatar,
  //       cvUrl:this.props.currentUser.cvUrl,
  //       title:this.props.currentUser.title,
  //       codeLanguage:this.props.currentUser.codeLanguage,
  //       funFact:this.props.currentUser.funFact,
  //       level:this.props.currentUser.level,
  //       usefulLinks:{
  //         linkedin: this.props.currentUser?.usefulLinks?.linkedin || "",
  //         github: this.props.currentUser?.usefulLinks?.github || "",
  //         portfolio: this.props.currentUser?.usefulLinks?.portfolio|| "" ,
  //       }
  //     })
  //   } 
  // }
  validateEmail = (inputText) => {
    var mailformat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    if(inputText.match(mailformat))
    {
      return false;
      } else {
        return true;
      }
}
  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state)
    editProfile({...this.state})
    .then(response=>{
      console.log(response)
      this.setState(response)
      this.props.updateUser(response)
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
        // console.log(e)
        console.log(response.secure_url)
        if (e.target.name ==='cvUrl'){
           this.setState({ cvUrl: response.secure_url});
        } else {
          this.setState({ avatar: response.secure_url});
        }
      })       
      .catch(err => {
        console.log('Error while uploading the file: ', err);
      })
  }
  render(){
    return(
      <div className='form'>
      <BlueTop/>
        <form onSubmit={this.handleSubmit}>
          <div className='form-no-btn'>
           <h1 className='text-blue'>Edit your profile</h1>
            <label>Name
            <input type='text' name='name' value={this.state.name} onChange={(e)=>this.handleChange(e)}/>
            <p className='text-red'>{ !this.state.name && this.state.errorMessage.empty} </p>
            </label>
            <label>Email
            <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
             <p className='text-red'>{ !this.state.email && this.state.errorMessage} { this.validateEmail(this.state.email) && this.state.errorMessage.valid}</p>
            </label>
            {/* <label>Password
            <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
            </label> */}
            <label>Birthday 
            <input type='date' name='birthday' value={this.state.birthday} onChange={(e)=>this.handleChange(e)}/>
            </label>
            <label>Bio
            <input type='text' name='bio' value={this.state.bio} onChange={(e)=>this.handleChange(e)} /> 
            </label>
            <label>Avatar
            <input type='file' name='avatar'  onChange={(e)=>this.handleChangeFile(e)} />
            </label>
            <label>CV
            <input type='file' name='cvUrl'  onChange={(e)=>this.handleChangeFile(e)} />
            </label>
            <SelectInput
            label="Exp Level"
            name="level"  
            value={this.state.level}
            change={this.handleChange}
            options={LevelOptions}
            multiple={false}
          />
          <p className='text-red'>{ this.state.level==='none' && this.state.errorMessage.level} </p>
            <label>Job Title
            <input type='text' name='title' value={this.state.title} onChange={(e)=>this.handleChange(e)} />
            </label>
            <SelectInput
            label="Languages"
            name="codeLanguage"
            value={[...this.state.codeLanguage]}
            change={this.handleChangeMultiple}
            options={LanguageOptions}
            multiple={true}
          />
            <label>Fun fact
            <input type='text' name='funFact' value={this.state.funFact} onChange={(e)=>this.handleChange(e)} />
            </label>
            <label>LinkedIn
            <input type='text' name='linkedin' value={this.state.usefulLinks.linkedin} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            </label>
            <label>Github
            <input type='text' name='github' value={this.state.usefulLinks.github} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            </label>
            <label>Porfolio
            <input type='text' name='portfolio' value={this.state.usefulLinks.portfolio} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            </label>
          </div>
            <button className='btn blue'>SAVE THE CHANGES</button>
        </form>
      </div>
    )
  }
}

export default CandidateForm