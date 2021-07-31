import React from 'react';
import {Link} from 'react-router-dom';
import {editProfile} from './service';
import RedBottom from './backgrounds/RedBottom';
import BlueTop from './backgrounds/BlueTop'

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
      <div className='my-level'>
      <BlueTop/>
      <RedBottom/>
         <div className='top-line flex-row'> 
          <Link to='/profilepage'><img src='/images/icons/back.png' alt='settings'/></Link>
          <h1 className='text-yellow'>My Level</h1>
          <img src='' alt=''/>
        </div>
        <header>
          <img src='/images/nunchaku.png'alt='levels'/>
        </header>
      <main>
          <div onClick = {()=>this.updateLevel('Warrior')} className={`row-level border-blue ${this.props.currentUser?.level==='Warrior' ? 'yellow' : 'white'}`}>
            <h3>Warrior</h3>
            <div className='image'><img src='/images/warrior.png' alt='warrior'/></div>
            <h3>0 - 2 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Ninja')} className={`row-level border-yellow ${this.props.currentUser?.level==='Ninja' ? 'yellow' : 'white'}`}>
            <h3>Ninja</h3>
           <div className='image'> <img src='/images/ninja.png' alt='ninja'/> </div>
            <h3>2 - 3 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Samurai')} className={`row-level border-orange ${this.props.currentUser?.level==='Samurai' ? 'yellow' : 'white'}`}>
            <h3>Samurai</h3>
             <div className='image'><img src='/images/samurai.png' alt='samurai'/></div>
            <h3>3 - 5 yrs experience</h3>
          </div>
          <div onClick = {()=>this.updateLevel('Sensei')} className={`row-level border-red ${this.props.currentUser?.level==='Sensei' ? 'yellow' : 'white'}`}>
            <h3>Sensei</h3>
             <div className='image'><img src='/images/sensei.png' alt='sensei'/></div>
            <h3>5 yrs+ experience</h3>
          </div>
      </main>
      </div>
    )
  }
}
export default LevelPage 