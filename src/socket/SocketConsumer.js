import React from "react";
import PropTypes from "prop-types";
import SocketContext from "./socket-context";

class SocketChannel extends React.Component {
  state = {
    subscription: null,
    methods: null
  }

  subscribe() {
    const {
      onReceived,
      onInitialized,
      onConnected,
      onDisconnected,
      onRejected
    } = this.props

    const subscription = this.props.socket.subscriptions.create(this.props.channel, {
      received: data => {
        if (typeof onReceived !== "function") return;
        onReceived(data);
      },
      initialized: () => {
        if (typeof onInitialized !== "function") return;
        onInitialized();
      },
      connected: () => {
        if (typeof onConnected !== "function") return;
        onConnected();
      },
      disconnected: () => {
        if (typeof onDisconnected !== "function") return;
        onDisconnected();
      },
      rejected: () => {
        if (typeof onRejected !== "function") return;
        onRejected();
      }
    });

    this.setState({
      subscription,
      methods: {
        onReceived,
        onInitialized,
        onConnected,
        onDisconnected,
        onRejected
      }
    });
  }

  unsubscribe() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  componentDidMount() {
    if (this.props.socket) {
      this.subscribe()
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.socket !== this.props.socket) {
      if (this.props.socket) {
        this.subscribe()
      } else {
        this.unsubscribe()
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe()
  }

  render() {
    console.log("Consumer state", this.state)
    return (
      this.props.render(this.state)
    )
  }
}

SocketChannel.propTypes = {
  render: PropTypes.func
}

export default props => {
  return (
    <SocketContext.Consumer>
      {socket => <SocketChannel {...props} socket={socket} />}
    </SocketContext.Consumer>
  )
}