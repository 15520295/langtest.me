import React from "react"
import { Platform, Alert, View, Text } from "react-native";

class App extends React.Component {
  render() {
    console.log(require('react-native'));
    Alert.alert("eqwe", "qweqw")
    return (
      <View>
        <Text>Hello from {Platform.OS}</Text>
      </View>
    )
  }
}

export default () => <App/>
