import React from "react";
import PropTypes from "prop-types";
import SocketContext from "./socket-context";

class SocketChannel extends React.Component {
  state = {
    subscription: null
  };

  subscribe() {
    const { onReceived } = this.props;

    const subscription = this.props.cable.subscriptions.create(
      this.props.channel,
      {
        received: data => {
          if (typeof onReceived !== "function") return;
          onReceived(data);
        }
      }
    );

    this.setState({
      subscription
    });
  }

  unsubscribe() {
    if (this.state.subscription) {
      this.state.subscription.unsubscribe();
    }
  }

  componentDidMount() {
    if (this.props.cable) {
      this.subscribe();
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.cable !== this.props.cable) {
      if (this.props.cable) {
        this.subscribe();
      } else {
        this.unsubscribe();
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    console.log("Consumer state", this.state);
    return this.props.children ? this.props.children(this.state) : null;
  }
}

SocketChannel.propTypes = {
  render: PropTypes.func
};

const SocketConsumer = props => (
  <SocketContext.Consumer>
    {cable => <SocketChannel {...props} cable={cable} />}
  </SocketContext.Consumer>
);

SocketConsumer.propTypes = {
  onReceived: PropTypes.func,
  onInitialized: PropTypes.func,
  onConnected: PropTypes.func,
  onDisconnected: PropTypes.func,
  onRejected: PropTypes.func,
  children: PropTypes.any
};

export default SocketConsumer;
