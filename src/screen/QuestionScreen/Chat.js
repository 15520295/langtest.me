import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';

const systemUser = {
  _id: 2,
  name: 'React Native',
  avatar: 'https://placeimg.com/140/140/any',
};
export default class Chat extends React.Component {
  state = {
    messages: [],
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: 'What can I do for you',
          createdAt: new Date(),
          user: systemUser,
        },
        {
          _id: 2,
          text: 'Try do what does "Sideway mean"',
          createdAt: new Date(),
          user: systemUser,
        }
      ],
    })
  }

  onSend(messages = []) {
    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    const response = {
      _id: this.state.messages[this.state.messages.length - 1] + 1,
      text: "Well try Google yourself!",
      createdAt: new Date(),
      user: systemUser,
    };

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, response),
    }));

  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        user={{
          _id: 1,
        }}
      />
    );
  }
}