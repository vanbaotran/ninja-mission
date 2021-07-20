import React from 'react'

class RecruiterForm extends React.Component{
  state = {
    usefulLinks:{
      linkedin: '',
      github: '',
      portfolio: '',
    }
  }
  handleSubmit = (event) => {
    event.preventDefault()
  }
  handleChange = (event) =>{
    const {name,value} = target.event;
    this.setState({[name]:value})
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
            <input type='file' name='avatar' value={this.state.avatar} onChange={(e)=>this.handleChange(e)} />
            <label>Job Title</label>
            <input type='text' name='title' value={this.state.title} onChange={(e)=>this.handleChange(e)} />
            <label>Code language</label>
            <input type='select' name='codeLanguage' value={this.state.codeLanguage} onChange={(e)=>this.handleChange(e)} />
            <label>Fun fact</label>
            <input type='text' name='funFact' value={this.state.funFact} onChange={(e)=>this.handleChange(e)} />
            <label>LinkedIn</label>
            <input type='text' name='funFact' value={this.state.usefulLinks.linkedIn} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <label>Github</label>
            <input type='text' name='funFact' value={this.state.usefulLinks.github} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <label>Porfolio</label>
            <input type='text' name='funFact' value={this.state.usefulLinks.porfolio} onChange={(e)=>this.handleChangeUsefulLink(e)} />
            <button>SAVE THE CHANGES</button>
        </form>
      </div>
    )
  }
}

export default ProfileEdit