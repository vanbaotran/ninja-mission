import React from 'react';
import service from './service';

class DashboardDetails extends React.Component{
  state = {
    jobPost:'',
    candidateList:[]
  }
  getSinglePost = () =>{
    service
      .get(`/posts/${this.props.match.params.id}`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          jobPost:response.data.offerName,
          candidateList:response.data.applicationId.candidateId})
      })
      .catch((err) => console.log(err));
  };
  componentDidMount(){
    if (!this.props.currentUser) {
      this.props.history.push("/");
    } else {
    this.getSinglePost()
    }
  }
  render(){
    return(
      <div>
        <h1>{this.state.jobPost}</h1>
        <ul className='candidate list'>
          {this.state.candidateList.map((el)=>{
            return <li key={el._id}>
              ({el.avatar} && <img src={el.avatar} alt='avatar'/>) || <img src='/images/ninja-profile.png' alt='avatar'/>)
              <p>{el.name}</p>
              <img src={`/images/${el.level.toLowerCase()}.png`} alt='level'/>
            </li>
          })}
        </ul>
      </div>
    )
  }
}
export default DashboardDetails