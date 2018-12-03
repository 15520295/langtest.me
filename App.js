import React from 'react';

import {Root} from 'native-base';
import {Font} from 'expo';
import Expo from 'expo';

import {
    StyleSheet, Text, View, Image
} from 'react-native';

import {
    DrawerItems, createDrawerNavigator,createStackNavigator,createAppContainer,withNavigation
} from 'react-navigation';

import {
    Container, Header, Body, Content
} from 'native-base';

import TopicScreen from './src/screen/TopicScreen';
import WordScreen from './src/screen/WordScreen';


class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            loading: true
        };
    }
    async componentDidMount(){
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            // 'Roboto_light': require('./../assets/fonts/Roboto-Light.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
        });
        this.setState({loading: false});
    }

    render() {
        if(this.state.loading){
            return (<Expo.AppLoading/>);
        }
        return (
            <TopicScreen />
        );
    }
}

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{height: 200, backgroundColor:'gray'}}>
            <Body>

            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
);

const AppNavigator = createStackNavigator(
    {
        App: {
            screen: App,
        },
        Topic: {
            screen: TopicScreen,
        },
        Word: {
            screen: WordScreen
        },
    },
    {
        initialRouteName:'App',
        drawerPosition: 'center',
        contentComponent: CustomDrawerContentComponent,
        drawerOpenRoute:'DrawerOpen',
        drawerCloseRoute:'DrawerClose',
        drawerToggleRoute:'DrawerToggle',
        headerMode: 'none'
    }
);

export default createAppContainer(AppNavigator);

//
// const MyApp = createDrawerNavigator({
//         Topic:{
//             screen: TopicScreen
//         }
//     },{
//         initialRouteName:'Topic',
//         drawerPosition: 'center',
//         contentComponent: CustomDrawerContentComponent,
//         drawerOpenRoute:'DrawerOpen',
//         drawerCloseRoute:'DrawerClose',
//         drawerToggleRoute:'DrawerToggle',
//         headerMode: 'none'
//     }
// );

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawImage:{
        flex: 1,
        height:100,
        width: 200,
        borderRadius:75,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

