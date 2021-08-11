import React from "react";
import service from "./service";
import { io } from "socket.io-client";
import OverlayOptions from './overlays/OverlayOptions'

class Chat extends React.Component {
  state = {
    roomId: "",
    message: "",
    messages: [],
    recruiterId: "",
    candidateId: "",
    err: "",
    overlayisOpen:false
  };

  socket = io(process.env.REACT_APP_API_URL || "http://localhost:5000", { withCredentials: true, autoConnect: false });

  async componentDidMount() {
    const roomId = this.props.match.params.id;
    // let prefix_message = (this.props.currentUser.profileType === "recruiter" )? "R_" : "C_";
    // fetch data users
    // console.log(prefix_message)
    let arrIds = roomId.split("_"); /// "<recruiterId>_<candidateId>_<application>"
     console.log(arrIds);
    try {
      let recruiter, candidate;

      candidate = await service.get(`/users/${arrIds[1]}`);
      recruiter = await service.get(`/users/${arrIds[0]}`);

      this.props.updateCandidate(candidate.data);

      this.props.updateRecruiter(recruiter.data);

      let room;
      let messages = await service.get(`/rooms/${roomId}`);

      if (!messages.data) {
        room = await service.post(`/rooms`, { roomId: roomId, recruiterId: arrIds[0], candidateId: arrIds[1], applicationId: arrIds[2]});
        messages = room.data.messages;
      } else {
        messages = messages.data.messages;
      }
      console.log(messages);
      console.log(roomId)
      this.setState({
        roomId: roomId,
        recruiterId: arrIds[0],
        candidateId: arrIds[1],
        messages: messages,
      });
      /// SOCKET
      this.socket.connect();
      this.socket.emit("join-room", room);
      this.socket.on("receiveMessageFromOther", async (message) => {
        let newMessages = [...this.state.messages, message];
        let newRoom = await service.patch(`/rooms/${roomId}`, { messages: newMessages });
        this.setState({ messages: [...newRoom.data.messages] });
      });
    } catch (err) {
      console.log(err, "plop");
    }
    //////////////////////////
  }
  toggleOverlay = () =>{
      this.setState({
      overlayisOpen: !this.state.overlayisOpen
    })
  }
  componentWillUnmount() {
    // this.socket.on("disconnet",() => {service.patch(`/rooms/${this.state.roomId}`, {messages: this.state.messages})});
    this.socket.disconnect();
    this.props.updateRecruiter({});
    this.props.updateCandidate({});
  }
  sendMyMessage = async (e) => {
    let prefix_message = (this.props.currentUser.profileType === "recruiter" )? "R_" : "C_";
    this.socket.emit("sendMessage", `${prefix_message}${this.state.message}`);
  };
  render() {
    let myChatBuddy = this.props.currentUser.profileType === "recruiter" ? this.props.currentCandidate : this.props.currentRecruiter;
    let myself = this.props.currentUser;
    return (
      <div className='chatbox'>
      {this.state.overlayisOpen && <OverlayOptions {...this.props} toggle={this.toggleOverlay} reviewedPerson={myChatBuddy}/> }
       <div className='chatbox-header flex-row'>
         <img className='icons' onClick={()=>this.props.history.push('/conversations')} src='/images/icons/back-blue.png' alt='back ico'/>
        <div className='avatar flex-column'>
          {(this.props.currentUser?._id === this.props.currentCandidate?._id) ? <img src={this.props.currentRecruiter?.companyLogo} alt=''/> : <img className='border-blue' src={this.props.currentCandidate?.avatar} alt=''/>}
          {/* {(this.props.currentUser?._id === this.props.currentRecruiter?._id) && <img className='level-img' src={`/images/${this.props.currentCandidate?.level}.png`} alt='level'/>} */}
          <p>{myChatBuddy?.name}</p>
        </div>
         <img className='icons' onClick={()=>this.toggleOverlay()} src='/images/icons/settings-blue.png' alt='settings ico'/>
       </div>
        <p className='text-gray'>It's a match! Start the conversation</p>
        {this.state.err}
        {this.state.messages &&
          this.state.messages.map((mess, idx) => {
            let arrMess = mess.split("_");
            let avatar, divStyle;
            //define who I am to set CSS for the message
            if ((myself.profileType === 'recruiter' && mess.startsWith('R')) || (myself.profileType === 'candidate' && mess.startsWith('C')) ) {
              divStyle = {justifyContent:'flex-end'}
            }
            if(arrMess[0] === "R") {
              avatar= this.props.currentRecruiter.avatar ;
            } else if (arrMess[0] === "C") {
              avatar= this.props.currentCandidate.avatar ;
            } else {
              avatar = false; 
            }
            return (

              <div className="block-mess flex-row" style={divStyle} key={idx}>
               {(myChatBuddy.avatar === avatar) && <img  src={avatar} alt="avatar" />}
               <div className='text-message'>
                <p>{arrMess[1] || mess}</p>
              </div>
        
              </div>
            );
          })}
           <div className="message-box flex-row">
            <textarea
              nametype="text"
              value={this.state.message}
              className='chat-area'
              onChange={(e) => {
                this.setState({ message: e.target.value });
              }}
              placeholder='Message'
            />
          <button
            className="btn blue"
            onClick={(e) => {
              this.sendMyMessage(e);
            }}
          >
            Send
          </button>
        </div>
      </div>
    );
  }
}

export default Chat;
