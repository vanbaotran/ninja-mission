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
    // fetch data users
    let arrIds = roomId.split("_"); /// "<recruiterId>_<candidateId>_<application>"
    try {
      let recruiter, candidate;

      candidate = await service.get(`/users/${arrIds[1]}`);
      recruiter = await service.get(`/users/${arrIds[0]}`);

      this.props.updateCandidate(candidate.data);

      this.props.updateRecruiter(recruiter.data);

      let room;
      console.log("===================");
      let messages = await service.get(`/rooms/${roomId}`);

      if (!messages.data) {
        room = await service.post(`/rooms`, { roomId: roomId });
        messages = room.data.messages;
      } else {
        messages = messages.data.messages;
      }
      console.log(messages);
      // this.setState({messages: messages})
      //     console.log( "plop1", messages);
      this.setState({
        roomId: roomId,
        recruiterId: arrIds[0],
        candidateId: arrIds[1],
        messages: messages,
      });
      //     // this.setState({messages: room.data.messages});
      this.socket.connect();
      this.socket.emit("join-room", room);
      this.socket.on("receiveMessageFromOther", async (message) => {
        let newMessages = [...this.state.messages, message];
        let newRoom = await service.patch(`/rooms/${this.state.roomId}`, { messages: newMessages });
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
    this.socket.emit("sendMessage", this.state.message);
  };
  render() {
    return (
      <>
        <div className="message-box flex-column">
          <label>
            Write Message:
            <input
              nametype="text"
              value={this.state.message}
              onChange={(e) => {
                this.setState({ message: e.target.value });
              }}
            />
          </label>
          <button
            className="btn blue"
            onClick={(e) => {
              this.sendMyMessage(e);
            }}
          >
            SEND:
          </button>
        </div>
        {this.state.err}
        {this.state.messages && this.state.messages.map((mess, idx) => <p key={idx}>{mess}</p>)}
      </>
    );
  }
}

export default Chat;
