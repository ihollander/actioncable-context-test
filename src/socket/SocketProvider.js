import React from "react";
import SocketContext from "./socket-context";
import ActionCable from "actioncable";
import PropTypes from "prop-types";
// import adapter from "./socket-adapter";

class SocketProvider extends React.Component {
  state = {
    cable: ActionCable.createConsumer(this.props.url)
  };

  componentWillUnmount() {
    if (this.state.cable) {
      this.state.cable.disconnect();
    }
  }

  render() {
    return (
      <SocketContext.Provider value={this.state.cable}>
        {this.props.children}
      </SocketContext.Provider>
    );
  }
}

SocketProvider.propTypes = {
  cable: PropTypes.object,
  url: PropTypes.string,
  children: PropTypes.any
};

export default SocketProvider;
