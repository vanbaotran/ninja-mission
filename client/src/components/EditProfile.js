// import React from 'react'
// import {uploadFile,editProfile} from './service'

// class EditProfile extends React.Component{
//   state = {
//     name:this.props.userInSession.name,
//     email:this.props.userInSession.email, 
//     password:this.props.userInSession.password,
//     birthday:'', 
//     bio:'',
//     avatar:'', 
//     title:'', 
//     codeLanguage:'', 
//     funFact:'',
//     usefulLinks:{
//       linkedin: '',
//       github: '',
//       portfolio: '',
//     }
//   }
//   handleSubmit = (event) => {
//     event.preventDefault()
//     const {name, email, password, birthday, bio, avatar, title, codeLanguage, funFact, linkedin, github, portfolio} = this.state
//     editProfile(name, email, password, birthday, bio, avatar, title, codeLanguage, funFact, linkedin, github, portfolio)
//     .then(response=>{
//       console.log(response)
//       this.props.updateUser(response)
//     })
//     .catch(error => console.log(error))
//   }
//   handleChange = (event) =>{
//     const {name,value} = event.target;
//     this.setState({[name]:value})
//   }
//   handleChangeUsefulLink = (event) =>{
//     const {name,value} = event.target;
//     this.setState({
//       usefulLinks:{[name]:value}
//     });
//  }
//   handleChangeFile = (e) =>{
//     const uploadData = new FormData();
//     uploadData.append('imageUrl', e.target.files[0]);
//     uploadFile(uploadData)
//       .then(response => {
//         this.setState({ avatar: response.secure_url });
//       })
//       .catch(err => {
//         console.log('Error while uploading the file: ', err);
//       })
//   }
//   render(){
//     return(
//       <div className='form'>
//         <form onSubmit={this.handleSubmit}>
//             <label>Name</label>
//             <input type='text' name='name' value={this.state.name} onChange={(e)=>this.handleChange(e)}/>
//             <label>Email</label>
//             <input type='text' name='email' value={this.state.email} onChange={(e)=>this.handleChange(e)} /> 
//             <label>Password</label>
//             <input type='password' name='password' value={this.state.password} onChange={(e)=>this.handleChange(e)} />
//             <label>Birthday </label>
//             <input type='date' name='birthday' value={this.state.birthday} onChange={(e)=>this.handleChange(e)}/>
//             <label>Bio</label>
//             <input type='text' name='bio' value={this.state.bio} onChange={(e)=>this.handleChange(e)} /> 
//             <label>Avatar</label>
//             <input type='file' name='avatar' value={this.state.avatar} onChange={(e)=>this.handleChangeFile(e)} />
//             <label>Job Title</label>
//             <input type='text' name='title' value={this.state.title} onChange={(e)=>this.handleChange(e)} />
//             <label>Code language</label>
//             <input type='select' name='codeLanguage' value={this.state.codeLanguage} onChange={(e)=>this.handleChange(e)} />
//             <label>Fun fact</label>
//             <input type='text' name='funFact' value={this.state.funFact} onChange={(e)=>this.handleChange(e)} />
//             <label>LinkedIn</label>
//             <input type='text' name='linkedin' value={this.state.usefulLinks.linkedin} onChange={(e)=>this.handleChangeUsefulLink(e)} />
//             <label>Github</label>
//             <input type='text' name='github' value={this.state.usefulLinks.github} onChange={(e)=>this.handleChangeUsefulLink(e)} />
//             <label>Porfolio</label>
//             <input type='text' name='portfolio' value={this.state.usefulLinks.portfolio} onChange={(e)=>this.handleChangeUsefulLink(e)} />
//             <button>SAVE THE CHANGES</button>
//         </form>
//       </div>
//     )
//   }
// }

// export default EditProfile