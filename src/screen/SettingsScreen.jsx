import React from 'react';
import {Image, View, Text} from 'react-native';


export default class SettingsScreen extends React.Component{
    static navigationOptions ={
        title: 'Setting',
        drawerIcon:(
            <Image source={require('../../assets/images/settings.png')}
                style={{height:24, width:24}}
            />
        )
    };

    render(){
        return(
            <View>
                <Text>Setting Screen</Text>
            </View>
        );
    }
}