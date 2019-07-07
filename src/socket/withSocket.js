import React from "react";
import SocketContext from "./socket-context";

class SocketChannel extends React.Component {
  state = {
    subscription: null
  };

  subscribe() {
    const { onReceived } = this.props.options;

    const subscription = this.props.cable.subscriptions.create(
      this.props.channel,
      {
        received: onReceived
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
    return this.props.children ? this.props.children(this.state) : null;
  }
}

// model after React-redux connect?
export default ({ channel, options }) => Component => {
  return props => (
    <SocketContext.Consumer>
      {cable => (
        <SocketChannel cable={cable} channel={channel} options={options}>
          {subscription => (
            <Component
              {...props}
              subscription={subscription}
              options={options}
            />
          )}
        </SocketChannel>
      )}
    </SocketContext.Consumer>
  );
};
