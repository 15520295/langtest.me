import React from 'react';
import {StyleSheet, Text, View, Image, Platform, StatusBar} from 'react-native';
import {Root} from 'native-base';
import {AppLoading, Asset, Font, Icon} from 'expo';
import Expo from 'expo';
import WordFlatList from './components/WordFlatList';
import HomeScreen from './screen/HomeScreen';
import SettingsScreen from './screen/SettingsScreen';
import AboutScreen from './screen/AboutScreen';

import {DrawerNavigator, DrawerItems, createDrawerNavigator} from 'react-navigation';
import { Container, Header, Body, Content } from 'native-base';
import DatabaseScreen from './screen/DatabaseScreen';
import QuestionScreen from './screen/QuestionScreen/QuestionScreen';
import AudioPlayer from './screen/QuestionScreen/AudioPlayer';

//huy
import AppNavigator from './navigation/AppNavigator';

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
            'Roboto_light': require('./../assets/fonts/Roboto-Light.ttf'),
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
                <AppNavigator/>
            </View>
        );
    }
}

const CustomDrawerContentComponent = (props) => (
    <Container>
        <Header style={{height: 200, backgroundColor:'white'}}>
            <Body>
                <Image 
                    style={styles.drawImage}
                    source={require('./../assets/images/joychou.jpg')}/>
            </Body>
        </Header>
        <Content>
            <DrawerItems {...props}/>
        </Content>
    </Container>
);

const MyApp = createDrawerNavigator({
    Home:{
        screen: WordFlatList
    },
    Setting: {
        screen: SettingsScreen
    },
    About:{
        screen: AboutScreen
    },
    Question:{
        screen: QuestionScreen
    }
},{
    initialRouteName:'Question',
    drawerPosition: 'center',
    contentComponent: CustomDrawerContentComponent,
    drawerOpenRoute:'DrawerOpen',
    drawerCloseRoute:'DrawerClose',
    drawerToggleRoute:'DrawerToggle',
    headerMode: 'none'
}
);

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
