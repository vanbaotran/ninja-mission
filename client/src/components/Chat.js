import React from "react";
import { io } from "socket.io-client";


class Chat extends React.Component {
  state = {
    orderId: "",
    messageA: "",
    messages: [],

  };
  displayMessage = (msg) =>{
    this.setState({
      messageA: msg
    })
  }
  socket = io(`${process.env.REACT_APP_APIURL || ""}/`, {
    autoConnect: false,
  })

  componentDidMount() {
    this.socket.on('receiveMessageFromOther', (order) => {
      alert('order has just updated from server:', order.status)
    })
    this.socket.connect()
  }

  componentWillUnmount() {
    this.socket.disconnect();
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
             this.socket.emit("sendMessage", this.state.messageA);
            this.setState({
              messages:[...this.state.messages, this.state.messageA ], messageA: ""
            })
          }}
        >
          Send message:
        </button>
          {this.state.messages.map((mess) => <p>{mess}</p>)}
      </>
    );
  }
}

export default Chat;
