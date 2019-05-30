import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    Platform,
    StatusBar,
    SafeAreaView,
    ScrollView,
    TouchableOpacity
} from 'react-native';
import {Root} from 'native-base';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {Expo} from 'expo';

import {AntDesign, MaterialCommunityIcons} from '@expo/vector-icons';
import * as firebase from 'firebase';

import {
    DrawerItems,
    createDrawerNavigator,
    createStackNavigator,
    createAppContainer,
    withNavigation,
    createSwitchNavigator,
    navigate
} from 'react-navigation';

import {
    Container, Header, Body, Content
} from 'native-base';


import QuizScreen from './screen/QuestionScreen/QuizScreen';
import TopicScreen from './screen/vocabularySreen/TopicScreen';
import WordScreen from './screen/vocabularySreen/WordScreen';

//huy
// Initialize Firebase
const firebaseConfig = {
    apiKey: 'AIzaSyD118xcgkOSzBjghv7_gzot8AmvI4itCAA',
    authDomain: 'fasttoeic-d9d3c.firebaseapp.com',
    databaseURL: 'https://fasttoeic-d9d3c.firebaseio.com',
    projectId: 'fasttoeic-d9d3c',
    storageBucket: '',
    messagingSenderId: '935557755374'
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const CustomDrawerContentComponent = (props) => (
    // <Container>
    //     <Header style={{height: 200, backgroundColor:'white'}}>
    //         <Body>
    //         <Image style={styles.drawImage}
    //             source={require('../assets/images/reading.jpg')}
    //         />
    //         </Body>
    //     </Header>
    //     <Content>
    //         <DrawerItems {...props}/>
    //     </Content>
    // </Container>
    <SafeAreaView style={{flex: 1}}>
        <View style={{
            height: 150, backgroundColor: 'white', alignItems: 'center',
            justifyContent: 'center'
        }}>
            <TouchableOpacity style={{height: 120, width: 120,}}
                // onPress={()=> this.props.navigation.navigate('Profile')}
            >
                <Image source={require('../assets/splash.png')}
                       style={{height: 120, width: 120, borderRadius: 60}}
                />
            </TouchableOpacity>
        </View>
        <ScrollView>
            <DrawerItems {...props}/>
        </ScrollView>
    </SafeAreaView>
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
import HomeScreen from './screen/HomeScreen';
import ChartScreen from './screen/ChartScreen';
import sharedQuizService from './services/QuizService';
import ResultScreen from './screen/QuestionScreen/ResultScreen';
import LeaderBoardScreen from './screen/LeaderBoardScreen';
import LearnScreen from './screen/vocabularySreen/LearnScreen';
import ProfileScreen from './screen/ProfileScreen/ProfileScreen';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Step1Question from "./screen/Step1/Step1Question";

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true
        };
        // this.database = firebase.database();
        // this.writeDB();
    }

    // writeDB(){
    //     firebase.database().ref('notes/1').set({
    //         text: 'Hello wrold!'
    //     });
    // }

    async componentDidMount() {
        await Font.loadAsync({
            'Roboto': require('native-base/Fonts/Roboto.ttf'),
            'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
            // 'Roboto_light': require('./../assets/fonts/Roboto-Light.ttf'),
            'Ionicons': require('@expo/vector-icons/fonts/Ionicons.ttf')
        });
        this.setState({loading: false});
    }

    render() {
        if (this.state.loading) {
            return (<AppLoading/>);
        }
        return (
            // <View style={styles.container}>
            //     <WordFlatList>

            //     </WordFlatList>
            // </View>
            //<QuestionScreen/>
            // <View style={styles.container}>
            //     {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
            //     <AppContainer />
            // </View>
            <MyApp/>
            // {/*<ProfileScreen/>*/}
            //<Step1Question/>
        );
    }
}


const OtherScreen = createSwitchNavigator({
    Questions: QuizScreen,
    Results: ResultScreen
});

const TopicStack = createStackNavigator({
    Topic: TopicScreen,
    Word: WordScreen,
    Learn: LearnScreen
});

const MyDrawerNavigator = createDrawerNavigator({
        Home: {
            screen: HomeScreen,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <FontAwesome name='home' style={{fontSize: 24, color: tintColor}}/>
                )
            }
        },
        Profile: {
            screen: ProfileScreen,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <FontAwesome name='home' style={{fontSize: 24, color: tintColor}}/>
                )
            }
        },
        Topic: {
            screen: TopicStack,
            navigationOptions: {
                drawerIcon: ({tintColor}) => (
                    <MaterialCommunityIcons name='dictionary' color={tintColor} size={24}/>
                )
            }
        },
        Chart: {
            screen: ChartScreen
        },
        LeaderBoard: {
            screen: LeaderBoardScreen
        },
    },
    {
        contentComponent: CustomDrawerContentComponent,
        contentOptions: {
            activeTintColor: 'orange'
        }
    }
);

const AppNavigation = createStackNavigator({
    Default: {
        screen: MyDrawerNavigator,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    Other: {
        screen: OtherScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    ProfileScreen: {
        screen: ProfileScreen,
        navigationOptions: {
            gesturesEnabled: false
        }
    },
    Step1: {
        screen: Step1Question,
    }
}, {
    headerMode: 'none',
});

const MyApp = createAppContainer(AppNavigation);

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    drawImage: {
        flex: 1,
        height: 100,
        width: 200,
        borderRadius: 75,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

