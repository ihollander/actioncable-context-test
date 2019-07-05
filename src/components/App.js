import React from "react";
import Feed from "./Feed";
import SocketConsumer from '../socket/SocketConsumer'

class App extends React.Component {
  state = {
    toggle: true
  };

  render() {
    return (
      <div className="App ui container">
        <button onClick={() => this.setState({ toggle: !this.state.toggle })}>
          Toggle Feed
        </button>

        {this.state.toggle && <SocketConsumer
          channel={{ channel: "FeedChannel" }}
          onReceived={(tweet) => {
            console.log("what will it be!", tweet)
          }}
          render={(consumerProps) => <Feed {...consumerProps} />}
        />}
      </div>
    );
  }
}

export default App;
