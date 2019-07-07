import React from "react";
import Feed from "./Feed";

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

        {this.state.toggle && <Feed />}
      </div>
    );
  }
}

export default App;
