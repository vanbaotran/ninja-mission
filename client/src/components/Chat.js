import React from "react";
import service from "./service";
import { io } from "socket.io-client";

class Chat extends React.Component {
  state = {
    roomId: "",
    message: "",
    messages: [],
    recruiterId: "",
    candidateId: "",
    err: "",
  };

  socket = io("http://localhost:5000", { withCredentials: true, autoConnect: false });

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
        room = await service.post(`/rooms`, { roomId: roomId });
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
    return (
      <section className='chatbox'>
       <div className='chatbox-header flex-row'>
         <img className='icons' onClick={()=>this.props.history.goBack()} src='/images/icons/back-blue.png' alt='back ico'/>
        <div className='avatar'>
          {(this.props.currentUser?._id === this.props.currentCandidate?._id) ? <img src={this.props.currentRecruiter?.companyLogo} alt='companyLogo'/> : <img className='border-blue' src={this.props.currentCandidate?.avatar} alt='candidateAvatar'/>}
          {(this.props.currentUser?._id === this.props.currentRecruiter?._id) && <img className='level-img' src={`/images/${this.props.currentCandidate?.level}.png`} alt='level'/>}
        </div>
         <img className='icons' onClick={()=>this.props.history.push('/options')} src='/images/icons/settings-blue.png' alt='settings ico'/>
       </div>
        {this.state.err}
        {this.state.messages &&
          this.state.messages.map((mess, idx) => {
            let arrMess = mess.split("_");
            let avatar, name, divStyle;
            if(arrMess[0] === "R") {
              avatar= this.props.currentRecruiter.avatar ;
              name= this.props.currentRecruiter.name ;
            } else if (arrMess[0] === "C") {
              avatar= this.props.currentCandidate.avatar ;
              name= this.props.currentCandidate.name ;
            } else {
              avatar = false;
              name = false;
            }
            return (
              <div className="block-mess flex-row" style={divStyle} key={idx}>
               {(this.props.currentUser.avatar === avatar) && <img  src={avatar} alt="avatar" />}
              <div className="id-chat bg-ligth-grey flex-column">
                <h4>{arrMess[1] || mess}</h4>
                  {name && <p>{name}</p>}
                </div>
              </div>
            );
          })}
           <div className="message-box flex-row">
            <input
              nametype="text"
              value={this.state.message}
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
      </section>
    );
  }
}

export default Chat;
