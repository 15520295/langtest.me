import React from 'react';
import {StyleSheet, Text, View, Image, Platform, StatusBar} from 'react-native';
import {Root} from 'native-base';
import {AppLoading, Asset, Font, Icon} from 'expo';
import Expo from 'expo';

import {
    DrawerItems, createDrawerNavigator,createStackNavigator,createAppContainer,withNavigation
} from 'react-navigation';

import {
    Container, Header, Body, Content
} from 'native-base';

import TopicScreen from './screen/vocabularySreen/TopicScreen';
import WordScreen from './screen/vocabularySreen/WordScreen';
import QuizScreen from './screen/QuestionScreen/QuestionScreen';

//huy

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

// const AppNavigator = createStackNavigator(
//     {
//         App: {
//             screen: HomeScreen,
//         },
//         Topic: {
//             screen: TopicScreen,
//         },
//         Word: {
//             screen: WordScreen
//         },
//     },
//     {
//         initialRouteName:'App',
//         drawerPosition: 'center',
//         contentComponent: CustomDrawerContentComponent,
//         drawerOpenRoute:'DrawerOpen',
//         drawerCloseRoute:'DrawerClose',
//         drawerToggleRoute:'DrawerToggle',
//         headerMode: 'none'
//     }
// );

import AppNavigator from './navigation/AppNavigator';
const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
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
        // <View style={styles.container}>
        //     <WordFlatList>

            //     </WordFlatList>
            // </View>
            //<QuestionScreen/>
        <View style={styles.container}>
            {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            <AppContainer />
        </View>
        );
    }
}

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

