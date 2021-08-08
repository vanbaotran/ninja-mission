import React from 'react';
import service from './service'

class Conversations extends React.Component {
  state = {
    conversations:[]
  }
  componentDidMount() {
    service.get('/rooms/byUser')
    .then(response=>{
      console.log(response.data)
      this.setState({
        conversations: response.data
      })
    })  
    .catch(err=>console.log(err))
  }
  goToChat = (roomId) => {
    this.props.history.push(`/chatbox/${roomId}`)
  }
  render() {
    let recruiter = this.props.currentUser?.profileType === 'recruiter'
    console.log(this.state.conversations)
    return (
      <div className='conversations'>
        {this.state.conversations.length !== 0 && this.state.conversations.map(el=>{
          if (recruiter){
            return (<div className ='convo-element flex-row' onClick={()=>this.goToChat(el.roomId)} key={el._id}>
            <img src={el.candidateId.avatar} alt=''/>
            <div className='flex-column'>
              <p> {el.candidateId.name} </p>
              <p className='text-gray'> {el.candidateId.title} </p>
            </div>
          </div>)
          } else {
             return (<div  className ='convo-element flex-row' onClick={()=>this.goToChat(el.roomId)} key={el._id}>
            <img src={el.recruiterId.avatar} alt=''/>
            <div className='flex-column'>
              <p> {el.recruiterId.name} </p>
              <p className='text-gray'> {el.applicationId.jobPostId.position} </p>
            </div>
          </div>)
          }
          
        })}
      </div>
    )
  }
}
export default Conversations
