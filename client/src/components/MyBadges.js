import React from 'react';
import BlueTop from './backgrounds/BlueTop'
import Rating from './Rating'
class MyBadges extends React.Component{
  render(){
    if (this.props.currentUser.profileType==='candidate'){
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
          <Rating>{this.props.currentUser.motivation}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/humour.png' alt='humour'/>
          <p>Humour</p>
        </div>
         <Rating>{this.props.currentUser.humour}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/skills.png' alt='skills'/>
          <p>Skills</p>
        </div>
         <Rating>{this.props.currentUser.skills}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/culture.png' alt='culture'/>
          <p>Culture</p>
        </div>
         <Rating>{this.props.currentUser.culture}</Rating>
        </section>
      </div>
      </div>
    )} else {
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
          <form onSubmit={this.handleSubmit}>
          <label id='rating-line'> 
          </label>
            <div className="rating">
                <input id="star5" name="star" type="radio" value="5" className="radio-btn hide" />
                <label for="star5">☆</label>
                <input id="star4" name="star" type="radio" value="4" className="radio-btn hide" />
                <label for="star4">☆</label>
                <input id="star3" name="star" type="radio" value="3" className="radio-btn hide" />
                <label for="star3">☆</label>
                <input id="star2" name="star" type="radio" value="2" className="radio-btn hide" />
                <label for="star2">☆</label>
                <input id="star1" name="star" type="radio" value="1" className="radio-btn hide" />
                <label for="star1">☆</label>
                <div class="clear"></div>
            </div>
            </form>
        </section>
        <section>
         <div className='element'>
           <img src='/images/humour.png' alt='humour'/>
          <p>Humour</p>
        </div>
         <Rating>{this.props.currentUser.humour}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/skills.png' alt='skills'/>
          <p>Skills</p>
        </div>
         <Rating>{this.props.currentUser.skills}</Rating>
        </section>
        <section>
         <div className='element'>
           <img src='/images/culture.png' alt='culture'/>
          <p>Culture</p>
        </div>
         <Rating>{this.props.currentUser.culture}</Rating>
        </section>
      </div>
      </div>)
    }
  }
}
export default MyBadges;