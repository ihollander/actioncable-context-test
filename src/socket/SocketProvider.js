import React from "react";
import SocketContext from "./socket-context";
import ActionCable from "actioncable";
import PropTypes from "prop-types";

class SocketProvider extends React.Component {
  state = { connection: null };

  componentDidMount() {
    const connection = ActionCable.createConsumer(this.props.url);
    console.log('connection', connection)
    this.setState({ connection });
  }

  componentWillUnmount() {
    if (this.state.connection) {
      this.state.connection.disconnect()
    };
  }

  render() {
    return (
      <SocketContext.Provider value={this.state.connection}>
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
