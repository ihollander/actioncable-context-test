import React, { Component } from "react";
import TweetForm from "./TweetForm";
import TweetList from "./TweetList";

import withSocket from "../socket/withSocket";
import adapter from "../services/adapter";

class Feed extends Component {
  state = {
    displayedTweets: [],
    newTweets: []
  };

  componentDidMount() {
    adapter.fetchFeed(1).then(res => {
      this.setState({ displayedTweets: res });
    });
  }

  componentWillUnmount() {
    console.log("unmount");
    this.props.subscription && this.props.subscription.unsubscribe();
  }

  addTweet = tweet => {
    this.setState(prevState => {
      return {
        newTweets: [...prevState.newTweets, tweet]
      };
    });
  };

  handleDisplayTweets = () => {
    this.setState(prevState => {
      return {
        displayedTweets: [...prevState.displayedTweets, ...prevState.newTweets],
        newTweets: []
      };
    });
  };

  render() {
    console.log(this.props);
    const { displayedTweets, newTweets } = this.state;

    return (
      <div className="Feed">
        <TweetForm addTweet={this.addTweet} />
        <TweetList
          handleDisplayTweets={this.handleDisplayTweets}
          newTweetCount={newTweets.length}
          tweets={displayedTweets}
        />
      </div>
    );
  }
}

// this doesn't work bc we can't call onReceived from the Feed
// two way data flow from sockets isn't compatible with one way flow in components
export default withSocket({
  channel: "FeedChannel",
  options: { onReceived: data => console.log(data) }
})(Feed);
