import React from 'react';
import BlueTop from './backgrounds/BlueTop'
import Rating from './Rating'
class MyBadges extends React.Component {
  componentDidMount() {
    console.log(this.props.history.location.state.user.badges)
  }
  render(){
    let user = this.props.history.location.state?.user;
    // if (this.props.currentUser.profileType==='candidate'){
      return (
      <div>
       <BlueTop/>
          <div className='top-line flex-row'> 
            <img onClick={()=>{this.props.history.push('/profilepage')}} src='/images/icons/back.png' alt='icon back'/>
            <h1 className='text-yellow'>My Badges </h1>
            <img src='' alt=''/>
          </div>
      <div className='my-badges'>
        <section>
          <div className='element'>
            <img src='/images/motivation.png' alt='motiv'/>
            <p>Motivation</p>
          </div>
          <Rating>{user.badges?.motivation || 0}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/humour.png' alt='humour'/>
          <p>Humour</p>
        </div>
         <Rating>{user.badges?.humour || 0}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/skills.png' alt='skills'/>
          <p>Skills</p>
        </div>
         <Rating>{user.badges?.skills || 0}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/culture.png' alt='culture'/>
          <p>Culture</p>
        </div>
         <Rating>{user.badges?.culture || 0}</Rating>
        </section>
      </div>
      </div>)
  }
}
export default MyBadges;