import React from "react";
import { io } from "socket.io-client";

class Chat extends React.Component {
  state = {
    orderId: "",
    messageA: "",
    messages: [],

  };

  socket = io('http://localhost:5000', {withCredentials:true,  autoConnect: false});

  componentDidMount() {
    this.socket.connect();
    this.socket.on("connect", () => {
      this.socket.emit("testCli", "test client emit");
    });
    const room = this.props.match.params.id
    console.log(this.props.match.params.id)
    this.socket.emit('join-room', room, message =>{
      console.log('room:', room)
      console.log(message)
    })
     this.socket.on('receiveMessageFromOther', (message) => {
      this.setState({messages: [...this.state.messages, message ]})
    })
    this.socket.on("testApi", (args) => {
      this.setState({ messages: [...this.state.messages, args] });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }
sendMyMessage = (e) => {
this.socket.emit("sendMessage", this.state.messageA);
this.setState({messages: [...this.state.messages, this.state.messageA ], messageA: ""})
}
  render() {
    return (
      <>
        <label>
          Message A
          <input
            nametype="text"
            value={this.state.messageA}
            onChange={(e) => {
              this.setState({ messageA: e.target.value });
            }}
          />
        </label>
        <p>{this.state.message}</p>
        <button
          onClick={(e) => {
            this.sendMyMessage(e);
          }}
        >
          Send message:
        </button>
        {this.state.message}
          {this.state.messages.map((mess, idx )=> <p key={idx}>{mess}</p>)}
      </>
    );
  }
}

export default Chat;
