import React from 'react';
import {Image, View, Text} from 'react-native';


export default class SettingsScreen extends React.Component{
    static navigationOptions ={
        title: 'About',
    };

    render(){
        return(
            <View>
                <Text>About Screen</Text>
            </View>
        );
    }
}