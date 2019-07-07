import ActionCable from "actioncable";

// useful to turn into redux middleware?
// http://nmajor.com/posts/making-redux-middleware-for-websockets
const cableAdapter = url => {
  const cable = ActionCable.createConsumer(url);

  const subscribe = ({ channel, options }) => {
    return cable.subscriptions.create(channel, options);
  };

  const disconnect = () => cable.disconnect();

  return {
    subscribe,
    disconnect
  };
};

export default cableAdapter;

// export default class SocketAdapter {
//   constructor(url) {
//     this.connection = ActionCable.createConsumer(url);
//   }

//   subscribe(channel, options) {
//     const { onReceived } = options;
//     return this.connection.subscriptions.create(channel, {
//       received: data => {
//         if (typeof onReceived !== "function") return;
//         onReceived(data);
//       }
//     });
//   }

//   unsubscribe(channel) {
//     debugger;
//   }

//   disconnect() {
//     this.connection.disconnect();
//   }
// }
