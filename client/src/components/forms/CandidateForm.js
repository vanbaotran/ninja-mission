import React from 'react'
import {uploadFile,editProfile, deleteUser} from '../service';
import BlueTop from '../backgrounds/BlueTop';
import SelectInput from "../inputs/SelectInput";
import TextInput from "../inputs/TextInput";
import service from '../service';
import OverlayUpdated from '../overlays/OverlayUpdated'
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
    },
    popUp: false,
  }
  componentDidMount() {
     if (!this.props.currentUser) { this.props.history.push("/login") } else {
      service.get(`/users/${this.props.currentUser._id}`).then(response => {

        this.setState({...response.data});
      });  
    }
  }
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
    if (!this.state.level || this.state.level === "none") {
      return 
    }
    editProfile({...this.state})
    .then(response=>{
      this.setState({...response, popUp: true})
      this.props.updateUser(response)
      setTimeout(() => {
        this.setState({popUp:false})
        this.props.history.push("/personalProfile")
      }, 2000);
     
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
  deleteAccount = async (e) => {
    try {
      await deleteUser(this.props.currentUser._id);
      this.props.history.push({ pathname: "/", state: { from: "delete" } });
      
    } catch (error) {
      console.log(error)
    }
  }
  render(){
    function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();
    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
    return(
      <div className='form'>
      {this.state.popUp && <OverlayUpdated/>}
      <BlueTop/>
        <form onSubmit={this.handleSubmit}>
          <div className='form-no-btn'>
           <h1 className='text-blue'>EDIT YOUR PROFILE</h1>
            <label>Name
            <input type='text' name='name' value={this.state.name} onChange={(e)=>this.handleChange(e)}/>
            <p className='text-red'>{ !this.state.name && this.state.errorMessage.empty} </p>
            </label>
            <label>Email
            <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
             <p className='text-red'>{ !this.state.email && this.state.errorMessage} { this.validateEmail(this.state.email) && this.state.errorMessage.valid}</p>
            </label>
            <label>Birthday 
            <input type='date' name='birthday' value={formatDate(this.state.birthday)} onChange={(e)=>this.handleChange(e)}/>
            </label>
            <TextInput
            label="Bio"
            name="bio"
            value={this.state.bio}
            change={this.handleChange}
            area={true}
            rows={10}
            cols={20}
          />
            <label>Avatar
            <input type='file' name='avatar'  onChange={(e)=> this.handleChangeFile(e)} />
            </label>
            <label>CV
            <input type='file' name='cvUrl'  onChange={(e)=> this.handleChangeFile(e)} />
            </label>
            <SelectInput
            label="Exp Level"
            name="level"  
            value={this.state.level}
            change={this.handleChange}
            options={LevelOptions}
            multiple={false}
          /> 
          <p className='text-red'>{(this.state.level==='none' || !this.state.level) && this.state.errorMessage.level} </p>
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
           <TextInput
            label="Fun Fact"
            name="funFact"
            value={this.state.funFact}
            change={this.handleChange}
            area={true}
            rows={5}
            cols={20}
          />
            {/* <label>Fun fact
            <input type='text' name='funFact' value={this.state.funFact} onChange={(e)=>this.handleChange(e)} />
            </label> */}
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
        {this.props.currentUser.profileType === "candidate" && <button className="btn red" onClick={(e) => this.deleteAccount(e)}>Delete my account</button>}
      </div>
    )
  }
}

export default CandidateForm