import React from 'react';
import {Link} from 'react-router-dom';
class Homepage extends React.Component{
  render(){
    return (
      <div>
        <section className='landPage'>
          <img className='logo' src='/images/ninja-logo.png' alt='logo'/>
          <Link to='/login'><button className='btn blue'>LOG IN</button></Link>
          <Link to='/signup'><button className='btn red'>SIGN UP</button></Link>
        </section>
      </div>
    )
  }
}
export default Homepage;