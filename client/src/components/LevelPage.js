import React from 'react';
import {Link} from 'react-router-dom';
import {editProfile} from './service';

class LevelPage extends React.Component{
  state = {
    level: this.props.currentUser?.level || ""
  }
  updateLevel = (str) =>{
    this.setState({
      level: str
    })
    editProfile({...this.state})
    .then(response=>{
      console.log('CHANGING LEVEL',response)
      this.props.updateUser(response)
    })
    .catch(err=>console.log(err))
  }

  render(){
    return (
      <div className='profile level'>
         <nav>
          <Link to='/settings'><img src='/images/icons/back.png' alt='settings'/></Link>
        </nav>
        <header>
          <img src='/images/nunchaku.png'alt='levels'/>
        </header>
      <main>
     
          <div onClick = {()=>this.updateLevel('Warrior')}className='row'>
            <h3>Warrior</h3>
            <img src='/images/warrior.png' alt='warrior'/>
            <h3>0 - 2 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Ninja')}className='row'>
            <h3>Ninja</h3>
            <img src='/images/ninja.png' alt='ninja'/>
            <h3>2 - 3 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Samurai')} className='row'>
            <h3>Samurai</h3>
            <img src='/images/samurai.png' alt='samurai'/>
            <h3>3 - 5 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Sensei')}className='row'>
            <h3>Sensei</h3>
            <img src='/images/sensei.png' alt='sensei'/>
            <h3>5 yrs+ experience</h3>
          </div>
      </main>
      </div>
    )
  }
}
export default LevelPage 