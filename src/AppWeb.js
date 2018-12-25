import React from "react"
import {View, Text} from 'native-base'
import { Platform, Alert } from "react-native";

class App extends React.Component {
  render() {
    // Alert("aswdads", "ASdasdsa");
    return (
      <View>
        <Text>Hello from {Platform.OS}</Text>
      </View>
    )
  }
}

export default () => <App/>
